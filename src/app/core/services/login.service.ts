import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { UserDto } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  login(loginData: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.apiUrl}/Authentication/Login`,
      loginData
    );
  }
}
