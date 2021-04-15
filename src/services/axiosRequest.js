import axios from 'axios'
const defaultUrl = process.env.VUE_APP_API_URL


// const token = localStorage.getItem('token');
// if (token) {
//   axios.interceptors.request.use(req => {
//     console.log(req)
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     // Important: request interceptors **must** return the request.
//     return req;
//   })
// }

export const apiRequest = async ({ url, body = {}, method, token = '' }) => {
  try {
    if (token) {
      const res = await axios({
        url: `${defaultUrl}${url}`,
        headers: { 'Authorization': `Bearer ${token}` },
        method, 
        body
      })
      return res.data
    }
    else {
      const res = await axios[method](`${defaultUrl}${url}`, body)
      return res.data
    }
  }
  catch(err) {
    throw {
      errorMessage: err.response.data.error
    }
  }
}