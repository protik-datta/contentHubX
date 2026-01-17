import { showToast } from "../../utils/toast.js";

const params = new URLSearchParams(window.location.search);
const postId = Number(params.get("id"));

export class RecipeDetService {
  async getSingleRecipe() {
    if (!postId) return null;

    try {
      const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

      const localRecipe = localRecipes.find((r) => Number(r.id) === postId);

      if (localRecipe) {
        return localRecipe;
      }

      const res = await fetch(`https://dummyjson.com/recipes/${postId}`);

      if (!res.ok) {
        showToast("Recipe not found", "error");
        return null;
      }

      const data = await res.json();
      return data;
    } catch (error) {
      showToast(error.message, "error");
      throw new Error("Failed to load recipe");
    }
  }
}
