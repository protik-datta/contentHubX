import { showToast } from "../../utils/toast.js";
import { RecipeService } from "./recipeService.js";

export class RecipeContainer {
  constructor(recipeContainer) {
    this.recipeContainer = document.querySelector(recipeContainer);
    this.recipeService = new RecipeService();

    this.init();
  }

  async init() {
    this.showSkeleton(6); // Show 6 skeleton cards
    await this.renderRecipe();
  }

  // Function to show skeleton loaders
  showSkeleton(count) {
    const grid = this.recipeContainer.querySelector(".grid");
    grid.innerHTML = ""; // Clear existing content
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement("div");
      skeleton.className =
        "bg-zinc-800 rounded-2xl overflow-hidden animate-pulse";

      skeleton.innerHTML = `
        <div class="h-48 w-full bg-zinc-700"></div>
        <div class="p-6 space-y-3">
          <div class="h-6 w-3/4 bg-zinc-700 rounded"></div>
          <div class="h-4 w-full bg-zinc-700 rounded"></div>
          <div class="flex items-center justify-between pt-2">
            <div class="h-4 w-1/4 bg-zinc-700 rounded"></div>
            <div class="h-4 w-6 bg-zinc-700 rounded"></div>
            <div class="h-4 w-1/4 bg-zinc-700 rounded"></div>
          </div>
        </div>
      `;

      grid.appendChild(skeleton);
    }
  }

  async renderRecipe() {
    try {
      const recipe = await this.recipeService.getRecipe();

      const grid = this.recipeContainer.querySelector(".grid");
      grid.innerHTML = ""; // Clear skeletons

      recipe.forEach((r) => {
        // Generate description dynamically
        const description = r.instructions?.length
          ? r.instructions[0]
          : r.tags?.length
          ? r.tags.join(", ")
          : `${r.cuisine} • ${r.difficulty}`;

        // Create article card
        const article = document.createElement("article");
        article.className =
          "bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-xl";

        article.innerHTML = `
          <!-- Recipe Image -->
          <img
            src="${r.image}"
            alt="${r.name}"
            class="h-48 w-full object-cover"
          />

          <!-- Content -->
          <div class="p-6 space-y-3">
            <!-- Title -->
            <h3 class="text-xl font-semibold text-white">
              ${r.name}
            </h3>

            <!-- Description -->
            <p class="text-sm text-zinc-400">
              ${description}
            </p>

            <!-- Footer: time, cuisine, rating, link -->
            <div class="flex items-center justify-between pt-2">
              <!-- Time & Cuisine -->
              <span class="text-xs text-zinc-500">${
                r.prepTimeMinutes || 30
              } min • ${r.cuisine || "Unknown"}</span>

              <!-- Star Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-gray-400 cursor-pointer favBtn"
              >
                <path
                  d="M12 .587l3.668 7.568L24 9.423l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.271 0 9.423l8.332-1.268z"
                />
              </svg>

              <!-- Link -->
              <a
                href="recipe-details.html"
                class="text-sm text-indigo-400 hover:underline"
              >
                View Recipe →
              </a>
            </div>
          </div>
        `;

        grid.appendChild(article);
      });
    } catch (error) {
      showToast(`${error.message}`, "error");
      throw new Error("Error Occured");
    }
  }
}
