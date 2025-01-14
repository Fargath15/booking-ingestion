import Joi from "joi";
import { IDateFilter } from "./common.model";

export interface IAddBookingRequest {
  booking_uid: string;
  customer_name: string;
  booking_date: Date;
  amount: number;
  vendor: string;
}

export interface ISearchBooking {
  booking_uid: string;
  booking_uids: string[];
  customer_name: string;
  booking_date: Date;
  amount: number;
  vendor: string;
  vendors: string[];
  search_date_column: string;
  date_filter: IDateFilter;
}

export const addBookingSchemaValidate = Joi.object<IAddBookingRequest>({
  booking_uid: Joi.string().required(),
  customer_name: Joi.string().required(),
  amount: Joi.number().required(),
  vendor: Joi.string().required(),
  booking_date: Joi.string().isoDate().required(),
});

export const getBookingSchemaValidate = Joi.string<string>().required();

export const searchBookingSchemaValidate = Joi.object<ISearchBooking>({
  booking_uid: Joi.string(),
  booking_uids: Joi.array(),
  customer_name: Joi.string(),
  amount: Joi.number(),
  vendor: Joi.string(),
  booking_date: Joi.string().isoDate(),
  date_filter: Joi.object({
    date_from: Joi.string().isoDate(),
    date_to: Joi.string().isoDate(),
  }),
});

export const deleteBookingSchemaValidate = Joi.string<string>().required();
