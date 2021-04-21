import axiosApiInstance from "./axiosApiInstance"

const getAllUsers = async () => { 
  const res = await axiosApiInstance({ token: true })({
    url: `/users/1`,
    method: "get"
  })

  return res.data
}

export {
  getAllUsers,
}