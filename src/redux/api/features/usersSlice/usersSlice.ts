import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  bio: string;
  email: string | null;
  followers: string[];
  following: string[];
  image: string |null;
  isBlocked: boolean;
  isPremium: boolean;
  name: string | null;
  password: string;
  recipePublished: string[];
  role: string | null;
  socialLinks: string[];
  _id: string | null;
}

// Define the initial state based on the user data
const initialState: UserState = {
  bio: "", // User bio
  email: null, // User email
  followers: [], // List of followers
  following: [], // List of following users
  image: null, // Profile image URL
  isBlocked: false, // Is the user blocked
  isPremium: false, // Is the user a premium user
  name: null, // User's name
  password: "$2a$12$LNUwA53pJt6e1POWyG7HaevJvAVSa4nEqZ2cCttXHBg0mEDueAT92", // Hashed password
  recipePublished: [], // List of published recipes
  role: null, // User role
  socialLinks: [], // Social media links
  _id: null, // User's unique ID
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    // Clear user info (reset to initial state)
    clearUserInfo: () => initialState,
  },
});

export const {
  setUserInfo,
  clearUserInfo,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;