import saveButtonClickHandler from "./saveButtonClickHandler.js";

export default function editButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");

    // Evita abrir dois formulários no mesmo item
    if (liElement.querySelector(".edit-form")) {
        return;
    }

    // Lê os valores atuais exibidos
    const infoElement = liElement.querySelector(".user-info");
    const currentName = infoElement.querySelector(".user-name").innerText;
    const currentEmail = infoElement.querySelector(".user-email").innerText;

    // Substitui o bloco de texto por dois inputs
    infoElement.innerHTML = "";
    infoElement.classList.add("edit-form");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("form-control", "form-control-sm", "mb-1");
    nameInput.value = currentName;
    nameInput.placeholder = "Nome";

    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.classList.add("form-control", "form-control-sm");
    emailInput.value = currentEmail;
    emailInput.placeholder = "Email";

    infoElement.append(nameInput, emailInput);

    // Troca botão Editar por Salvar + Cancelar
    const editButton = event.currentTarget;
    editButton.style.display = "none";

    const saveButton = document.createElement("button");
    saveButton.classList.add("btn", "btn-success", "btn-sm", "me-1");
    saveButton.innerText = "Salvar";
    saveButton.addEventListener("click", saveButtonClickHandler);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-secondary", "btn-sm");
    cancelButton.innerText = "Cancelar";
    cancelButton.addEventListener("click", () => {
        // Restaura o texto original sem ir na API
        infoElement.classList.remove("edit-form");
        infoElement.innerHTML = "";

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("user-name");
        nameSpan.innerText = currentName;

        const emailSmall = document.createElement("small");
        emailSmall.classList.add("text-muted", "user-email");
        emailSmall.innerText = currentEmail;

        infoElement.append(nameSpan, emailSmall);

        saveButton.remove();
        cancelButton.remove();
        editButton.style.display = "";
    });

    // Insere os botões ao lado do Excluir
    editButton.insertAdjacentElement("beforebegin", saveButton);
    editButton.insertAdjacentElement("beforebegin", cancelButton);
}
