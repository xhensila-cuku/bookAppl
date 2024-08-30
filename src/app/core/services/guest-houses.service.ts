import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GuestHouses } from '../models/guestHouses.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GuestHousesService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl;
  // url = 'http://localhost:5157/api/GuestHouse';

  // addGuestHouse(data: GuestHouses): Observable<GuestHouses> {
  //   return this.http.post<GuestHouses>(`${this.url}`, data);
  // }
  getAllGuestHOuses(): Observable<GuestHouses[]> {
    return this.http.get<GuestHouses[]>(`${this.url}/GuestHouse`);
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
    return this.http.get<any[]>(`${this.url}/GuestHouse`, { params });
  }
  // getGuestHouse(id: string): Observable<GuestHouses> {
  //   return this.http.get<GuestHouses>(`${this.url}/${id}`);
  // }
  // updateGuesthouse(id: string, data: GuestHouses): Observable<GuestHouses> {
  //   return this.http.put<GuestHouses>(`${this.url}/${id}`, data);
  // }

  // deleteGuesthouse(id: string): Observable<any> {
  //   return this.http.delete(`${this.url}/${id}`);
  // }
  getTopFiveGuestHouses() {
    return this.http.get<GuestHouses[]>(`${this.url}/GuestHouse/top-five`);
  }
}