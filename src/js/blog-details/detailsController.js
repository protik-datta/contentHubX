import { showToast } from "../../utils/toast.js";
import { DetailsService } from "./detailsService.js";

export class DetailsController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.detailsService = new DetailsService();

    this.init();
  }

  async init() {
    this.showSkeleton();
    await this.renderPost();
    await this.renderComments();
    this.setupCommentForm();
  }

  // Skeleton loader
  showSkeleton() {
    this.container.innerHTML = `
      <article class="bg-zinc-900 rounded-2xl p-8 mb-8 animate-pulse">
        <div class="h-8 bg-zinc-700 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-zinc-700 rounded w-1/4 mb-6"></div>
        <div class="space-y-4">
          <div class="h-4 bg-zinc-700 rounded"></div>
          <div class="h-4 bg-zinc-700 rounded w-5/6"></div>
          <div class="h-4 bg-zinc-700 rounded w-2/3"></div>
        </div>
      </article>
      <section class="space-y-4 animate-pulse">
        <div class="h-4 bg-zinc-700 rounded w-1/4 mb-2"></div>
        <div class="h-16 bg-zinc-700 rounded"></div>
        <div class="h-16 bg-zinc-700 rounded"></div>
        <div class="h-16 bg-zinc-700 rounded"></div>
      </section>
    `;
  }

  //   render post

  async renderPost() {
    try {
      const post = await this.detailsService.getSinglePost();
      if (!post) return;

      // fetch post author
      const res = await fetch(`https://dummyjson.com/users/${post.userId}`);
      const userData = await res.json();

      this.container.innerHTML = "";

      const article = document.createElement("article");
      article.className = "bg-zinc-900 rounded-2xl p-8 mb-8";

      article.innerHTML = `
      <!-- Back Button -->
  <button
    onclick="history.back()"
    class="mb-6 flex items-center gap-2 px-4 py-2 rounded-full
           bg-zinc-900/80 backdrop-blur border border-zinc-700
           text-sm text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 transition"
  >
    ← Back
  </button>
  
      <h1 class="text-3xl font-bold mb-2">${post.title}</h1>
      <p class="text-sm text-zinc-400 mb-6">
        By <span class="text-indigo-400">${userData.username}</span>
      </p>
      <div class="text-zinc-300 leading-relaxed space-y-4">
        <p>${post.body}</p>
      </div>
    `;

      this.container.appendChild(article);
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  //   render comments

  async renderComments() {
    try {
      const comments = await this.detailsService.loadPostComments();
      if (!comments) return null;

      //  all comments

      const section = document.createElement("section");
      section.className = "space-y-6";

      section.setAttribute("id", "blogCommentsSection");

      const heading = document.createElement("h3");
      heading.className = "text-xl font-semibold";
      heading.innerText = "Comments";

      section.appendChild(heading);

      comments.forEach((c) => {
        const div = document.createElement("div");
        div.className = "bg-zinc-900 p-4 rounded-xl";

        div.innerHTML = `
            <p class="text-sm text-zinc-400">
            <span class="font-medium text-white">${c.user.username}:</span>
            ${c.body}
            </p>
        `;
        section.appendChild(div);
      });
      this.container.appendChild(section);
    } catch (error) {
      showToast(`${error.message}`, "error");
      return null;
    }
  }

  // Setup add comment form
  setupCommentForm() {
    const section = document.createElement("section");
    section.className = "bg-zinc-900 rounded-2xl p-6 space-y-4";

    section.innerHTML = `
      <h3 class="text-lg font-semibold">Add a Comment</h3>
      <p class="text-sm text-zinc-400">
        Commenting as <span class="text-indigo-400 font-medium">You</span>
      </p>
      <form class="space-y-4" id="commentForm">
        <textarea
          class="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows="3"
          id="commentInput"
          placeholder="Write your comment here..."
        ></textarea>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-2 rounded-lg text-sm font-medium"
          >
            Post Comment
          </button>
        </div>
      </form>
    `;

    this.container.appendChild(section);

    const commentForm = document.querySelector("#commentForm");
    const commentInput = document.querySelector("#commentInput");

    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const commentText = commentInput.value.trim();

      if (!commentText) {
        showToast("Comment cannot be empty", "error");
        return;
      }

      const newComment = await this.detailsService.userComments(commentText);
      if (!newComment) return;

      const commentSection = document.querySelector("#blogCommentsSection");

      const div = document.createElement("div");
      div.className = "bg-zinc-900 p-4 rounded-xl";

      div.innerHTML = `
        <p class="text-sm text-zinc-400">
            <span class="font-medium text-white">You:</span>
            ${newComment.body}
        </p>
      `;

      commentSection.appendChild(div);
      commentInput.value = "";

      showToast("Comment posted!", "success");
    });
  }
}
