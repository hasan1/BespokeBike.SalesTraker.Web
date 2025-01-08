export interface Product {
  productId: number;
  name: string;
  manufacturer: string;
  style: string;
  quantityOnHand: number;
  isActive: boolean;
}

export interface ProductCreateDto {
  name: string;
  manufacturer: string;
  style: string;
  quantityOnHand: number;
  isActive: boolean;
}

export interface ProductUpdateDto {
  productId: number;
  name: string;
  manufacturer: string;
  style: string;
  quantityOnHand: number;
  isActive: boolean;
}
