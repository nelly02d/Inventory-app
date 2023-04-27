import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }

  addInventory(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/inventory', data) //this will hold the inventory list
  }
}
