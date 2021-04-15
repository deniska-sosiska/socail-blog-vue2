import { apiRequest } from './axiosRequest'

const getUserDataByToken = async (token) => {
  try {
    return await apiRequest({
      url: "/auth/user",
      method: "get",
      token
    })
  }
  catch(err) {
    console.log("tokenerr: ", err)
  }
}

const authCurrentUser = async ({email, password}) => {
  try {
    return await apiRequest({
      url: "/auth",
      body: {
        email,
        password
      },
      method: "post"
    })
  }
  catch (err) {
    return err
  }
}

const registrationUser = async ({name, email, password}) => {
  try {
    const res = await apiRequest({
      url: "/users",
      body: {
        email,
        password,
        name
      },
      method: "post"
    })
    return res
  }
  catch (err) {
    console.error("axiosError: 'auth.service.js - registrationUser()' \n", err)
  }
} 


export {
  authCurrentUser,
  registrationUser,
  getUserDataByToken
}