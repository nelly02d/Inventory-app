import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent {
  invForm: FormGroup

  constructor(private _fb: FormBuilder, private _invService: InventoryService ) { //service variable 
    this.invForm = this._fb.group({
      category: '',
      input: '',
      quantity: '',
      datePurchase: '',
    })
  }

  onFormSubmit() {
    if(this.invForm.valid) {
      this._invService.addInventory(this.invForm.value).subscribe({ //inject the inventory form value to inventory service

      })
    }
  }
}
