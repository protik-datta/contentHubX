import { showToast } from "../../utils/toast.js";

export class ProfileService {
  async getProfileInfo() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return null;

    try {
      const res = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      showToast(error.message, "error");
      return null;
    }
  }

  async getUserPosts() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return null;

    try {
      const userPost = await fetch(
        `https://dummyjson.com/posts/user/${user.id}`
      );

      if (!userPost.ok) throw new Error("Failed to fetch user posts");

      const postData = await userPost.json();

      return postData.posts || [];
    } catch (error) {
      showToast(error.message, "error");
      return [];
    }
  }

  async getUserCmnts() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return null;

    try {
      const res = await fetch("https://dummyjson.com/comments?limit=1000");
      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json();

      const userCmnts = data.comments.filter((c) => c.user.id === user.id);

      return userCmnts;
    } catch (error) {
      showToast(error.message, "error");
      return [];
    }
  }
}
