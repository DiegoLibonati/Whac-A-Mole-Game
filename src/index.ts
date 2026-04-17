import "@/index.css";
import MoleRushPage from "@/pages/MoleRushPage/MoleRushPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const moleRushPage = MoleRushPage();
  app.appendChild(moleRushPage);
};

document.addEventListener("DOMContentLoaded", onInit);
