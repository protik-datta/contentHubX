import "../../utils/navProfilePic.js";
import { AddRecipeController } from "./add-recipeController.js";

document.addEventListener("DOMContentLoaded", () => {
  new AddRecipeController("#recipeForm");
});
