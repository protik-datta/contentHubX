import { showToast } from "../../utils/toast.js";
import { RecipeDetService } from "./recipedetService.js";

export class SingleRecipeController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.singleRecipeService = new RecipeDetService();

    this.init();
  }

  async init() {
    this.showRecipeSkeleton();
    await this.renderSingleRecipe();
  }

  showRecipeSkeleton() {
    this.container.innerHTML = "";

    const section = document.createElement("section");
    section.className =
      "bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg animate-pulse";

    section.innerHTML = `
    <!-- Image Skeleton -->
    <div class="w-full h-80 bg-zinc-800"></div>

    <div class="p-8 space-y-8">
      <!-- Title -->
      <div class="space-y-3">
        <div class="h-8 w-2/3 bg-zinc-800 rounded"></div>
        <div class="h-4 w-1/3 bg-zinc-800 rounded"></div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${Array(4)
          .fill("")
          .map(
            () => `
          <div class="bg-zinc-800/60 p-4 rounded-xl space-y-2">
            <div class="h-3 w-1/2 bg-zinc-700 rounded"></div>
            <div class="h-4 w-2/3 bg-zinc-700 rounded"></div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Extra Info -->
      <div class="flex flex-wrap gap-3">
        ${Array(3)
          .fill("")
          .map(() => `<div class="h-8 w-36 bg-zinc-800 rounded-full"></div>`)
          .join("")}
      </div>

      <!-- Ingredients -->
      <div class="space-y-3">
        <div class="h-6 w-40 bg-zinc-800 rounded"></div>
        <div class="space-y-2">
          ${Array(5)
            .fill("")
            .map(() => `<div class="h-4 w-3/4 bg-zinc-800 rounded"></div>`)
            .join("")}
        </div>
      </div>

      <!-- Instructions -->
      <div class="space-y-3">
        <div class="h-6 w-44 bg-zinc-800 rounded"></div>
        <div class="space-y-2">
          ${Array(4)
            .fill("")
            .map(() => `<div class="h-4 w-full bg-zinc-800 rounded"></div>`)
            .join("")}
        </div>
      </div>

      <!-- Tags -->
      <div class="flex gap-2">
        ${Array(4)
          .fill("")
          .map(() => `<div class="h-6 w-20 bg-zinc-800 rounded-full"></div>`)
          .join("")}
      </div>
    </div>
  `;

    this.container.appendChild(section);
  }

  async renderSingleRecipe() {
    try {
      const res = await this.singleRecipeService.getSingleRecipe();
      this.container.innerHTML = "";

      const section = document.createElement("section");
      section.className =
        "bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg";

      section.innerHTML = `
  <!-- Back Button -->
  <div class="relative">
    <button
      onclick="history.back()"
      class="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full
             bg-zinc-900/80 backdrop-blur border border-zinc-700
             text-sm text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 transition"
    >
      ← Back
    </button>

    <!-- Image -->
    <img
      src="${res.image}"
      alt="${res.name}"
      class="w-full h-80 object-cover"
    />
  </div>

  <div class="p-8 space-y-8">
    <!-- Title -->
    <div>
      <h2 class="text-3xl font-semibold">${res.name}</h2>
      <p class="text-zinc-400 text-sm mt-1">
        ${res.cuisine} • ${res.mealType.join(", ")}
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div class="bg-zinc-800/60 p-4 rounded-xl">
        <p class="text-zinc-400">Prep Time</p>
        <p class="font-medium">${res.prepTimeMinutes} minutes</p>
      </div>
      <div class="bg-zinc-800/60 p-4 rounded-xl">
        <p class="text-zinc-400">Cook Time</p>
        <p class="font-medium">${res.cookTimeMinutes} minutes</p>
      </div>
      <div class="bg-zinc-800/60 p-4 rounded-xl">
        <p class="text-zinc-400">Difficulty</p>
        <p class="font-medium">${res.difficulty}</p>
      </div>
      <div class="bg-zinc-800/60 p-4 rounded-xl">
        <p class="text-zinc-400">Rating</p>
        <p class="font-medium">${res.rating} ★</p>
      </div>
    </div>

    <!-- Extra Info -->
    <div class="flex flex-wrap gap-3 text-sm">
      <span class="px-3 py-1 rounded-full bg-zinc-800">
        🍽 Servings: ${res.servings}
      </span>
      <span class="px-3 py-1 rounded-full bg-zinc-800">
        🔥 ${res.caloriesPerServing} kcal / serving
      </span>
      <span class="px-3 py-1 rounded-full bg-zinc-800">
        ⏱ Total: ${res.prepTimeMinutes + res.cookTimeMinutes} minutes
      </span>
    </div>

    <!-- Ingredients -->
    <div>
      <h3 class="text-xl font-semibold mb-3">Ingredients</h3>
      <ul class="list-disc pl-6 space-y-1 text-zinc-300">
        ${res.ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <!-- Instructions -->
    <div>
      <h3 class="text-xl font-semibold mb-3">Instructions</h3>
      <ol class="list-decimal pl-6 space-y-2 text-zinc-300">
        ${res.instructions.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 text-xs text-zinc-400">
      <span class="px-3 py-1 rounded-full bg-zinc-800">${res.cuisine}</span>
      ${res.tags
        .map(
          (tag) =>
            `<span class="px-3 py-1 rounded-full bg-zinc-800">${tag}</span>`
        )
        .join("")}
    </div>
  </div>
`;

      this.container.appendChild(section);
    } catch (error) {
      showToast(`${error.message}`, "error");
      this.container.innerHTML =
        "<p class='text-red-500 text-center'>Failed to load recipes</p>";
    }
  }
}
