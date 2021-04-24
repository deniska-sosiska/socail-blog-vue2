import axiosApiInstance from "@/services/axiosApiInstance"

const getUserByID = async ({ userID }) => {
  try {
    return await axiosApiInstance({
      url: `/users/${userID}`,
      method: "get"
    })
  } catch(err) {
    console.error("Error in: Services/posts.service/getUserByID(): ", err)
    console.warn('Заменил пользователя на "deleted".')
    return { avatar: '', name: "deleted", _id: userID}
  }
}

const getPostByID = async ({ postID }) => {
  try {
    return await axiosApiInstance({
      url: `/posts/${postID}`,
      method: "get"
    })
  } catch(err) {
    console.error("Error in: Services/posts.service/getPostByID(): ", err)
    // return { avatar: '', name: "deleted", _id: userID}
  }
}

export {
  getUserByID,
  getPostByID
}