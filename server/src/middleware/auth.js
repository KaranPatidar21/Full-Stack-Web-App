import jwt from "jsonwebtoken";

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return response.status(401).json({ message: "Authentication is required." });
  }

  try {
    request.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return response.status(401).json({ message: "Invalid or expired token." });
  }
}
