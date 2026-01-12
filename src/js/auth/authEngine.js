import { showToast } from "../../utils/toast.js";
import { AuthService } from "./authService.js";

export class LoginController {
  constructor(form) {
    this.form = document.querySelector(form);
    this.usernameInput = this.form.querySelector("#username");
    this.passwordInput = this.form.querySelector("#password");
    this.authService = new AuthService();

    this.init();
  }

  init() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      await this.login();
    });
  }

  async login() {
    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (!username || !password) {
      showToast("Username and password required", "error");
      return false;
    }

    try {
      const user = this.authService.login(username, password);

      if (user) {
        showToast(`Welcome ${user.firstName}`, "success");
        setTimeout(() => {
          window.location.assign("profile.html");
        }, 1000);
      }
    } catch (error) {
      showToast(`${error.message}`, "error");
    }
  }
}
