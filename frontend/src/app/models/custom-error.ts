export interface CustomError {
  timestamp: string;
  status: number;
  error: string;
  Message: FieldError[];
  path: string;
}

export interface FieldError {
  fieldName: string;
  message: string;
}