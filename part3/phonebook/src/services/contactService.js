import axios from "axios"
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    // you must return the value to collect it
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    // add return here
    return axios.post(baseUrl, newObject).then(axiosRes => axiosRes.data)
    // .catch(err => err.response.data.error)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(axiosRes => console.log(axiosRes))
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export const contactService = { getAll, create, remove, update }