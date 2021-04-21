import axiosApiInstance from "./axiosApiInstance"

const changeAvatar = async ({ userID, bodyFormData }) => {
  const res = await axiosApiInstance({ token: true, formData: true})({
    url: `/users/upload/${userID}`,
    data: bodyFormData,
    method: "put"
  })

  return res.data
}

const changeNameAccount = async ({ id, name }) => {
  const res = await axiosApiInstance({ token: true })({
    url: `/users/${id}`,
    data: { name },
    headers: { 
      'Authorization': `Bearer ${localStorage.token}`
    },
    method: "patch"
  })
  
  return res.data
}

const deleteAccount = async ({ id }) => {
  const res = await axiosApiInstance({ token: true })({
    url: `/users/${id}`,
    method: "delete"
  })
  
  return res.data
}

export {
  changeAvatar,
  changeNameAccount,
  deleteAccount
}
