import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_STATUS } from "mini-components/Common/Constants";
import { setNotification } from "state/features/notificationSlice";
import axios from "axios";
import { sortTweetData } from "../../utils/sortTweetData";
import isEqual from "lodash/isEqual";

const initialState = {
  tweets: [],
  status: null,
  user: null,
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Async functions

// Get all tweets from a specific user

export const getTweets = createAsyncThunk(
  "tweets/getTweets",
  async (content, { dispatch, getState }, thunkAPI) => {
    const state = getState();
    const { tweets } = state;
    const existingTweetArray = tweets.tweets;
    console.log("hello123");
    try {
      const user = content;
      const res = await axios.post(`/api/tweets`, content, config);
      let newTweetsArray = sortTweetData(res.data);
      if (
        existingTweetArray.length > 0 &&
        user.user === existingTweetArray[0].user.username
      ) {
        const newTweets =
          existingTweetArray.length === newTweetsArray.length &&
          isEqual(existingTweetArray, newTweetsArray);
        if (!newTweets) {
          dispatch(
            setNotification({
              msg: "New Tweets Added!",
              alertType: "success",
            })
          );
          return { newTweetsArray, user };
        } else {
          newTweetsArray = existingTweetArray;
          return { newTweetsArray, user };
        }
      }
      dispatch(
        setNotification({
          msg: "Tweets fetched!",
          alertType: "success",
        })
      );
      return { newTweetsArray, user };
    } catch (error) {
      const message = error.toString();
      dispatch(setNotification({ msg: message, alertType: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  extraReducers: {
    [getTweets.pending]: (state) => {
      state.status = API_STATUS.PENDING;
    },
    [getTweets.fulfilled]: (state, action) => {
      state.status = API_STATUS.FULFILLED;
      state.tweets = action.payload.newTweetsArray;
      state.user = action.payload.user;
    },
    [getTweets.rejected]: (state) => {
      state.status = API_STATUS.REJECTED;
    },
  },
});

export const {} = tweetsSlice.actions;

export default tweetsSlice.reducer;
