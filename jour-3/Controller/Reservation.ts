import {Request, Response} from 'express';
import { Ireservations } from "../Model/Ireservations";
import * as crypto from "crypto";
import User from "./User";
import Chamber from "./Chamber";

class Reservation {

    reservations: Array<Ireservations> = []

    /*
        On crée un utilisateur avec les données du body de la requête HTTP
        (POST) et on l'ajoute à la liste des utilisateurs (this.reservations)
     */
    createReservation = (req: Request, res: Response) => {

        const reservation: Ireservations = {

            id: crypto.randomUUID(),
            ...req.body

        };

        console.log(req.body)

        this.reservations.push(reservation);

        res.json({text: "Reservation created"});

    }

    /*
        On crée un utilisateur avec des données aléatoires
        et on l'ajoute à la liste des utilisateurs (this.reservations)
     */
    createRandomReservation = (req: Request, res: Response) => {
        const reservations: Ireservations = {
            id: crypto.randomUUID(),
            dateStart: new Date(),
            dateEnd: new Date(),
            price: 500,
            cancelled: false,
            userId: User.users[0]?.id ?? 'no-selected-user',
            chamberNumber: Chamber.chambers[0]?.id ?? 'no-selected-chamber'
        };

        console.log(req.body)

        this.reservations.push(reservations);

        res.json({text: "Reservations created"});

    }

    /*
        On retourne la liste des utilisateurs (this.reservations)
     */
    getAllreservations = (req: Request, res: Response) => {
        res.json(this.reservations);
    }

    /*
       On supprime un utilisateur de la liste des utilisateurs (this.reservations) en fonction de son id
     */
    deleteReservation = (req: Request, res: Response) => {
        const id = req.params.id;
        const reservation = this.reservations.find(p => p.id === id);
        if (reservation) {
            this.reservations = this.reservations.filter(p => p.id !== id);
            res.json({text: "Reservation deleted"});
        } else {
            res.status(404).json({text: "Reservation not found"});
        }
    }

    /*
        On met à jour un utilisateur de la liste des utilisateurs (this.reservations) en fonction de son id
     */
    updateReservation = (req: Request, res: Response) => {
        const id = req.params.id;
        const reservation = this.reservations.find(p => p.id === id);
        if (reservation) {
            this.reservations = this.reservations.map(p => p.id === id ? {...p, ...req.body} : p);
            res.json({text: "Reservation updated"});
        } else {
            res.status(404).json({text: "Reservation not found"});
        }
    }

}

const reservation = new Reservation();

export default reservation;
