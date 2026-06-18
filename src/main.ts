import { createApp } from "./app";

const root = document.getElementById("app");
if (root) {
  root.innerHTML = "";
  createApp(root);
}
