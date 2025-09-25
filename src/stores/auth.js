import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    async login(email, password) {
      // 🔹 Mock service
      if (email === "web3@front.com" && password === "123456") {
        this.user = { email };
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        throw new Error("Credenciales inválidas");
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
