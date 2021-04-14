import axios from 'axios'
const defaultUrl = 'https://nodejs-test-api-blog.herokuapp.com/api/v1'

export const request = async ({ url, body = {}, method }) => {
  const res = await axios[method](`${defaultUrl}${url}`, body)
  return res.data
}