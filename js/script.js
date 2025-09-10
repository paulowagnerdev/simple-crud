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
    date: '',
    age: 0
}


submitBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const name = inputName.value;
    const date = formatDate(birthDate.value);
    const isValidInputName = isValidName(name);
    const isValidInputDate = isValidDate(date);


    person.name = name;
    person.date = date;
    person.gender = gender.value;
    person.age = getAge(date);

   
   
    if (isValidInputName && isValidInputDate) {
        insertPerson(person);
    }

})


table.addEventListener("click", (e) => {
    const element = e.target;

    if (element.matches("#edit")) {
        editPersonValue(element);
    }

    if (element.matches("#edit-btn")) {
        submitEdition(element);
    }

    if(element.matches("#delete-btn")){
        deletePerson(element);
    }

})


function getAge(date) {

    const today = new Date();
    const [day, month, year] = date.split('/');
    const personDate = new Date(parseInt(year), parseInt(month-1), parseInt(day))
    console.log(personDate);
    const todayMonth = today.getMonth();
    const personDateMonth = personDate.getMonth();

    let age = today.getFullYear() - personDate.getFullYear();
    age--;

    if(personDateMonth >= todayMonth){
        age++;
    }

    return age

}

function formatDate(date){
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`
}

function submitEdition(element) {
    const parentElement = getParentElement(element);
    const editInput = parentElement.querySelector("#input-name-edited").value;
    const personName = parentElement.querySelector("#person-name");

    if (editInput && editInput.trim().length > 2) {
        personName.innerText = editInput;
    }

    const editGender = parentElement.querySelector("#select-gender").value;
    const gender = parentElement.querySelector("#person-gender");

    if (editGender) {
        gender.innerText = editGender;
    }

    const birthDate = parentElement.querySelector("#person-birthdate");
    const editBirthDate = parentElement.querySelector("#input-birth-date-edited").value;

    const newBirthDate = formatDate(editBirthDate);

    if (editBirthDate && editBirthDate != birthDate.innerText) {
        const personAge = parentElement.querySelector("#person-age");
        const newAge = getAge(newBirthDate)
        personAge.innerText = newAge;
        birthDate.innerText = newBirthDate;
    }

    hideAndShowEditedInputs(parentElement);
}

function editPersonValue(element) {

    const parentElement = getParentElement(element);

    const personName = parentElement.querySelector("#person-name");
    const editInput = parentElement.querySelector("#input-name-edited");

    const personBirthDate = parentElement.querySelector("#person-birthdate");
    const birthDateEdited = parentElement.querySelector("#input-birth-date-edited");

    const personAge = parentElement.querySelector("#person-age");
    const editPersonAge = parentElement.querySelector("#edit-person-age");

    editPersonAge.innerText = personAge.innerText;
    editInput.value = personName.innerText;
    birthDateEdited.value = personBirthDate.innerText;

    hideAndShowEditedInputs(parentElement);

}

function getParentElement(element) {

    const div = element.parentElement;
    const td = div.parentElement;
    const tr = td.parentElement;

    return tr;
}

function deletePerson(element){
    const parentElement = getParentElement(element);
    parentElement.remove();
}

function hideAndShowEditedInputs(parentElement) {

    const arrayTr = parentElement.getElementsByTagName("td");

    for (const elements of arrayTr) {
        elements.classList.toggle("hide")
    }
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
                        <button id="delete-btn">Excluir</button>
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
                <td class="hide" id="edit-person-age"></td>
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
    birthDate.value = '';
    inputName.focus();

}