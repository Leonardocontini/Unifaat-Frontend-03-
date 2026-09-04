import userRender from "./userRender.js";
import { userListApi } from "../api/userListApi.js";

// Página corrente em memória — persiste entre re-renders sem localStorage
let currentPage = 1;

export default async function listUserRender(page = currentPage) {
    currentPage = page;

    const sectionListElement = document.querySelector("#list-container");
    sectionListElement.innerHTML = "";

    // Lista de usuários
    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group", "mb-3");
    sectionListElement.append(ulElement);

    const response = await userListApi({ page: currentPage });

    const users = response.data;
    const nextPage = response.next;

    ulElement.innerHTML = "";
    users.forEach((user) => {
        const liElement = userRender(user);
        ulElement.append(liElement);
    });

    // Controles de paginação
    const paginationElement = document.createElement("div");
    paginationElement.classList.add("d-flex", "align-items-center", "gap-2", "justify-content-center");

    const prevButton = document.createElement("button");
    prevButton.classList.add("btn", "btn-outline-primary", "btn-sm");
    prevButton.innerText = "← Anterior";
    prevButton.disabled = currentPage <= 1;
    prevButton.addEventListener("click", () => listUserRender(currentPage - 1));

    const pageLabel = document.createElement("span");
    pageLabel.classList.add("text-muted", "small");
    pageLabel.innerText = `Página ${currentPage}`;

    const nextButton = document.createElement("button");
    nextButton.classList.add("btn", "btn-outline-primary", "btn-sm");
    nextButton.innerText = "Próxima →";
    nextButton.disabled = nextPage === null;
    nextButton.addEventListener("click", () => listUserRender(currentPage + 1));

    paginationElement.append(prevButton, pageLabel, nextButton);
    sectionListElement.append(paginationElement);
}
