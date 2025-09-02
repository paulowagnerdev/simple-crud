const inputName = document.getElementById("input-name");
const gender = document.getElementById("select-gender");
const birthDate = document.getElementById("birth-date");
const submitBtn = document.getElementById("submitBtn");
const table = document.getElementById("table-id");
const body = document.getElementById("tbody");
const inputEdited = document.getElementById("edit-input");


const person = {
    name: '',
    gender: '',
    date: ''
}

table.addEventListener("click", (e) => {
    const element = e.target;

    if (element.matches("#edit")) {
        editPersonValue(element);
    }

})

function editPersonValue(element) {

    const div = element.parentElement;
    const td = div.parentElement;
    const tr = td.parentElement;
    const arrayTr = tr.getElementsByTagName("td");

    hideAndShowElements(arrayTr);

    const personName = tr.querySelector("#person-name");
    const editInput = tr.querySelector("#input-name-edited");

    const personBirthDate = tr.querySelector("#person-birthdate");
    const birthDateEdited = tr.querySelector("#input-birth-date-edited")


    editInput.value = personName.innerText;
    birthDateEdited.value = personBirthDate.innerText;


    const editBtn = tr.querySelector("#edit-btn");

    editBtn.addEventListener("click", () => {

        const editText = editInput.value;

        if (editText && editText.trim().length > 2) {
            personName.innerText = editText;
            hideAndShowElements(arrayTr);
        }

    })

}

    function hideAndShowElements(element) {
        for (const elements of element) {
            if (elements.classList.contains("hide")) {
                elements.classList = "";
            } else {
                elements.classList = "hide"
            }
        }
    }

submitBtn.addEventListener("click", (e) => {

    e.preventDefault();

    person.name = inputName.value;
    person.date = birthDate.value;
    person.gender = gender.value;


    const name = isValidName(person.name);
    const date = isValidDate(person.date);

    if (name && date) {
        insertPerson(person);
    }
})

function insertPerson(person) {
    const domObj = new DOMParser;
    const newTr = domObj.parseFromString(`
    <table>
        <tbody>
           <tr class="newTr">
                <td id="person-name">${person.name}</td>
                <td id="person-gender">${person.gender}</td>
                <td id="person-birthdate">${person.date}</td>
                <td id="person-age">${person.age}</td>
                 <td id="td-div">
                    <div>
                        <button id="edit">Editar</button>
                        <button id="insert">Excluir</button>
                    </div>
                </td>

                <td class="hide">
                    <input type="text" class="edit-input" id="input-name-edited">
                </td>
                <td class="hide">
                    <select name="gender" class="edit-input" id="select-gender" >
                        <option selected value="">--Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>
                </td>
                <td class="hide">
                        <input type="date" class="edit-input" id="input-birth-date-edited">
                </td>
                <td class="hide">37</td>
                <td class="hide" id="td-div-save">
                    <div>
                        <button id="edit-btn">Salvar</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
                `,

        "text/html");

    const tr = newTr.querySelector(".newTr");
    body.appendChild(tr);
    inputName.value = '';
    inputName.focus();

}

function isValidName(name) {
    if (!name) {
        alert("Nome inválido!")
        return false
    } else {
        return true
    }
}

function isValidDate(date) {
    if (!date) {
        alert("Data inválida!")
        return false
    } else {
        return true
    }
}