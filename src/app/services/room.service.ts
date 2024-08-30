import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, Rooms } from '../models/room.model';
import { Observable } from 'rxjs';
import { GuestHousesService } from './guest-houses.service';
import { GuestHouses } from '../models/guestHouses.model';
import { Book } from '../role/user/user-layout/room-display/book-room/book-room.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private http: HttpClient,
    private guesthouse: GuestHousesService
  ) {}
  guesthouses: GuestHouses[] = [];
  url = environment.apiUrl;

  getRoomByGuesthouseId(id: string) {
    return this.http.get<Rooms[]>(`${this.url}/Room/GuestHouse/${id}`);
  }
  getRoomById(id: string) {
    return this.http.get<Room>(`${this.url}/Room/${id}`);
  }
  bookRoom(id: string, book: Book): Observable<any> {
    return this.http.post<any>(`${this.url}/Room/Book`, {
      roomId: id,
      bookFrom: book.bookFrom,
      bookTo: book.bookTo,
      room: {
        id: book.room.id,
        name: book.room.name,
        description: book.room.description,
        image: book.room.image,
        price: book.room.price,
        numberOfBeds: book.room.numberOfBeds,
        guestHouseId: book.room.guestHouseId,
        amenities: book.room.amenities,
      },
    });
  }
}

// addRoom(id: string | null, data: Rooms): Observable<Rooms> {
//   return this.http.post<Rooms>(`${this.url}`, {
//     name: data.name,
//     description: data.description,
//     image: data.image,
//     price: data.price,
//     numberOfBeds: data.numberOfBeds,
//     guestHouseId: id,
//     amenities: data.amenities,
//   });
// }
// getAllRooms(id: string) {
//   return this.http.get<Rooms[]>(`${this.url}/GuestHouse/${id}`);
// }
// getRoom(id: string): Observable<Rooms[]> {
//   return this.http.get<Rooms[]>(`${this.url}/${id}`);
// }
// updateRooom(id: string, data: Rooms): Observable<Rooms> {
//   return this.http.put<Rooms>(`${this.url}/Room/${id}`, data);
// }
// deleteRoom(id: string): Observable<any> {
//   return this.http.delete(`${this.url}/Room/${id}`);
// }
// constructor(
//   private http: HttpClient,
//   private guesthouse: GuestHousesService
// ) {}
// guesthouses: GuestHouses[] = [];
// url = 'http://localhost:5157/api/Room';

// getRoomByGuesthouseId(id: string) {
//   return this.http.get<Rooms[]>(`${this.url}/GuestHouse/${id}`);
// }
// getRoomById(id: string) {
//   return this.http.get<Room>(`${this.url}/${id}`);
// }
// bookRoom(id: string, book: Book): Observable<any> {
//   return this.http.post<any>(`${this.url}/Book`, {
//     roomId: id,
//     bookFrom: book.bookFrom,
//     bookTo: book.bookTo,
//     room: {
//       id: book.room.id,
//       name: book.room.name,
//       description: book.room.description,
//       image: book.room.image,
//       price: book.room.price,
//       numberOfBeds: book.room.numberOfBeds,
//       guestHouseId: book.room.guestHouseId,
//       amenities: book.room.amenities,
//     },
//   });
