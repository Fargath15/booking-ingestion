import { BaseController } from "./base-controller.controller";
import { BookingController } from "./booking.controller";

export class ControllerFactory {
  getControllers(): Array<BaseController> {
    return [new BookingController("/v1", "/booking-ingestion")];
  }
}
