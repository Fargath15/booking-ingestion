export interface IDateFilter {
  date_from: Date;
  date_to: Date;
}

export enum ReponseStatus {
  Success = "Success",
  Failed = "Failed",
}

export interface IResponse<T> {
  status: ReponseStatus;
  message?: string;
  data?: T;
}
