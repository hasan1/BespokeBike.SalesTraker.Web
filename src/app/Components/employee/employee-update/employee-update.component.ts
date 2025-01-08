// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Components/employee/employee-update/employee-update.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../Model/Employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-update',
  standalone: false,
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {

  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmployeeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private fb: FormBuilder
  ) {

    this.employeeForm = this.fb.group({
      firstName: [data.employee.firstName, Validators.required],
      lastName: [data.employee.lastName, Validators.required],
      address: [data.employee.address, Validators.required],
      phone: [data.employee.phone, Validators.required],
      startDate: [data.employee.startDate, Validators.required],
      terminationDate: [data.employee.terminationDate],
      manager: [data.employee.manager],
      isActive: [data.employee.isActive]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }
}
