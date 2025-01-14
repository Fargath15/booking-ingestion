import { Booking } from "../entity/booking.entity";
import { getRepository, Repository } from "typeorm";
import { ConnectionService } from "../db_connection";
import { IAddBookingRequest, ISearchBooking } from "../models/booking.model";
import { IDateFilter } from "../models/common.model";

export class BookingRepository {
  public mRepository!: Repository<Booking>;

  constructor() {
    const connection = new ConnectionService().GetConnection();
    this.mRepository = connection.getRepository(Booking);
  }

  async createBooking(data: IAddBookingRequest): Promise<Booking> {
    const booking = await this.mRepository.create({ ...data, created_at: new Date() });
    return this.mRepository.save(booking);
  }

  async getBookingByUid(booking_uid: string): Promise<Booking> {
    const booking = await this.mRepository.findOne({ where: { booking_uid: booking_uid } });
    return booking as Booking;
  }

  async getBookingById(booking_id: string): Promise<Booking> {
    const booking = await this.mRepository.findOne({ where: { booking_id: booking_id } });
    return booking as Booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const bookings = await this.mRepository.find({});
    return bookings as Booking[];
  }

  async deleteBookingById(booking_uid: string): Promise<boolean> {
    const bookingItem = await this.getBookingByUid(booking_uid);
    if (bookingItem) {
      const booking = await this.mRepository.remove(bookingItem);
      return booking ? true : false;
    }
    return false;
  }

  async searchBooking(filter: ISearchBooking): Promise<Booking[]> {
    let query: string = "SELECT * FROM booking ";
    let params: any[] = [];

    if (filter.booking_date) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(filter.booking_date);
      query += "booking_date=$" + params.length.toString();
    }

    if (filter.booking_uid) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(filter.booking_uid);
      query += "booking_uid=$" + params.length.toString();
    }

    if (filter.vendor) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(filter.vendor);
      query += "vendor=$" + params.length.toString();
    }

    if (filter.customer_name) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(filter.customer_name.toLowerCase());
      query += "LOWER(customer_name)=$" + params.length.toString();
    }

    if (filter.booking_date) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(filter.booking_date);
      query += "booking_date=$" + params.length.toString();
    }

    if (filter.booking_uids) {
      if (params.length > 0) {
        query += " AND ";
      } else {
        query += " WHERE ";
      }
      query += "booking_uid IN (";
      for (let i = 0; i < filter.booking_uids.length; i++) {
        if (i > 0) {
          query += ",";
        }
        const booking_uid = filter.booking_uids[i];
        params.push(booking_uid);
        query += "$" + params.length.toString();
      }
      query += ") ";
    }

    if (filter.vendors) {
      if (params.length > 0) {
        query += " AND ";
      } else {
        query += " WHERE ";
      }
      query += "vendor IN (";
      for (let i = 0; i < filter.vendors.length; i++) {
        if (i > 0) {
          query += ",";
        }
        const vendor = filter.vendors[i];
        params.push(vendor);
        query += "$" + params.length.toString();
      }
      query += ") ";
    }

    const dateFilterQuery = await this.GenerateDateFilter(filter.date_filter, params, filter.search_date_column ? filter.search_date_column : "created_at");
    if (dateFilterQuery?.query) {
      query += dateFilterQuery.query;
      params = dateFilterQuery.params;
    }

    console.log(query, params);

    const data: Booking[] = await this.mRepository.query(query, params);
    return data;
  }

  async GenerateDateFilter(dateFilter: IDateFilter, searchparams: any[], column: string = "created_at"): Promise<{ query: string; params: any[] }> {
    let query: string = "";
    let params: any[] = searchparams.slice();

    if (dateFilter?.date_from && dateFilter?.date_to) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(dateFilter.date_from);
      query += "( " + column + " BETWEEN " + dateFilter.date_from + "=$" + params.length.toString();

      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(dateFilter.date_to);
      query += " AND " + dateFilter.date_to + "=$" + params.length.toString() + ") ";
    } else if (dateFilter?.date_from) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(dateFilter.date_from);
      query += column + ">=$" + params.length.toString();
    } else if (dateFilter?.date_to) {
      if (params.length === 0) {
        query += " WHERE ";
      } else {
        query += " AND ";
      }
      params.push(dateFilter.date_to);
      query += column + "<=$" + params.length.toString();
    }

    return { query: query, params: params };
  }
}
