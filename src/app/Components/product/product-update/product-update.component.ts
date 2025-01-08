// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Components/product/product-update/product-update.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../Model/Product';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-product-update',
  standalone: false,
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  productForm: FormGroup;
  nameUnique: boolean = true;

  constructor(private productService: ProductService,
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private fb: FormBuilder
  ) {

    this.productForm = this.fb.group({
      productId: [data.product.productId],
      name: [data.product.name, Validators.required],
      manufacturer: [data.product.manufacturer, Validators.required],
      style: [data.product.style, Validators.required],
      quantityOnHand: [data.product.quantityOnHand, Validators.required],
      isActive: [data.product.isActive]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  checkProductNameUnique(): void {
    const productName = this.productForm.get('name')?.value;
    const productId = this.data.product.productId || 0;

    this.productService.isProductNameUnique(productName, productId).subscribe(isUnique => {
      this.nameUnique = isUnique;
      if (!isUnique) {
        this.productForm.get('name')?.setErrors({ notUnique: true });
      }
    });
  }


  onSaveClick(): void {
    if (this.productForm.valid && this.nameUnique) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
