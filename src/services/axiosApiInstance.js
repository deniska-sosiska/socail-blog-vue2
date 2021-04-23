import axios from "axios"
import store from "@/store"
import router from "@/router"

const defaultUrl = process.env.VUE_APP_API_URL
const prefiks = process.env.VUE_APP_PREFIKS

const axiosApiInstance = axios.create({
  baseURL: `${defaultUrl}${prefiks}`,
  headers: { 
    'Accept': 'application/json'
  }
})

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use((config) => {
  if (localStorage.token)
    config.headers['Authorization'] = `Bearer ${localStorage.token}`
  // if (formData) config.headers['Content-Type'] = "multipart/form-data"
  
  // console.log("new config: ", config)
  return config
},
  (error) => {
    Promise.reject(error)
})

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response.data, 
  (error) => {

    let answerError = ''
    const originalRequest = error.response;

    if (originalRequest.data.error[0].message) {
      const resError = {
        errorMessage: originalRequest.data.error[0].message,
        status: originalRequest.status
      }
      answerError = resError
    }
  
    else {
      const resError = {
        errorMessage: originalRequest.data.error,
        status: originalRequest.status
      }
      answerError = resError
    }

    if (answerError.status === 403 && answerError.errorMessage === "Unauthorized") {
      console.log(answerError)
      router.push({ name: "Posts" })
      store.commit("clearCurrentAccountData")
    }


    return Promise.reject(answerError)
})



export default axiosApiInstance