import api, { csrf } from './init'

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