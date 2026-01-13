import { showToast } from "../../../utils/toast.js";
import { AdminService } from "./adminService.js";

export class AdminDashboardController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.adminService = new AdminService();

    this.init();
  }

  async init() {
    await this.renderStats();
  }

  async renderStats() {
    try {
      const stats = await this.adminService.getStats();

      if (!stats) throw new Error("Stats not found");

      const cards = this.container.querySelectorAll("p.text-3xl");

      cards[0].textContent = stats.userNum;
      cards[1].textContent = stats.postNum;
      cards[2].textContent = stats.recipeNum;
      cards[3].textContent = stats.commentsNum;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error Occured");
    }
  }
}

export class AdminUserController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.adminService = new AdminService();

    this.init();
  }

  async init() {
    await this.renderAllUsers();
  }

  // Skeleton loader rows
  renderSkeleton(rows = 5) {
    const skeletonHTML = Array.from({ length: rows })
      .map(
        () => `
      <tr class="animate-pulse">
        <td class="px-6 py-4 bg-zinc-700 rounded h-4 w-full"></td>
        <td class="px-6 py-4 bg-zinc-700 rounded h-4 w-full"></td>
        <td class="px-6 py-4 bg-zinc-700 rounded h-4 w-full"></td>
        <td class="px-6 py-4 bg-zinc-700 rounded h-4 w-full"></td>
        <td class="px-6 py-4 bg-zinc-700 rounded h-4 w-full"></td>
      </tr>
    `
      )
      .join("");

    this.container.innerHTML = skeletonHTML;
  }

  async renderAllUsers() {
    try {
      this.renderSkeleton(16);
      const users = await this.adminService.getAllUser(1000);

      if (!users || users.length === 0) throw new Error("Users not found");

      // Build HTML for all users
      const rowsHTML = users
        .map(
          (u) => `
      <tr class="text-zinc-400 hover:bg-zinc-800 transition">
        <td class="px-6 py-4">
          <a href="#" class="hover:underline text-zinc-300 hover:text-white transition">${
            u.username
          }</a>
        </td>
        <td class="px-6 py-4">${u.email}</td>
        <td class="px-6 py-4">${u.role}</td>
        <td class="px-6 py-4">${u.phone}</td>
        <td class="px-6 py-4">${u.address?.city || u.country || "-"}</td>
      </tr>
    `
        )
        .join(""); // join array into single string

      // Set container HTML once
      this.container.innerHTML = rowsHTML;
    } catch (error) {
      showToast(`${error.message}`, "error");
      console.error("Error rendering users:", error);
    }
  }
}
