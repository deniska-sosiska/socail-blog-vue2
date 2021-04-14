import { request } from './axiosRequest'

const authCurrentUser = async ({email, password}) => {
  try {
    const res = await request({
      url: "/auth",
      body: {
        email,
        password
      },
      method: "post"
    })
    return res
  }
  catch (err) {
    console.error("axiosError: 'auth.service.js - authUser()' \n", err)
  }
}

const registrationUser = async ({name, email, password}) => {
  try {
    const res = await request({
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
  registrationUser
}