export function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toast-container");

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `
    min-w-[250px] max-w-xs px-4 py-3 rounded-lg shadow-lg text-white
    transform translate-y-10 opacity-0 transition-all duration-500
    flex items-center justify-between
    ${type === "success" ? "bg-green-500" : ""}
    ${type === "error" ? "bg-red-500" : ""}
    ${type === "info" ? "bg-blue-500" : ""}
  `;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 font-bold text-white hover:text-gray-200">&times;</button>
  `;

  // Close button functionality
  toast.querySelector("button").addEventListener("click", () => {
    hideToast(toast);
  });

  // Append to container
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  });

  // Auto-hide after duration
  setTimeout(() => hideToast(toast), duration);
}

function hideToast(toast) {
  toast.classList.add("translate-y-10", "opacity-0");
  toast.addEventListener(
    "transitionend",
    () => {
      toast.remove();
    },
    { once: true }
  );
}

// Example usage:
document.querySelector("#show-toast-btn")?.addEventListener("click", () => {
  showToast("This is a success message!", "success");
});
