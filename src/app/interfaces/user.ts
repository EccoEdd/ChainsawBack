import { Irole } from "./irole";

export interface IUser {
    id?: number,
    user?: string,
    email?: string,
    phone?: string,
    password?: string,
    status?: boolean,
    role?: Irole,
    role_id?: number
}
