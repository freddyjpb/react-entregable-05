import { configureStore } from "@reduxjs/toolkit";
import trainer from './slices/trainer.slice';
import theme from './slices/theme.slice';
import pokemonsPerPage from './slices/pokemonsPerPage.slice';

export default configureStore({
    reducer: {
        trainer,
        theme,
        pokemonsPerPage
    }
})