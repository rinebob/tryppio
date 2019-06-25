import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient ) { }


  getLocation() {
    // return this.http.get<Location>('http://api.ipapi.com/api.check?');
  }


}
