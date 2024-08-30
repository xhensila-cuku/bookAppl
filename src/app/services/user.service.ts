import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestHousesService } from './guest-houses.service';
import { Users } from '../models/users.model';
import { Observable } from 'rxjs';
import { Book } from '../role/user/user-layout/room-display/book-room/book-room.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/Users`);
  }
  getUserById(id: string) {
    return this.http.get<Users>(`${this.apiUrl}/Users/${id}`);
  }
  getUsersBookings(id: string) {
    return this.http.get<Book[]>(`${this.apiUrl}/Bookings/User/${id}`);
  }
  updateUserWithId(id: string, data: Users): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Users/${id}`, data);
  }
  getBookedRoomById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Bookings/${id}`);
  }
}
