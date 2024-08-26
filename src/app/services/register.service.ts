import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister, UserRegisterResponse } from '../register/register.model';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  signup(userData: UserRegister) {
    return this.http.post<UserRegisterResponse>(
      'http://localhost:5157/api/Authentication/Register',
      {
        Username: userData.Username, // Adjusted mapping
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        PhoneNumber: userData.PhoneNumber, // Adjusted mapping
      }
    );
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//   UserRegister,
//   UserRegisterResponse,
// } from '../pagelayout/register/register.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class RegisterService {
//   constructor(private http: HttpClient) {}
//   signup(userData: UserRegister) {
//     return this.http.post<UserRegisterResponse>(
//       'http://localhost:5157/api/Authentication/Register',
//       {
//         username: userData.username,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         email: userData.email,
//         password: userData.password,
//         phoneNumber: userData.phoneNumber,
//       }
//     );
//   }
// }
