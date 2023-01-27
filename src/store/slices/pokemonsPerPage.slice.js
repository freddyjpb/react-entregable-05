import { createSlice } from "@reduxjs/toolkit";

const pokemonsPerPageSlice = createSlice({
    name: "pokemonsPerPage",
    initialState: 16,
    reducers: {
        setPokemonsPerPageGlobal: (state, action) => action.payload
    }
})

export const { setPokemonsPerPageGlobal } = pokemonsPerPageSlice.actions
export default pokemonsPerPageSlice.reducer