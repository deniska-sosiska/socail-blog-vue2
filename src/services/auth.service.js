import axios from 'axios'
import { throwErrors, defaultUrl, prefiks } from "./config.service"


const getAccountDataByToken = async (token) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/auth/user`,
      method: "get",
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    })

    return res.data
  }
  catch(err) {
    throw throwErrors(err)
  }
}

const authCurrentUser = async ({email, password}) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/auth`,
      data: { 
        email,
        password
      },
      method: "POST"
    })

    return res.data
  }
  catch (err) {
    throw throwErrors(err)
  }
}

const registrationUser = async ({name, email, password}) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/users`,
      data: {
        email,
        password,
        name
      },
      method: "post"
    })
    
    return res.data
  }
  catch (err) {
    throw throwErrors(err)
  }
} 


export {
  authCurrentUser,
  registrationUser,
  getAccountDataByToken
}