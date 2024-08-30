export interface UserRegister {
  Username: string;
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: string;
  password: string;
}
export interface UserRegisterResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}
