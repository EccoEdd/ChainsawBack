import { IBranch } from "./ibranch";

export interface ITeam {
    id?: number,
    name?: string,
    status?: boolean,
    branch_id?: number,
    branch?: IBranch
}
