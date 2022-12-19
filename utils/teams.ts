import axios, { AxiosResponse } from "axios";
import { Teams } from "../interfaces/teams-interface";

const baseURL = "http://localhost:3000/api/teams";

export async function getTeams(): Promise<AxiosResponse<Teams[], any>> {
    return axios.get<Teams[]>(baseURL);
}