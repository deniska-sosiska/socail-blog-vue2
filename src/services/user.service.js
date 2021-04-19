import axios from "axios"
import { throwErrors, defaultUrl, prefiks } from "./config.service"

const getAllUsers = async () => {
  try {
    const res = await axios({
      url: `${defaultUrl}${prefiks}/users`,
      method: "get"
    })

    return res.data
  }
  catch(err) {
    throw throwErrors(err)
  }
}

export {
  getAllUsers
}