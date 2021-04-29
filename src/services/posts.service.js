import axiosApiInstance from "@/services/axiosApiInstance"

const getUserByID = async ({ userID }) => {
  try {
    return await axiosApiInstance({
      url: `/users/${userID}`,
      method: "get"
    })
  } catch(err) {
    // console.error("Error in: Services/posts.service/getUserByID(): ", err)
    // console.warn('Заменил пользователя на "User deleted".')
    return { avatar: '', name: "User deleted", _id: userID, email: "User deleted" }
  }
}

const getPostByID = async ({ postID }) => {
  try {
    return await axiosApiInstance({
      url: `/posts/${postID}`,
      method: "get"
    })
  } catch(err) {
    // console.error("Error in: Services/posts.service/getPostByID(): ", err)
    return { avatar: '', name: "Post deleted", _id: postID, likes: []}
  }
}

const setLikePost = async ({ postID }) => {
  await axiosApiInstance({
    url: `/posts/like/${postID}`,
    method: "put"
  })
}

export {
  getUserByID,
  getPostByID,
  setLikePost
}