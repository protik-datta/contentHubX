import { showToast } from "../../utils/toast.js";
import { RecipeContainer } from "../recipe/recipeController.js";
import { AddRecipeService } from "./add-recipeService.js";

export class AddRecipeController {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.service = new AddRecipeService();

    if (!this.form) {
      throw new Error("Add Recipe form not found");
    }

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  getFormData() {
    const {
      name,
      image,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      calories,
      ingredients,
      instructions,
      tags,
      mealType,
    } = this.form;

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const lastId =
      storedRecipes.length > 0
        ? storedRecipes[storedRecipes.length - 1].id
        : 99;

    return {
      id: lastId + 1,
      name: name.value.trim(),
      image: image.value.trim(),
      prepTimeMinutes: Number(prepTime.value),
      cookTimeMinutes: Number(cookTime.value),
      servings: Number(servings.value),
      difficulty: difficulty.value,
      cuisine: cuisine.value,
      caloriesPerServing: Number(calories.value),
      ingredients: ingredients.value.split("\n").filter(Boolean),
      instructions: instructions.value.split("\n").filter(Boolean),
      tags: tags.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      mealType: mealType.value
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
    };
  }

  async handleSubmit(e) {
    e.preventDefault();

    const recipe = this.getFormData();

    if (!this.validate(recipe)) return;

    const submitBtn = this.form.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    try {
      await this.service.addRecipe(recipe);

      const stored = JSON.parse(localStorage.getItem("recipes")) || [];
      stored.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(stored));

      showToast("Recipe added successfully", "success");
      this.form.reset();
      setInterval(() => {
        window.location.href = "recipes.html";
      }, 2000);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      submitBtn.disabled = false;
    }
  }

  validate(recipe) {
    if (!recipe.name || !recipe.image) {
      showToast("Recipe name and image are required", "error");
      return false;
    }

    if (!recipe.ingredients.length || !recipe.instructions.length) {
      showToast("Ingredients and instructions cannot be empty", "error");
      return false;
    }

    return true;
  }
}
