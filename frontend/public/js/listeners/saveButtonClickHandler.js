import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function saveButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");
    const id = liElement.userId;

    const infoElement = liElement.querySelector(".edit-form");
    const inputs = infoElement.querySelectorAll("input");
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();

    if (!name || !email) {
        alert("Nome e email não podem ficar em branco.");
        return;
    }

    try {
        await userUpdateApi(id, { name, email });
        await listUserRender();
    } catch (error) {
        const status = error?.response?.status;

        if (status === 409) {
            alert("Este email já está em uso por outro usuário.");
        } else {
            alert("Erro ao salvar. Tente novamente.");
        }
    }
}
