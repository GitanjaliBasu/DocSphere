import React from "react";
import { Stack, Text } from "@fluentui/react";

const UserMessage = ({ message }) => (
  <Stack
    styles={{
      root: {
        backgroundColor: "transparent",
        padding: "8px",
        borderRadius: "5px"
      }
    }}
  >
    <Text>{message}</Text>
  </Stack>
);

export default UserMessage;
