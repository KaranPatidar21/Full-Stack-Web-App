export function getUserRole(user) {
  return user?.role || null;
}

export function isEmployer(user) {
  return getUserRole(user) === "employer";
}
