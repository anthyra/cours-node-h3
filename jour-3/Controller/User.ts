import {Request, Response} from 'express';
import {Iusers, Role} from "../Model/Iusers";
import * as crypto from "crypto";

class User {

    users: Array<Iusers> = []

    /*
        On crée un utilisateur avec les données du body de la requête HTTP
        (POST) et on l'ajoute à la liste des utilisateurs (this.users)
     */
    createUser = (req: Request, res: Response) => {

        const user: Iusers = {

            id: crypto.randomUUID(),
            ...req.body

        };

        console.log(req.body)

        this.users.push(user);

        res.json({text: "User created"});

    }

    /*
        On crée un utilisateur avec des données aléatoires
        et on l'ajoute à la liste des utilisateurs (this.users)
     */
    createRandomUser = (req: Request, res: Response) => {
        const roles = [Role.client, Role.admin, Role.guest];
        const user: Iusers = {
            id: crypto.randomUUID(),
            firstname: "Lorem",
            lastname: "ispsum",
            role: roles[this.users.length] ?? Role.guest
        };

        console.log(req.body)

        this.users.push(user);

        res.json({text: "User created"});

    }

    /*
        On retourne la liste des utilisateurs (this.users)
     */
    getAllUsers = (req: Request, res: Response) => {
        res.json(this.users);
    }

    /*
       On supprime un utilisateur de la liste des utilisateurs (this.users) en fonction de son id
     */
    deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const user = this.users.find(user => user.id === id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
            res.json({text: "User deleted"});
        } else {
            res.status(404).json({text: "User not found"});
        }
    }

    /*
        On met à jour un utilisateur de la liste des utilisateurs (this.users) en fonction de son id
     */
    updateUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const user = this.users.find(user => user.id === id);
        if (user) {
            const {firstname, lastname, role} = req.body;
            user.firstname = firstname ?? user.firstname;
            user.lastname = lastname ?? user.lastname;
            user.role = role ?? user.role;
            res.json({text: "User updated"});
        } else {
            res.status(404).json({text: "User not found"});
        }
    }

}

const user = new User();

export default user;
