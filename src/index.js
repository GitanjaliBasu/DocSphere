import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Chat from "./Components/Chat/Chat";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Chat />
  </StrictMode>
);
