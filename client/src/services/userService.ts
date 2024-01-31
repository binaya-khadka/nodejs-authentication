import { MutationFunction } from "@tanstack/react-query";
import { ISignup, ILogin, User } from "../interface";
import axios from 'axios'

const signupUser: MutationFunction<{
  status: number;
  message: string;
  data: User
}, ISignup> = async data => {
  const response = await axios.post('http://localhost:5000/auth/register', data);
  return response?.data;
}

const loginUser: MutationFunction<{
  status: number;
  message: string;
  data: User
}, ILogin> = async data => {
  const response = await axios.post('http://localhost:5000/auth/login', data);
  return response?.data;
}

export { signupUser, loginUser }