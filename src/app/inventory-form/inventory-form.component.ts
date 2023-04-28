import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { InventoryService } from '../services/inventory.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit{
  category: string[] = [
    'Bedroom',
    'Living Room',
    'Kitchen',
    'Dressing Room',
    'Tools Room'
  ]

  invForm: FormGroup

  constructor(
    private _fb: FormBuilder, 
    private _invService: InventoryService,
    private _coreService: CoreService, 
    private _dialogRef: MatDialogRef<InventoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any //inject the value that pass in the dialog
   ) { //service variable 
    this.invForm = this._fb.group({
      category: '',
      item: '',
      quantity: '',
      datePurchase: '',
    })
  }

  ngOnInit(): void {
    this.invForm.patchValue(this.data)
  }

  onFormSubmit() {
    if(this.invForm.valid) {
      if(this.data) {
        this._invService.updateInventory(this.data.id ,this.invForm.value).subscribe({ //inject the inventory form value to inventory service
          next: (val: any) => {
            this._coreService.openSnackBar('Inventory detail updated!', 'Done!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._invService.addInventory(this.invForm.value).subscribe({ //inject the inventory form value to inventory service
          next: (val: any) => {
            this._coreService.openSnackBar('Inventory added successfully!', 'Done!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }  
    }
  }
}
