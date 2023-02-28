import { ITeam } from "./iteam";

export interface ICharacter {
    id?: number,
    name: string,
    l_name?: string,
    type?: string,
    alive?: boolean,
    age?: number,
    team_id?: number,
    team?: ITeam
}
