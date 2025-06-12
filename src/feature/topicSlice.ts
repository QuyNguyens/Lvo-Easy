import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Topic } from '../types/topic';

interface TopicData{
    systemTopic : Topic[] | null;
    myTopic: Topic[] | null;
    isMyTopic: boolean;
}

const initialState : TopicData = {
    systemTopic: null,
    myTopic: null,
    isMyTopic: false
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
        setIsMyTopic: (state, action: PayloadAction<boolean>) =>{
            state.isMyTopic = action.payload;
        }
    }
})

export const {setSystemTopic, setMyTopic, setIsMyTopic} = topicSlice.actions;

export default topicSlice.reducer;
