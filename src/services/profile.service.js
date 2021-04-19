import axios from "axios"
import { throwErrors, defaultUrl, prefiks } from "./config.service"

const changeAvatar = async ({ userID, bodyFormData }) => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/users/upload/${userID}`,
      data: bodyFormData,
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        "Content-Type": "multipart/form-data"
      },
      method: "put"
    })
  
    return res.data
  }
  catch (err) {
    throw throwErrors(err)
  }
}

export {
  changeAvatar
}
