import { showToast } from "../../utils/toast.js";
import { PostService } from "./postService.js";

export class BlogController {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.postService = new PostService();

    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      alert("You must login first!");
      window.location.replace("login.html");
    }

    this.preventBack();

    window.addEventListener("DOMContentLoaded", () => {
      this.init();
    });
  }

  preventBack() {
    // Push state for current page
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      alert("You cannot go back after logout!");
      window.history.pushState(null, null, window.location.href);
    };

    // Optional: prevent refresh/back unload warning
    window.onbeforeunload = function () {
      return "Are you sure you want to leave?";
    };
  }

  createSkeletonCard() {
    const skeleton = document.createElement("div");
    skeleton.className =
      "bg-zinc-900 rounded-xl p-6 animate-pulse flex flex-col justify-between h-40 mb-4";
    skeleton.innerHTML = `
      <div class="space-y-2">
        <div class="h-5 bg-zinc-700 rounded w-3/4"></div>
        <div class="h-4 bg-zinc-700 rounded w-full"></div>
        <div class="h-4 bg-zinc-700 rounded w-5/6"></div>
      </div>
      <div class="flex justify-between mt-4 text-xs text-zinc-600">
        <div class="h-3 bg-zinc-700 rounded w-12"></div>
        <div class="h-3 bg-zinc-700 rounded w-20"></div>
      </div>
    `;
    return skeleton;
  }

  async init() {
    this.container.innerHTML = "";
    const skeletons = [];
    for (let i = 1; i <= 9; i++) {
      const sk = this.createSkeletonCard();
      skeletons.push(sk);
      this.container.appendChild(sk);
    }
    await this.renderPosts(skeletons);
  }

  async renderPosts(skeletons) {
    try {
      const posts = await this.postService.getPosts(1000);
      skeletons.forEach((sk) => sk.remove());

      posts.forEach((post) => {
        const card = document.createElement("a");
        card.href = "#";
        card.className =
          "block bg-zinc-900 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl animate-fade mb-4";

        card.innerHTML = `
          <div class="p-4">
            <h3 class="text-lg font-semibold text-white mb-2">${post.title}</h3>
            <p class="text-zinc-400 text-sm line-clamp-3">${post.body}</p>
          </div>
          <div class="px-4 pb-4 flex items-center justify-between text-xs text-zinc-500">
            <span>${post.reactions.likes} ❤️</span>
            <span>${post.tags.join(", ")}</span>
          </div>
        `;
        this.container.appendChild(card);
      });
    } catch (err) {
      showToast(`${err.message}`, "error");
      this.container.innerHTML =
        "<p class='text-red-500 text-center'>Failed to load posts</p>";
    }
  }
}
