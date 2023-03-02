import { Request, Response } from "express";
import { Iusers } from "../Model/Iusers";
import User from "./User";

class Auth{

    /*
        On crée un utilisateur vide pour stocker l'utilisateur connecté
     */
    currentUser = {} as Iusers

    /*
        On vérifie si l'utilisateur existe dans la liste des utilisateurs
        (User.users) et on le connecte
     */
    public login = (req: Request, res: Response) => {
        const { lastname } = req.body
        this.currentUser = User.users.find(user => user.lastname === lastname) ?? {} as Iusers
        if(this.currentUser.id){
            res.json({text: "User connected"})
        }else{
            res.json({text: "User not found"})
        }
    }
    
    /*
        On déconnecte l'utilisateur en vidant l'utilisateur connecté
     */
    public logout = (req: Request, res: Response) => {
        this.currentUser = {} as Iusers
        res.json({text: "User disconnected"})
    }
}

const auth = new Auth()

export default auth