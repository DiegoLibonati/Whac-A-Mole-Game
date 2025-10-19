import { WhacAMolePage } from "@src/pages/WhacAMolePage/WhacAMolePage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const whacAMolePage = WhacAMolePage();
  app.appendChild(whacAMolePage);
};

document.addEventListener("DOMContentLoaded", onInit);
