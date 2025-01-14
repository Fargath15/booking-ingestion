import express from "express";
import { Booking } from "../entity/booking.entity";
import { addBookingSchemaValidate, deleteBookingSchemaValidate, getBookingSchemaValidate, IAddBookingRequest, ISearchBooking, searchBookingSchemaValidate } from "../models/booking.model";
import { IResponse, ReponseStatus } from "../models/common.model";
import { BookingRepository } from "../repository/booking.repository";
import { BaseController } from "./base-controller.controller";

export class BookingController extends BaseController {
  protected bookingRepository!: BookingRepository;
  public GetBookingRepository(): BookingRepository {
    if (!this.bookingRepository) {
      this.bookingRepository = new BookingRepository();
    }
    return this.bookingRepository;
  }

  constructor(version: string, route_path: string) {
    super(version, route_path);
    this.DefineRoutes(this.router);
  }

  public DefineRoutes(router: express.Router) {
    router.post(
      "/bookings",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => await this.validateAddBooking(req, res, next),
      async (req: express.Request, res: express.Response) => await this.addBooking(req, res)
    );

    router.get(
      "/bookings",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => await this.validateGetBookings(req, res, next),
      async (req: express.Request, res: express.Response) => await this.getBookings(req, res)
    );

    router.get(
      "/booking",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => await this.validateGetBooking(req, res, next),
      async (req: express.Request, res: express.Response) => await this.getBooking(req, res)
    );

    router.delete(
      "/booking",
      async (req: express.Request, res: express.Response, next: express.NextFunction) => await this.validateDeleteBooking(req, res, next),
      async (req: express.Request, res: express.Response) => await this.deleteBooking(req, res)
    );
  }

  async validateAddBooking(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data: IAddBookingRequest = req.body as IAddBookingRequest;
    const { error, value } = addBookingSchemaValidate.validate(data);
    if (error) {
      res.status(401).send(error?.message);
    } else {
      next();
    }
  }

  async validateGetBookings(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data: ISearchBooking = req.body as ISearchBooking;
    const { error, value } = searchBookingSchemaValidate.validate(data);
    if (error) {
      res.status(401).send(error?.message);
    } else {
      next();
    }
  }

  async validateGetBooking(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id: string = req.params?.id as string;
    const { error, value } = getBookingSchemaValidate.validate(id);
    if (error) {
      res.status(401).send(error?.message);
    } else {
      next();
    }
  }

  async validateDeleteBooking(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id: string = req.params?.id as string;
    const { error, value } = deleteBookingSchemaValidate.validate(id);
    if (error) {
      res.status(401).send(error?.message);
    } else {
      next();
    }
  }

  public async addBooking(req: express.Request, res: express.Response) {
    try {
      const data: IAddBookingRequest = req.body as IAddBookingRequest;
      const newBooking: Booking = await this.GetBookingRepository().createBooking(data);
      console.log({ newBooking });
      const response: IResponse<Booking> = { status: ReponseStatus.Success, data: newBooking };
      res.status(201).send(response);
    } catch (error: any) {
      const response: IResponse<Booking> = { status: ReponseStatus.Failed, message: new Error(error)?.message };
      res.status(500).send(response);
    }
  }

  public async getBookings(req: express.Request, res: express.Response) {
    try {
      const filter: ISearchBooking = req.body as ISearchBooking;
      const bookings: Booking[] = await this.GetBookingRepository().searchBooking(filter);
      const response: IResponse<Booking[]> = { status: ReponseStatus.Success, data: bookings };
      res.status(201).send(response);
    } catch (error: any) {
      const response: IResponse<Booking[]> = { status: ReponseStatus.Failed, message: new Error(error)?.message };
      res.status(500).send(response);
    }
  }

  public async getBooking(req: express.Request, res: express.Response) {
    try {
      const booking_uid: string = req.params?.booking_uid as string;
      const booking: Booking = await this.GetBookingRepository().getBookingByUid(booking_uid);
      let response: IResponse<Booking>;
      if (!booking) {
        response = { status: ReponseStatus.Failed, message: "Booking not available" };
      } else {
        response = { status: ReponseStatus.Success, data: booking };
      }
      res.status(201).send(response);
    } catch (error: any) {
      const response: IResponse<Booking> = { status: ReponseStatus.Failed, message: new Error(error)?.message };
      res.status(500).send(response);
    }
  }

  public async deleteBooking(req: express.Request, res: express.Response) {
    try {
      const booking_uid: string = req.params?.booking_uid as string;
      const booking: boolean = await this.GetBookingRepository().deleteBookingById(booking_uid);
      let response: IResponse<Booking>;
      if (!booking) {
        response = { status: ReponseStatus.Failed, message: "Booking not available" };
      } else {
        response = { status: ReponseStatus.Success, message: "Booking removed successfully!!" };
      }
      res.status(201).send(response);
    } catch (error: any) {
      const response: IResponse<Booking> = { status: ReponseStatus.Failed, message: new Error(error)?.message };
      res.status(500).send(response);
    }
  }
}
