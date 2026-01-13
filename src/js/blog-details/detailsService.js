import { showToast } from "../../utils/toast.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const user = JSON.parse(localStorage.getItem("userInfo"));

export class DetailsService {
  // post api

  async getSinglePost() {
    if (!postId) return false;

    try {
      const res = await fetch(`https://dummyjson.com/posts/${postId}`);

      if (!res.ok) {
        showToast("Network issue.Failed to load post", "error");
        return null;
      }

      const data = await res.json();
      return data;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error found!!");
    }
  }

  //   comments load

  async loadPostComments() {
    if (!postId) return false;

    try {
      const res = await fetch(`https://dummyjson.com/posts/${postId}/comments`);

      if (!res.ok) {
        showToast("Network issue.Failed to load comments", "error");
        return null;
      }

      const data = await res.json();

      return data.comments;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error found!!");
    }
  }

  //   commenting as a user

  async userComments(commentInput) {
    if (!postId) return false;

    try {
      const res = await fetch("https://dummyjson.com/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: `${commentInput}`,
          postId: `${postId}`,
          userId: `${user.id}`,
        }),
      });

      if (!res.ok) {
        showToast("Something error occured.Try again!!", "error");
        return null;
      }

      const data = await res.json();

      return data;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error Found!!");
    }
  }
}
