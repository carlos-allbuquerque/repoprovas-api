import dotenv from 'dotenv';
import { search, createUser } from "../repositories/authRepository.js";
import { userData, newUserData } from "../types/authTypes.js";
import { encryptAccountPassword, decryptAccountPassword, generateToken } from "../utils/passwordUtils.js";
import error from "../types/errorType.js";

dotenv.config();

export async function create(user: newUserData){
  const userExists = await search(user.email);

  if (userExists) {
    throw <error> { code: "conflict", message: "Email already registered" };
  }
  if (user.password !== user.confirmPassword) {
    throw <error> {code: "422", message: "unprocessable"};
  }

  const hashedPass = encryptAccountPassword(user.password);
  const treatedUserData = {
    email: user.email,
    password: hashedPass
  };
  const newUser = await createUser(treatedUserData);

  return newUser;
}

export async function acess(user: userData) {
  const userExists = await search(user.email);
  const error: error = { 
    code: "unauthorized", 
    message: "Wrong email or password",
  };

  if (!userExists) throw error;

  const { id, password, email } = userExists;
  if (user.email !== email || !decryptAccountPassword(user.password, password)) {
    throw error
  }
  const token = generateToken({ id });

  return token;
}