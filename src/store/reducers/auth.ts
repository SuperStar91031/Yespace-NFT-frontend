import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types';

const initialUser: IUser = {
  _id: '',
  name: '',
  bio: '',
  avatar: '',
  isCreated: false,
  statue: true,
  addresses: []
};

const initialState = {
  isLoggedIn: false,
  token: '',
  type: '',
  user: initialUser
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    Logout(state, action) {
      state.isLoggedIn = false;
      state.type = '';
      state.token = '';
      state.user = initialUser;
    },

    SetUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },

    SetAddressType(state, action) {
      state.type = action.payload;
    }
  }
});

export default auth.reducer;

export const { Login, Logout, SetAddressType, SetUserData } = auth.actions;
