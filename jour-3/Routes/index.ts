import express from "express";
import Home from "../Controller/Homepage";
import User from "../Controller/User";
import Chamber from "../Controller/Chamber";
import Reservation from "../Controller/Reservation";
import Auth from "../Controller/Auth";

const router = express.Router();
router.get("/", Home.getHomepage);

router.post("/login", Auth.login);
router.post("/logout", Auth.logout);

router.get("/users", User.getAllUsers);
router.post("/user/new", User.createUser);
router.post("/user/random-new", User.createRandomUser);
router.delete("/user/:id", User.deleteUser);
router.patch("/user/:id", User.updateUser);

router.post("/chamber/new", Chamber.createChamber);
router.post("/chamber/random-new", Chamber.createRandomChamber);
router.get("/chambers", Chamber.getAllchambers);
router.delete("/chamber/:id", Chamber.deleteChamber);
router.patch("/chamber/:id", Chamber.updateChamber);

router.post("/reservation/new", Reservation.createReservation);
router.post("/reservation/random-new", Reservation.createRandomReservation);
router.get("/reservations", Reservation.getAllreservations);
router.delete("/reservation/:id", Reservation.deleteReservation);
router.patch("/reservation/:id", Reservation.updateReservation);
export default router;