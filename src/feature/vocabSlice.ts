import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Vocab } from '../types/vocab';

interface VocabData{
    current: number;
    vocabList: Vocab[];
    vocabRandom: string[];
    selectedAnswer: string | null;
}

const initialState : VocabData = {
    current: 0,
    vocabList: [],
    vocabRandom: [],
    selectedAnswer: null
}

const vocabSlice = createSlice({
    name: 'vocab',
    initialState,
    reducers: {
        setCurrent: (state, action: PayloadAction<number>) =>{
            state.current = action.payload;
        },
        setVocabData: (
            state,
            action: PayloadAction<{ vocabList: Vocab[]; vocabRandom: string[] }>
        ) => {
            state.vocabList = action.payload.vocabList;
            state.vocabRandom = action.payload.vocabRandom;
        },
        setAnswer: (state, action: PayloadAction<string | null>) =>{
            state.selectedAnswer = action.payload;
        },
        reset:(state) =>{
            state.current = 0;
            state.selectedAnswer = null;
        }
    }
})

export const {setCurrent, setVocabData, setAnswer, reset} = vocabSlice.actions;

export default vocabSlice.reducer;
