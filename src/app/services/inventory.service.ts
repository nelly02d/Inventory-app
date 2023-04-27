import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }

  addInventory(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/inventory', data) //this will push the inventory list to fake database
  }

  getInventoryList(): Observable<any> {
    return this._http.get('http://localhost:3000/inventory') //this will get the inventory list from fake database
  }
}
