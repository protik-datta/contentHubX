import { showToast } from "../../utils/toast.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

export class RecipeDetService {
  async getSingleRecipe() {
    if (!postId) return false;

    try {
      const res = await fetch(`https://dummyjson.com/recipes/${postId}`);

      if (!res.ok) {
        showToast("Network issue.Failed to load recipe", "error");
        return null;
      }

      const data = await res.json();
      return data;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error");
    }
  }
}
