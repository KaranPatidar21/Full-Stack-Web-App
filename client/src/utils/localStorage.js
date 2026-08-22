export function getItemFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function setItemInLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}
