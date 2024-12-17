import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripsUrl = this.apiBaseUrl + '/trips';

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    const httpOptions = {
      headers: {
        'Authorization':`Bearer ${this.storage.getItem('travlr-token')}`
      }
    };
    return this.http.post<Trip>(this.tripsUrl, formData, httpOptions);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.tripsUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.storage.getItem('tavlr-token')}`
      }
    };
    // console.log('Inisde TripDataService::addTrips');
    return this.http.put<Trip>(this.tripsUrl + '/' + formData.code, formData, httpOptions);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<Authresponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<Authresponse>(url, user);
  }
}
