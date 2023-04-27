import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { InventoryService } from '../services/inventory.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent {
  invForm: FormGroup

  constructor(
    private _fb: FormBuilder, 
    private _invService: InventoryService, 
    private _dialogRef: DialogRef<InventoryFormComponent> 
   ) { //service variable 
    this.invForm = this._fb.group({
      category: '',
      item: '',
      quantity: '',
      datePurchase: '',
    })
  }

  onFormSubmit() {
    if(this.invForm.valid) {
      this._invService.addInventory(this.invForm.value).subscribe({ //inject the inventory form value to inventory service
        next: (val: any) => {
          alert('Inventory added successfully');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
