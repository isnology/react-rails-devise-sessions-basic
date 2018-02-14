import api from './init'
import axios from 'axios'

function getMetaContent () {
  const metaTags = document.getElementsByTagName('meta')
  return metaTags[1].content
}

function csrf () {
  axios.defaults.headers.common['X-CSRF-Token'] = getMetaContent("csrf-token")
}

function getMetaContent () {
  const metaTags = document.getElementsByTagName('meta')
  return metaTags[1].content
}

export function isSignedIn() {
  return api.get("/auth/is_signed_in")
  .then((res) => res.data)
}

export function signIn(data) {
  csrf()
  return api.post("/users/sign_in", data)
  .then((res) => res.data)
}

export function signOut() {
  csrf()
  return api.delete("/users/sign_out")
  .then((res) => res.data)
}

export function signUp(data) {
  csrf()
  return api.post("/users", data)
  .then((res) => res.data)
}