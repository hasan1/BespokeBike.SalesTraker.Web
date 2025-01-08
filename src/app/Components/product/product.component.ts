// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Components/product/product.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Product, ProductCreateDto } from '../../Model/Product';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['productId', 'name', 'manufacturer', 'style', 'quantityOnHand', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  private destroy$ = new Subject<void>();
  productForm: FormGroup;

  constructor(private productService: ProductService, public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      style: ['', Validators.required],
      quantityOnHand: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.dataSource.data = products;
      });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '250px',
      data: { product: {} as ProductCreateDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const productCreateDto: ProductCreateDto = {
          name: result.name,
          manufacturer: result.manufacturer,
          style: result.style,
          quantityOnHand: result.quantityOnHand,
          isActive: result.isActive
        };
        this.productService.addProduct(productCreateDto).subscribe(() => {
          this.openSanckBar('Product Created Successfully', 'Close');
          this.loadProducts()
        });
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '250px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result).subscribe(() => {
          this.openSanckBar('Product Updated Successfully', 'Close');
          this.loadProducts()
        });
      }
    });
  }


  openSanckBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000

    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
