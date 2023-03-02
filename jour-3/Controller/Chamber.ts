import {Request, Response} from 'express';
import { Ichambers } from "../Model/Ichambers";
import * as crypto from "crypto";

class Chamber {

    chambers: Array<Ichambers> = []

    /*
        On crée un utilisateur avec les données du body de la requête HTTP
        (POST) et on l'ajoute à la liste des utilisateurs (this.chambers)
     */
    createChamber = (req: Request, res: Response) => {

        const chamber: Ichambers = {

            id: crypto.randomUUID(),
            ...req.body

        };

        console.log(req.body)

        this.chambers.push(chamber);

        res.json({text: "Chamber created"});

    }

    /*
        On crée un utilisateur avec des données aléatoires
        et on l'ajoute à la liste des utilisateurs (this.chambers)
     */
    createRandomChamber = (req: Request, res: Response) => {
        const chambers: Ichambers = {
            id: crypto.randomUUID(),
            number: Math.ceil(Math.random() * 9),
            floor: Math.ceil(Math.random() * 5),
            price: Math.ceil(Math.random() * 10000),
        };

        console.log(req.body)

        this.chambers.push(chambers);

        res.json({text: "Chambers created"});

    }

    /*
        On retourne la liste des utilisateurs (this.chambers)
     */
    getAllchambers = (req: Request, res: Response) => {
        res.json(this.chambers);
    }

    /*
       On supprime un utilisateur de la liste des utilisateurs (this.chambers) en fonction de son id
     */
    deleteChamber = (req: Request, res: Response) => {
        const id = req.params.id;
        const chamber = this.chambers.find(p => p.id === id);
        if (chamber) {
            this.chambers = this.chambers.filter(p => p.id !== id);
            res.json({text: "Chamber deleted"});
        } else {
            res.status(404).json({text: "Chamber not found"});
        }
    }

    /*
        On met à jour un utilisateur de la liste des utilisateurs (this.chambers) en fonction de son id
     */
    updateChamber = (req: Request, res: Response) => {
        const id = req.params.id;
        const chamber = this.chambers.find(p => p.id === id);
        if (chamber) {
            this.chambers = this.chambers.map(p => p.id === id ? {...p, ...req.body} : p);
            res.json({text: "Chamber updated"});
        } else {
            res.status(404).json({text: "Chamber not found"});
        }
    }

}

const chamber = new Chamber();

export default chamber;
