import deleteButtonClickHandler from "../listeners/deleteButtonClickHandler.js";
import editButtonClickHandler from "../listeners/editButtonClickHandler.js";

export default function userRender(user) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    liElement.userId = user.id;

    // Classes .user-info, .user-name e .user-email são usadas pelos handlers de edição
    const infoElement = document.createElement("div");
    infoElement.classList.add("d-flex", "flex-column", "user-info");

    const nameElement = document.createElement("span");
    nameElement.classList.add("user-name");
    nameElement.innerText = user.name;

    const emailElement = document.createElement("small");
    emailElement.classList.add("text-muted", "user-email");
    emailElement.innerText = user.email;

    infoElement.append(nameElement, emailElement);
    liElement.append(infoElement);

    // Grupo de botões à direita
    const buttonGroupElement = document.createElement("div");
    buttonGroupElement.classList.add("d-flex", "gap-1");

    const buttonEditElement = document.createElement("button");
    buttonEditElement.classList.add("btn", "btn-warning", "btn-sm");
    buttonEditElement.innerText = "Editar";
    buttonEditElement.addEventListener("click", editButtonClickHandler);

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", deleteButtonClickHandler);

    buttonGroupElement.append(buttonEditElement, buttonDeleteElement);
    liElement.append(buttonGroupElement);

    return liElement;

}
