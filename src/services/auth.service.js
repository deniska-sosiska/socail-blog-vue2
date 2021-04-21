import axiosApiInstance from "./axiosApiInstance"

const getAccountDataByToken = async () => {
  const res = await axiosApiInstance({ token: true })({
    url: `/auth/user`,
    method: "get",
  })

  return res.data
}

const authCurrentUser = async ({email, password}) => {
  const res = await axiosApiInstance()({
    url: `/auth`,
    data: { 
      email,
      password
    },
    method: "POST"
  })

  return res.data
}

const registrationUser = async ({name, email, password}) => {
  const res = await axiosApiInstance()({
    url: `/users`,
    data: {
      email,
      password,
      name
    },
    method: "post"
  })
  
  return res.data
} 


export {
  authCurrentUser,
  registrationUser,
  getAccountDataByToken
}