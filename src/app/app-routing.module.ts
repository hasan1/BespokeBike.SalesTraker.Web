import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ProductComponent } from './Components/product/product.component';
import { SaleComponent } from './Components/sale/sale.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'product', component: ProductComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
