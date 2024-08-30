import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { GuestHouses } from '../models/guestHouses.model';
import { Rooms } from '../models/room.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addGuesthouse(guesthouseData: GuestHouses) {
    return this.http.post(`${this.apiUrl}/GuestHouse`, {
      //   id: guesthouseData.id,
      name: guesthouseData.name,
      description: guesthouseData.description,
    });
  }

  updateGuesthouse(id: string, data: GuestHouses): Observable<GuestHouses> {
    return this.http.put<GuestHouses>(`${this.apiUrl}/GuestHouse/${id}`, data);
  }

  deleteGuesthouse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/GuestHouse/${id}`);
  }

  addRoom(id: string | null, data: Rooms): Observable<Rooms> {
    return this.http.post<Rooms>(`${this.apiUrl}/Room`, {
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      numberOfBeds: data.numberOfBeds,
      guestHouseId: id,
      amenities: data.amenities,
    });
  }
  updateRoom(id: string, data: Rooms): Observable<Rooms> {
    return this.http.put<Rooms>(`${this.apiUrl}/Room/${id}`, data);
  }

  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Room/${id}`);
  }
}

// private apiUrl = 'http://localhost:5157/api';
// constructor(private http: HttpClient) {}

// addGuesthouse(guesthouseData: GuestHouses) {
//   return this.http.post(`${this.apiUrl}/GuestHouse`, {
//     //   id: guesthouseData.id,
//     name: guesthouseData.name,
//     description: guesthouseData.description,
//   });
// }

// updateGuesthouse(id: string, data: GuestHouses): Observable<GuestHouses> {
//   return this.http.put<GuestHouses>(`${this.apiUrl}/GuestHouse/${id}`, data);
// }

// deleteGuesthouse(id: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/GuestHouse/${id}`);
// }

// addRoom(id: string | null, data: Rooms): Observable<Rooms> {
//   return this.http.post<Rooms>(`${this.apiUrl}/Room`, {
//     name: data.name,
//     description: data.description,
//     image: data.image,
//     price: data.price,
//     numberOfBeds: data.numberOfBeds,
//     guestHouseId: id,
//     amenities: data.amenities,
//   });
// }
// updateRoom(id: string, data: Rooms): Observable<Rooms> {
//   return this.http.put<Rooms>(`${this.apiUrl}/Room/${id}`, data);
// }

// deleteRoom(id: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/Room/${id}`);
// }
