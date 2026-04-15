export type ServiceErrorCode = 'CONFLICT' | 'NOT_FOUND' | 'VALIDATION_ERROR';

export class ServiceError extends Error {
  constructor(
    public readonly code: ServiceErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}
