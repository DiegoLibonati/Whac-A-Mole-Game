import "@/index.css";
import { WhacAMolePage } from "@/pages/WhacAMolePage/WhacAMolePage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const whacAMolePage = WhacAMolePage();
  app.appendChild(whacAMolePage);
};

document.addEventListener("DOMContentLoaded", onInit);
