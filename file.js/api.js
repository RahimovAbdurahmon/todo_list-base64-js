import { get } from "./dom.js";

let url = "http://localhost:3000/data"

/// get
async function getData() {
    try {
        let { data } = await axios.get(url)
        get(data)
    } catch (error) {
        console.log(error);
    }
}

/// delete
async function deleteUser(id) {
    try {
        let { data } = await axios.delete(`${url}/${id}`)
        getData()
    } catch (error) {
        console.log(error);
    }
}

/// add
async function addUser(newUser) {
    try {
        let { data } = await axios.post(url , newUser)
        getData()
    } catch (error) {
        console.log(error);
    }
}

/// edit
async function asyncEditUser(id, newEditUser) {
    try {
        let { data } = await axios.put(`${url}/${id}`, newEditUser)
        getData()
    } catch (error) {
        console.log(error);
    }
}

/// isCompete
async function isCompleteUser(id, user) {
    try {
        let { data } = await axios.put(`${url}/${id}`, user)
        getData()
    } catch (error) {
        console.log(error);
    }
}

export { getData , deleteUser , addUser , asyncEditUser , isCompleteUser }