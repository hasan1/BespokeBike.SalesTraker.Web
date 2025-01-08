export interface Sale {
  saleId: number;
  employeeId: number;
  customerId: number;
  salesDate: Date;
  totalAmount: number;
  isActive: boolean;
}

export interface SaleCreateDto {
  employeeId: number;
  customerId: number;
  salesDate: Date;
  totalAmount: number;
  isActive: boolean;
}

export interface SaleUpdateDto {
  saleId: number;
  employeeId: number;
  customerId: number;
  salesDate: Date;
  totalAmount: number;
  isActive: boolean;
}
