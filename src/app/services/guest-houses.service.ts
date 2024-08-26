import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GuestHouses } from '../admin/components/modal/guest-houses/guestHouses.modal';

@Injectable({
  providedIn: 'root',
})
export class GuestHousesService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5157/api/GuestHouse';

  addGuestHouse(data: GuestHouses): Observable<GuestHouses> {
    return this.http.post<GuestHouses>(`${this.url}`, data);
  }
  getAllGuestHOuses(): Observable<GuestHouses[]> {
    return this.http.get<GuestHouses[]>(`${this.url}`);
  }
  getAllGuestHousesByDate(
    checkIn: string,
    checkOut: string,
    numberOfBeds: number
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('checkIn', checkIn)
      .set('checkOut', checkOut)
      .set('numberOfBeds', numberOfBeds.toString());
    return this.http.get<any[]>(this.url, { params });
  }
  getGuestHouse(id: string): Observable<GuestHouses> {
    return this.http.get<GuestHouses>(`${this.url}/${id}`);
  }
  updateGuesthouse(id: string, data: GuestHouses): Observable<GuestHouses> {
    return this.http.put<GuestHouses>(`${this.url}/${id}`, data);
  }

  deleteGuesthouse(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getTopFiveGuestHouses() {
    return this.http.get<GuestHouses[]>(`${this.url}/top-five`);
  }
}
