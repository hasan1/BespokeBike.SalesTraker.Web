export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: Date;
  email: string;
  isActive: boolean;
}

export interface CustomerCreateDto
{
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  startDate: Date;
}


export interface CustomerUpdateDto {
  customerId: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: Date;
  email: string;
  isActive: boolean;
}
