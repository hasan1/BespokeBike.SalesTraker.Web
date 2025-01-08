// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Components/sale/sale.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SaleUpdateComponent } from './sale-update/sale-update.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../Services/sale.service';
import { Sale, SaleCreateDto } from '../../Model/Sale';

@Component({
  selector: 'app-sale',
  standalone: false,
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['saleId', 'employeeId', 'customerId', 'salesDate', 'totalAmount', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Sale>();
  private destroy$ = new Subject<void>();
  saleForm: FormGroup;

  constructor(private saleService: SaleService, public dialog: MatDialog, private fb: FormBuilder) {
    this.saleForm = this.fb.group({
      employeeId: ['', Validators.required],
      customerId: ['', Validators.required],
      salesDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getSales()
      .pipe(takeUntil(this.destroy$))
      .subscribe(sales => {
        this.dataSource.data = sales;
      });
  }

  addSale(): void {
    const dialogRef = this.dialog.open(SaleUpdateComponent, {
      width: '250px',
      data: { sale: {} as SaleCreateDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const saleCreateDto: SaleCreateDto = {
          employeeId: result.employeeId,
          customerId: result.customerId,
          salesDate: result.salesDate,
          totalAmount: result.totalAmount,
          isActive: result.isActive
        };
        this.saleService.addSale(saleCreateDto).subscribe(() => this.loadSales());
      }
    });
  }

  editSale(sale: Sale): void {
    const dialogRef = this.dialog.open(SaleUpdateComponent, {
      width: '250px',
      data: { sale }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.updateSale(result).subscribe(() => this.loadSales());
      }
    });
  }

  deleteSale(id: number): void {
    this.saleService.deleteSale(id).subscribe(() => this.loadSales());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
