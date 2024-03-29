export type ServiceErrorType = 'INVALID_DATA'
| 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNPROCESSABLE_ENTITY';

export type ServiceResponseError = {
  status: ServiceErrorType;
  data: { message: string }
};

export type ServiceSuccess<T> = {
  status: 'SUCCESSFUL';
  data: T
}; 

export type ServiceResponse<T> = ServiceResponseError | ServiceSuccess<T>;
