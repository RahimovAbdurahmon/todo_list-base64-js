import { deleteUser , addUser , asyncEditUser , isCompleteUser } from "./api.js"

let box = document.querySelector(".box")

let btnAddDialog = document.querySelector(".btnAddDialog")
let dialogAdd = document.querySelector(".dialogAdd")
let formAdd = document.querySelector(".formAdd")
let btnCancelAdd = document.querySelector(".btnCancelAdd")
let closeAdd = document.querySelector(".closeAdd")

let dialogEdit = document.querySelector(".dialogEdit")
let formEdit = document.querySelector(".formEdit")
let btnCancelEdit = document.querySelector(".btnCancelEdit")
let closeEdit = document.querySelector(".closeEdit")

function get(data) {
    box.innerHTML = ""
    data.forEach(elem => {
        let div = document.createElement("div")
        div.classList.add("div")

        let name = document.createElement("h1")
        name.innerHTML = elem.name
        name.classList.add("name")

        let age = document.createElement("h3")
        age.innerHTML = elem.age
        age.classList.add("age")

        let img = document.createElement("img")
        img.src = elem.img
        img.classList.add("img")

        let btnDelete = document.createElement("button")
        btnDelete.innerHTML = "Delete"
        btnDelete.classList.add("btnDelete")
        btnDelete.onclick = () => {
            deleteUser(elem.id)
        }

        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "Edit"
        btnEdit.classList.add("btnEdit")
        btnEdit.onclick = () => {
            editUser(elem)
        }

        let check = document.createElement("input")
        check.type = "checkbox"
        check.checked = elem.isComplete
        check.classList.add("check")
        check.onclick = () => {
            elem.isComplete = !elem.isComplete
            isCompleteUser(elem.id, elem)
        }
        if (elem.isComplete) {
            name.style.color = "red"
            name.style.textDecoration = "line-through"
            div.style.backgroundColor = "gray"
        }

        div.append(name,img,age,btnDelete,btnEdit,check)
        box.appendChild(div)
    });
}

/// add
btnAddDialog.onclick = () => {
    dialogAdd.showModal()
    formAdd["inpAddImg"].onchange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        formAdd.onsubmit = (event) => {
            event.preventDefault()
            let newUser = {
                name : formAdd["inpAddName"].value,
                img : reader.result,
                age : formAdd["inpAddAge"].value,
                isComplete : false
            }
            addUser(newUser)
            dialogAdd.close()
        }
    }
}
closeAdd.onclick = () => {
    dialogAdd.close()
}
btnCancelAdd.onclick = () => {
    dialogAdd.close()
}


/// edit
closeEdit.onclick = () => {
    dialogEdit.close()
}
btnCancelEdit.onclick = () => {
    dialogEdit.close()
}
function editUser(user) {
    dialogEdit.showModal()
    formEdit["inpEditName"].value = user.name
    formEdit["inpEditAge"].value = user.age
    formEdit["inpEditImg"].onchange = (ev) => {
        let file = ev.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        formEdit.onsubmit = (event) => {
            event.preventDefault()
            let newEditUser = {
                name : formEdit["inpEditName"].value,
                img : reader.result,
                age : formEdit["inpEditAge"].value,
                isComplete : user.isComplete
            }
            asyncEditUser(user.id, newEditUser)
            dialogEdit.close()
        }
    }
}

export { get }