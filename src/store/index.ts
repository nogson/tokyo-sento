import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  setToken: (payload: string) => void;
  removeToken: () => void;
};

export const useTokenStore = create(
  persist<State>(
    (set, get) => ({
      token: "",
      setToken: (payload) => set({ token: payload }),
      removeToken: () => set({ token: "" }),
    }),
    {
      name: "token-storage",
    }
  )
);
