export function requireEmployer(request, response, next) {
  if (request.auth?.role !== "employer") {
    return response.status(403).json({ message: "Only employers can manage job posts." });
  }

  return next();
}
