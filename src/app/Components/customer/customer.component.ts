import { Component } from '@angular/core';
import { Customer, CustomerCreateDto } from '../../Model/Customer';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../Services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: false,

  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  displayedColumns: string[] = ['customerId', 'firstName', 'lastName', 'address', 'phone', 'startDate', 'email', 'isActive', 'actions'];  dataSource = new MatTableDataSource<Customer>();
  private destroy$ = new Subject<void>();
  customerForm: FormGroup;


  constructor(private customerService: CustomerService, public dialog: MatDialog, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      isActive: [false]
    });

  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(customers => {
        this.dataSource.data = customers;
      });
  }

  addCustomer(): void {
    const dialogRef = this.dialog.open(CustomerUpdateComponent, {
      width: '250px',
      data: { customer: {} as Customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const customerCreateDto: CustomerCreateDto = {
          firstName: result.firstName,
          lastName: result.lastName,
          address: result.address,
          phone: result.phone,
          email: result.email,
          startDate: result.startDate,
        };

        this.customerService.addCustomer(customerCreateDto).subscribe(() => this.loadCustomers());
      }
    });
  }


  editCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerUpdateComponent, {
      width: '250px',
      data: { customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.updateCustomer(result).subscribe(() => this.loadCustomers());
      }
    });
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => this.loadCustomers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
