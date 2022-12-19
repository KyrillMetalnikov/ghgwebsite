import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Teams } from "../../interfaces/teams-interface";
import { getTeams } from "../../utils/teams";

export interface TeamsState {
    teams: Teams[];
}

const initialState: TeamsState = {
    teams: []
}

export const getTeamsAsync = createAsyncThunk(
    'teams/getTeams',
    async () => {
        const response = await getTeams();
        return response.data;
    }
)

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        update: (state, action) => {
            state.teams = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTeamsAsync.fulfilled, (state, action) => {
            state.teams = action.payload;
        })
    }
})

export const { update } = teamsSlice.actions;
export const selectTeams = (state: RootState) => state.teams.teams;
export default teamsSlice.reducer;
