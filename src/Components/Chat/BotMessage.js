import React from "react";
import { Stack, Text } from "@fluentui/react";

const BotMessage = ({ message }) => (
  <Stack
    styles={{
      root: {
        backgroundColor: "#e1dfdd",
        padding: "8px",
        borderRadius: "5px"
      }
    }}
  >
    <Text>{message}</Text>
  </Stack>
);
export default BotMessage;
