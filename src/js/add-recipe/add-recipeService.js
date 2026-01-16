import { showToast } from "../../utils/toast.js";

export class AddRecipeService {
  async addRecipe(recipe) {
    try {
      const res = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (!res.ok) {
        showToast("Failed to add recipe", "error");
        throw new Error("Failed to add recipe");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      showToast(`${error.message}`, "error");
      return false;
    }
  }
}
