import { showToast } from "../../utils/toast.js";

export class RecipeService {
  constructor(recipeGrid) {
    this.recipeGrid = document.querySelector(recipeGrid);
  }

  async getRecipe(limit = 1000) {
    try {
      const res = await fetch(`https://dummyjson.com/recipes?limit=${limit}`);

      if (!res.ok) {
        showToast("Failed to fetch recipes", "error");
        this.recipeGrid.innerHTML = `<p class="text-zinc-400 col-span-full text-center mt-[200px]">Loading recipes...</p>`;
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();

      return data.recipes;
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error occured");
    }
  }
}
