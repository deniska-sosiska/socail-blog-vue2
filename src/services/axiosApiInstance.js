import axios from "axios"

const defaultUrl = process.env.VUE_APP_API_URL
const prefiks = process.env.VUE_APP_PREFIKS

const axiosApiInstance = ({ token = Boolean, formData = Boolean } = {}) => {
  
  const instance = axios.create({
    baseURL: `${defaultUrl}${prefiks}`,
    headers: { 
      'Accept': 'application/json'
    }
  })
  
  // Request interceptor for API calls
  instance.interceptors.request.use((config) => {
  
    if (token) config.headers['Authorization'] = `Bearer ${localStorage.token}`
    else if (formData) config.headers['Content-Type'] = "multipart/form-data" 

    // console.log("new config: ", config)
    return config
  },
    (error) => {
      Promise.reject(error)
  })

  // Response interceptor for API calls
  instance.interceptors.response.use(
    (response) => response, 
    (error) => {

      const originalRequest = error.response;
      let answerError = ''

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

      return Promise.reject(answerError)
  })

  return instance
}

export default axiosApiInstance