import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Stack,
  Text,
  TextField,
  getTheme,
  mergeStyleSets
} from "@fluentui/react";
import BotMessage from "./BotMessage";
import CodeFormatter from "./CodeFormatter";
import Layout from "./Layout";
import UserMessage from "./UserMessage";
import MainLayout from "../MainLayout";
import { Icon } from "@iconify/react";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const chatContainerRef = useRef(null);

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage) {
      const botMessage = { message: "Typing...", isBot: true };
      setChatMessages((prevChatMessages) => [
        ...prevChatMessages,
        { message: userMessage, isBot: false },
        botMessage
      ]);
      setIsButtonClicked(true);
    }
  };

  const fetchBotMessage = useCallback(() => {
    fetch(
      `https://24fe-54-243-246-120.ngrok-free.app/get_answer/?question=${userMessage} && k=2`,
      {
        headers: {
          "ngrok-skip-browser-warning": "1"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const isError = data.answer.startsWith("@error:");
        const formattedAnswer = formatMessage(
          isError ? data.answer.replace("@error:", "") : data.answer
        );

        // Group the links by their file names
        const groupedLinks = data.reference.reduce((acc, ref) => {
          if (!acc[ref.link]) {
            acc[ref.link] = [];
          }
          acc[ref.link].push(ref.pageNo);
          return acc;
        }, {});

        // Create the link elements with the grouped page numbers
        const references = isError
          ? null
          : Object.entries(groupedLinks).map(([link, pages], index) => (
              <a
                key={index}
                href={`https://24fe-54-243-246-120.ngrok-free.app/?file=${link}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "8px" }}
              >
                link{index + 1}
                {pages.map((page, i) => (
                  <span key={i}>[{page}]</span>
                ))}
              </a>
            ));

        const botMessage = {
          message: (
            <>
              {formattedAnswer}
              <br />
              {references}
            </>
          ),
          isBot: true
        };
        setChatMessages((prevChatMessages) => [
          ...prevChatMessages.slice(0, -1),
          botMessage
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userMessage]);

  useEffect(() => {
    if (isButtonClicked) {
      fetchBotMessage();
      setIsButtonClicked(false);
      setUserMessage("");
    }
  }, [isButtonClicked, fetchBotMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const formatMessage = (message) => {
    if (typeof message === "string") {
      return message.split("```").map((snippet, index) => {
        if (index % 2 === 1) {
          return <CodeFormatter key={index} snippet={snippet} />;
        } else {
          return (
            <span key={index}>
              {snippet.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          );
        }
      });
    } else {
      return message;
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const theme = getTheme();
  const classNames = mergeStyleSets({
    title: {
      fontWeight: "bold",
      fontSize: "2rem",
      color: theme.palette.themePrimary
    },
    inputContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center"
    },
    inputBox: {
      flexGrow: 1,
      marginRight: "8px",
      borderRadius: "25px",
      border: "2px solid",
      borderColor: theme.palette.themePrimary,
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "4px",
      paddingBottom: "4px",
      // backgroundColor: theme.palette.neutralLighter,
      ":hover": {
        borderColor: theme.palette.themeDark
      },
      ":focus-within": {
        borderColor: theme.palette.themeDark
      }
    }
  });

  return (
    <Layout>
      {/* <Text className={classNames.title}>Ultron</Text> */}
      <MainLayout
        style={{
          width: "100%"
        }}
      />

      <Stack.Item>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            overflow: "auto"
          }}
          ref={chatContainerRef}
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: message.isBot ? "flex-start" : "flex-end",
                marginBottom: "8px"
              }}
            >
              {message.isBot ? (
                <BotMessage
                  message={message.message && formatMessage(message.message)}
                />
              ) : (
                <UserMessage message={formatMessage(message.message)} />
              )}
            </div>
          ))}
        </div>
      </Stack.Item>

      <Stack horizontal gap={15} styles={{ root: { width: "100%" } }}>
        <Icon
          icon="game-icons:magic-broom"
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            color: theme.palette.redDark,
            alignSelf: "center"
          }}
          onClick={clearChat}
        />
        <TextField
          className={classNames.inputBox}
          value={userMessage}
          onChange={handleUserMessageChange}
          autoComplete="off"
          autoFocus
          multiline
          resizable={false}
          underlined
          placeholder="Type..."
        />
        <Icon
          icon="fluent:send-16-regular"
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            color: theme.palette.themePrimary,
            alignSelf: "center"
          }}
          onClick={handleSendMessage}
        />
      </Stack>
    </Layout>
  );
};

export default Chat;
