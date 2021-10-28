import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data:null,
    loading: false,
    error: ''
};

export const fetchUser = createAsyncThunk(
    'user/fetch', async () => {
        const { data } = await axios.get('https://randomuser.me/api/')
        return data.results[0]
    })
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading = false
            state.error = "Error fetching user data!"
        })
    }
})

fetchUser()
export default userSlice.reducer


