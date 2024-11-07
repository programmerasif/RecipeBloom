import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  bio: string;
  email: string | null;
  followers: string[];
  following: string[];
  image: string | null;
  isBlocked: boolean;
  isPremium: boolean;
  name: string | null;
  password: string;
  recipePublished: string[];
  role: string | null;
  socialLinks: string[];
  _id: string | null;
  token: string | null;
}

const initialState: UserState = {
  bio: "",
  email: null,
  followers: [],
  following: [],
  image: null,
  isBlocked: false,
  isPremium: false,
  name: null,
  password: "$2a$12$LNUwA53pJt6e1POWyG7HaevJvAVSa4nEqZ2cCttXHBg0mEDueAT92",
  recipePublished: [],
  role: null,
  socialLinks: [],
  _id: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setIsPremiumMembership: (state, action: PayloadAction<boolean>) => {
      console.log("Action payload for isPremium:", action.payload); // Debugging log
      state.isPremium = action.payload;
    },
    clearUserInfo: () => initialState,
    updateProfileInfo: (
      state,
      action: PayloadAction<{ name?: string; bio?: string; image?: string }>
    ) => {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      if (action.payload.bio) {
        state.bio = action.payload.bio;
      }
      if (action.payload.image) {
        state.image = action.payload.image;
      }
    },
  },
});

export const { setUserInfo, setIsPremiumMembership, clearUserInfo ,updateProfileInfo} = userSlice.actions;
export default userSlice.reducer;
