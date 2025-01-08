// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Components/sale/sale-update/sale-update.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '../../../Model/Sale';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-update',
  standalone: false,
  templateUrl: './sale-update.component.html',
  styleUrls: ['./sale-update.component.css']
})
export class SaleUpdateComponent {

  saleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SaleUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sale: Sale },
    private fb: FormBuilder
  ) {

    this.saleForm = this.fb.group({
      saleId: [data.sale.saleId],
      employeeId: [data.sale.employeeId, Validators.required],
      customerId: [data.sale.customerId, Validators.required],
      salesDate: [data.sale.salesDate, Validators.required],
      totalAmount: [data.sale.totalAmount, Validators.required],
      isActive: [data.sale.isActive]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.saleForm.valid) {
      this.dialogRef.close(this.saleForm.value);
    }
  }
}
