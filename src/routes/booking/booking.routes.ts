import { Router } from "express";
import getBookingById from "./get-booking.js";
import getAllbookings from "./get-all-bookings.js";
import getBookingByRestaurant from "./get-booking-restaurant.js";
import getBookingByuser from "./get-booking-user.js";
import createBooking from "./create-booking.js";
import updateBookingById from "./update-booking.js";
import deleteBookingById from "./delete-booking.js";
import validateNewBooking from "../../validators/booking.validator.js";

const router = Router()

//Las peticiones no se llaman Bookings por que en el backend de mis compañeros
//se llama reservation y tiene que ser igual

router.get('/reservation/:id', getBookingById)
router.get('/reservations', getAllbookings)
router.get('/reservations_restaurant/:id', getBookingByRestaurant)
router.get('/reservations_user/:id', getBookingByuser)
router.post('/reservation',validateNewBooking, createBooking)
router.put('/update_reservation/:id', updateBookingById)
router.delete('/delete_reservation/:id', deleteBookingById)

export default router