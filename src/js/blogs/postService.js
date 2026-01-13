import { showToast } from "../../utils/toast.js";

export class PostService {
  constructor(blogGrid) {
    this.blogGrid = document.querySelector(blogGrid);
  }
  async getPosts(limit = 1000) {
    try {
      const res = await fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=0`
      );

      if (!res.ok) {
        showToast("Failed to fetch posts", "error");
        this.blogGrid.innerHTML = `<p class="text-zinc-400 col-span-full text-center mt-[200px]">Loading blogs...</p>`;
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();

      return data.posts;
    } catch (error) {
      showToast(`${error.message}`, "error");
      return null;
    }
  }
}
