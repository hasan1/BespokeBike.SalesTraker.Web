import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ProductComponent } from './Components/product/product.component';
import { SalesComponent } from './Components/sales/sales.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorrelationHeaderInterceptor } from './Extension/CorrelationHeaderInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomerUpdateComponent } from './Components/customer/customer-update/customer-update.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    SalesComponent,
    EmployeeComponent,
    CustomerComponent,
    CustomerUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: CorrelationHeaderInterceptor, multi: true },
     provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
