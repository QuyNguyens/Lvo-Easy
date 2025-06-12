import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Topic } from '../types/topic';

interface TopicData{
    systemTopic : Topic[] | null;
    myTopic: Topic[] | null;
}

const initialState : TopicData = {
    systemTopic: null,
    myTopic: null,
}

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        setSystemTopic: (state, action: PayloadAction<Topic[]>) =>{
            state.systemTopic = action.payload;
        },
        setMyTopic: (state, action: PayloadAction<Topic[] | null>) =>{
            state.myTopic = action.payload;
        },
    }
})

export const {setSystemTopic, setMyTopic} = topicSlice.actions;

export default topicSlice.reducer;
