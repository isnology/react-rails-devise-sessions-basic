import axios from 'axios'

function getMetaContent () {
  const metaTags = document.getElementsByTagName('meta')
  return metaTags[1].content
}

export function csrf () {
  axios.defaults.headers.common['X-CSRF-Token'] = getMetaContent("csrf-token")
}

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export default api
