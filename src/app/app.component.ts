import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryService } from './services/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'category', 
    'item', 
    'quantity', 
    'datePurchase',
    'actions'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _invService: InventoryService,
    private _coreService: CoreService 
  ) {}

  ngOnInit(): void {
   this.getInventoryList();
    
  };

  openAddInventoryForm() {
    const dialogRef = this._dialog.open(InventoryFormComponent) //This will open the form dialog box

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getInventoryList();
        }
      }
    })
  };

  getInventoryList() {
    this._invService.getInventoryList().subscribe({ //fetch and watch data on html
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  };

  deleteInventory(id: number) {
    this._invService.deletetInventory(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Item is deleted!', 'Done!');
        this.getInventoryList();
      },
      error: console.log
    })
  }

  editInventory(data: any) {
   const dialogRef = this._dialog.open(InventoryFormComponent, {
    data,
   })

   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getInventoryList();
      }
    }
  })
  }

  applyFilter(event: Event) { //filtering html data
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
};
