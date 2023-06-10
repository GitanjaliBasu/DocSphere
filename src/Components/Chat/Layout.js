import React from "react";
import { Stack, Text } from "@fluentui/react";

const Layout = ({ children }) => (
  <Stack
    horizontalAlign="center"
    verticalAlign="center"
    verticalFill
    styles={{
      root: {
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        textAlign: "left",
        color: "#605e5c"
        // background: "#f3f2f1",
      }
    }}
    gap={15}
  >
    <Stack.Item styles={{ root: { width: "100%" } }}>{children}</Stack.Item>
  </Stack>
);
export default Layout;
