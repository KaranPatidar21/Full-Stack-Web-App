import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["job_seeker", "employer"];

function publicUser(user) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
}

function createToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function validateUserInput({ fullName, email, password, role }, includeName) {
  if (includeName && (!fullName || fullName.trim().length < 2)) {
    return "Full name must be at least 2 characters.";
  }
  if (!email || !emailPattern.test(email)) {
    return "Please provide a valid email address.";
  }
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (includeName && !roles.includes(role)) {
    return "Please select a valid role.";
  }
  return null;
}

export async function signup(request, response, next) {
  try {
    const { fullName, email, password, role } = request.body;
    const validationMessage = validateUserInput(
      { fullName, email, password, role },
      true
    );

    if (validationMessage) {
      return response.status(400).json({ message: validationMessage });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    return response.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    return next(error);
  }
}

export async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    const validationMessage = validateUserInput({ email, password }, false);
    if (validationMessage) {
      return response.status(400).json({ message: validationMessage });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    const passwordMatches = user && await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    return response.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
}

export async function getProfile(request, response, next) {
  try {
    const user = await User.findById(request.auth.userId);
    if (!user) {
      return response.status(401).json({ message: "User account no longer exists." });
    }

    return response.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
}
