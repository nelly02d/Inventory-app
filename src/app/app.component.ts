import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { InventoryFormComponent } from './inventory-form/inventory-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-app';

  constructor(private _dialog: MatDialog) {}

  openAddInventoryForm() {
    this._dialog.open(InventoryFormComponent)
  }
}
