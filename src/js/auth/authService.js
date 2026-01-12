import { showToast } from "../../utils/toast.js";

export class AuthService {
  async login(username, password) {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 300,
        }),
      });

      if (!res.ok) {
        showToast("Invalid credentials", "error");
        return null;
      }

      const data = await res.json();

      const userData = {
        id: data.id,
        username: data.username,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));

      return data;
    } catch (error) {
      showToast(`${error.message}`, "error");
      return null;
    }
  }

  logout() {
    localStorage.removeItem("userInfo");
    window.location.replace("login.html");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  isLoggedIn() {
    return !!localStorage.getItem("userInfo");
  }
}
