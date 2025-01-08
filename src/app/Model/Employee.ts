export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: Date;
  terminationDate?: Date;
  manager?: number;
  isActive: boolean;
}

export interface EmployeeCreateDto {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: Date;
  terminationDate?: Date;
  manager?: number;
  isActive: boolean;
}

export interface EmployeeUpdateDto {
  employeeId: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: Date;
  terminationDate?: Date;
  manager?: number;
  isActive: boolean;
}
