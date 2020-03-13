import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiBooking {
    static getBookingList(params) {
        return RequestHelper.get(appConfig.apiUrl + "bookings", params);
    }

    static postBooking(booking) {
        return RequestHelper.post(appConfig.apiUrl + "bookings", booking);
    }

    static updateBooking(booking) {
        return RequestHelper.put(
            appConfig.apiUrl + `bookings/${booking.id}`,
            booking
        );
    }

    static deleteBooking(bookingId) {
        return RequestHelper.delete(appConfig.apiUrl + `bookings/${bookingId}`);
    }
}
