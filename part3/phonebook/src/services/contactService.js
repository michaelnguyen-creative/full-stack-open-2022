import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl).then(axiosRes => axiosRes.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(axiosRes => axiosRes.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(axiosRes => console.log(axiosRes))
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(axiosRes => axiosRes.data)
}

export const contactService = { getAll, create, remove, update }