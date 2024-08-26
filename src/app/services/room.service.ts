import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Room,
  Rooms,
} from '../admin/components/modal/guest-houses/room/room/room.model';
import { Observable } from 'rxjs';
import { GuestHousesService } from './guest-houses.service';
import { GuestHouses } from '../admin/components/modal/guest-houses/guestHouses.modal';
import { Book } from '../user/user-layout/room-display/book-room/book-room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private http: HttpClient,
    private guesthouse: GuestHousesService
  ) {}
  guesthouses: GuestHouses[] = [];
  url = 'http://localhost:5157/api/Room';

  getRoomByGuesthouseId(id: string) {
    return this.http.get<Rooms[]>(`${this.url}/GuestHouse/${id}`);
  }
  getRoomById(id: string) {
    return this.http.get<Room>(`${this.url}/${id}`);
  }
  bookRoom(id: string, book: Book): Observable<any> {
    return this.http.post<any>(`${this.url}/Book`, {
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
}
