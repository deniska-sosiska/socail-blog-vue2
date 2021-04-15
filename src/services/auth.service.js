import { apiRequest } from './axiosRequest'

const getUserDataByToken = async (token) => {
  try {
    const res = await apiRequest({
      url: "/auth/user",
      method: "get",
      token
    })

    return res
  }
  catch(err) {
    console.log("tokenerr: ", err)
  }
}

const authCurrentUser = async ({email, password}) => {
  try {
    const res = await apiRequest({
      url: "/auth",
      body: {
        email,
        password
      },
      method: "post"
    })

    // if (!res) throw { errorMessage: "response - undefined" }

    return res
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