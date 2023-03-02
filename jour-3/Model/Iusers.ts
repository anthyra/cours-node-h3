export interface Iusers {
    id ?: string,
    lastname: string;
    firstname: string;
    role: Role

}

export enum Role {
    admin = "admin",

    client = "client",

    guest = "guest"
}