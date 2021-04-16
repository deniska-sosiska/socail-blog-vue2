import axios from 'axios'
const defaultUrl = process.env.VUE_APP_API_URL
const prefiks = process.env.VUE_APP_PREFIKS

const getUserDataByToken = async (token) => {
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

const throwErrors = (err) => {
  const errObj = err.response

  if (errObj.data.error[0].message) 
    return {
      errorMessage: errObj.data.error[0].message,
      status: errObj.status
    }
  else
    return {
      errorMessage: errObj.data.error,
      status: errObj.status
    }
}


export {
  authCurrentUser,
  registrationUser,
  getUserDataByToken
}