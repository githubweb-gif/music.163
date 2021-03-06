import Cookies from 'js-cookie'

export function getAuth (name) {
  return Cookies.get(name)
}

export function setAuth (name) {
  return Cookies.set(name)
}

export function removeAuth (name) {
  return Cookies.remove(name)
}
