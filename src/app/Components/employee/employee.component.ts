import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Employee, EmployeeCreateDto } from '../../Model/Employee';

@Component({
  selector: 'app-employee',
  standalone: false,

  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName', 'address', 'phone', 'startDate', 'terminationDate', 'manager', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  private destroy$ = new Subject<void>();
  employeeForm: FormGroup;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      startDate: ['', Validators.required],
      terminationDate: [''],
      manager: [''],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(employees => {
        this.dataSource.data = employees;
      });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      width: '250px',
      data: { employee: {} as EmployeeCreateDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const employeeCreateDto: EmployeeCreateDto = {
          firstName: result.firstName,
          lastName: result.lastName,
          address: result.address,
          phone: result.phone,
          startDate: result.startDate,
          terminationDate: result.terminationDate,
          manager: result.manager,
          isActive: result.isActive
        };
        this.employeeService.addEmployee(employeeCreateDto).subscribe(() => this.loadEmployees());
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      width: '250px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(() => this.loadEmployees());
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
