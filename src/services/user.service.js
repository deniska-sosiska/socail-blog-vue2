import axios from "axios"
import { throwErrors, defaultUrl, prefiks } from "./config.service"
import axiosApiInstance from "./axiosApiInstance"

const getAllUsers = async () => {
  try {
    const res = await axiosApiInstance({
      url: `/users`,
      method: "get"
    })

    return res.data
  }
  catch(err) {
    throw throwErrors(err)
  }
}

const changeNameUser = async ({ id, name }) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/users/${id}`,
      data: { name },
      headers: { 
        'Authorization': `Bearer ${localStorage.token}`
      },
      method: "patch"
    })
    
    return res.data
  } catch(err) {
    throw throwErrors(err)
  }
}

const deleteUser = async ({ id }) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/users/${id}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.token}`
      },
      method: "delete"
    })
    
    return res.data
  } catch(err) {
    throw throwErrors(err)
  }
}

export {
  getAllUsers,
  changeNameUser,
  deleteUser
}