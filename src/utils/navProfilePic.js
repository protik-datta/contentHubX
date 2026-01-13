import { showToast } from "./toast.js";

const navProfilePic = document.querySelector("#navProfile");

const profilePic = async function navPic() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) return false;

  try {
    const token = user.accessToken;
    const res = await fetch("https://dummyjson.com/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return false;

    const data = await res.json();

    navProfilePic.innerHTML = `
             <img
              src="${data.image}"
              alt="Profile"
              class="w-10 h-10 rounded-full border-2 border-zinc-700 hover:border-indigo-400 transition-all"
            />
    `;
  } catch (error) {
    showToast(`${error.message}`, "error");
  }
};

window.addEventListener('DOMContentLoaded',profilePic)
