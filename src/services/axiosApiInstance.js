import axios from "axios"
import { defaultUrl, prefiks } from "./config.service"

const axiosApiInstance = axios.create({
  baseURL: `${defaultUrl}${prefiks}`
})

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use((config) => {

  // config.headers = { 
  //   'Authorization': `Bearer ${localStorage.token}`,
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }

  console.log("new config: ", config)
  return config;
},
  (error) => {
    Promise.reject(error)
});

export default axiosApiInstance