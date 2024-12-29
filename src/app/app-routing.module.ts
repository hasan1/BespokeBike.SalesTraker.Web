import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { SalesComponent } from './Components/sales/sales.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ProductComponent } from './Components/product/product.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'product', component: ProductComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
