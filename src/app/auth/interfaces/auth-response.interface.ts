import { User } from "./user.interface";

export interface AuthResponse {
  user:  User;
  token: string;
}

export interface RegisterRequest {
  fullName:string;
  email:string;
  password:string;
}
