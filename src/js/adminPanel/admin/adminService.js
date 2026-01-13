import { showToast } from "../../../utils/toast.js";

export class AdminService {
  // get stats
  async getStats() {
    try {
      // Get total users
      const userRes = await fetch("https://dummyjson.com/users");
      if (!userRes.ok) throw new Error("Failed to fetch users");
      const userData = await userRes.json();
      const userNum = userData.total;

      // Get total posts
      const postRes = await fetch("https://dummyjson.com/posts");
      if (!postRes.ok) throw new Error("Failed to fetch posts");
      const postData = await postRes.json();
      const postNum = postData.total;

      // Get total recipes
      const recipeRes = await fetch("https://dummyjson.com/recipes");
      if (!recipeRes.ok) throw new Error("Failed to fetch recipes");
      const recipeData = await recipeRes.json();
      const recipeNum = recipeData.total;

      // Get total comments
      const commentsRes = await fetch("https://dummyjson.com/comments");
      if (!commentsRes.ok) throw new Error("Failed to fetch comments");
      const commentsData = await commentsRes.json();
      const commentsNum = commentsData.total;

      return { userNum, postNum, recipeNum, commentsNum };
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error fetching stats");
    }
  }

  //   get all users

  async getAllUser(limit) {
    try {
      const users = await fetch(`https://dummyjson.com/users?limit=${limit}`);

      if (!users.ok) throw new Error("Error occured");

      const data = await users.json();

      return data.users;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error fetching users");
    }
  }
}
