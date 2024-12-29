import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../Model/Customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  standalone: false,

  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {

  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CustomerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private fb: FormBuilder
  ) {

    this.customerForm = this.fb.group({
      firstName: [data.customer.firstName, Validators.required],
      lastName: [data.customer.lastName, Validators.required],
      address: [data.customer.address, Validators.required],
      phone: [data.customer.phone, Validators.required],
      email: [data.customer.email, [Validators.required, Validators.email]],
      startDate: [data.customer.startDate, Validators.required],
      isActive: [data.customer.isActive]
    });

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  onSaveClick(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close(this.customerForm.value);
    }
  }
}
