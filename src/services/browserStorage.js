const __exists = (key) => {
  return localStorage.getItem(key) !== null
}
const __get = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
const __set = (key, value) => {
  localStorage.setItem(key, value);
}

export const browserStorage = {
  __exists,
  __get,
  __set
}