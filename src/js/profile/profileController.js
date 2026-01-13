import { showToast } from "../../utils/toast.js";
import { ProfileService } from "./profileService.js";

export class ProfileController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.profileService = new ProfileService();

    this.init();
  }

  async init() {
    await this.renderProfile();
  }

  async renderProfile() {
    try {
      // Skeleton Loader
      this.container.innerHTML = `
      <section class="bg-zinc-900 rounded-2xl p-8 flex flex-col md:flex-row gap-8 animate-pulse">
        <div class="w-36 h-36 rounded-xl bg-zinc-800"></div>
        <div class="flex-1 space-y-4">
          <div class="h-8 w-1/3 bg-zinc-800 rounded"></div>
          <div class="h-4 w-1/2 bg-zinc-800 rounded"></div>
          <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="h-12 bg-zinc-800 rounded-lg"></div>
            <div class="h-12 bg-zinc-800 rounded-lg"></div>
            <div class="h-12 bg-zinc-800 rounded-lg"></div>
            <div class="h-12 bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
      </section>

      <section class="grid md:grid-cols-2 gap-6 mt-6 animate-pulse">
        <div class="h-40 bg-zinc-800 rounded-xl"></div>
        <div class="h-40 bg-zinc-800 rounded-xl"></div>
      </section>

      <section class="grid md:grid-cols-2 gap-6 mt-6 animate-pulse">
        <div class="h-32 bg-zinc-800 rounded-xl"></div>
        <div class="h-32 bg-zinc-800 rounded-xl"></div>
      </section>

      <section class="grid md:grid-cols-2 gap-6 mt-6 animate-pulse">
        <div class="h-32 bg-zinc-800 rounded-xl"></div>
        <div class="h-32 bg-zinc-800 rounded-xl"></div>
      </section>

      <section class="mt-10 animate-pulse">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="h-28 bg-zinc-800 rounded-xl"></div>
          <div class="h-28 bg-zinc-800 rounded-xl"></div>
          <div class="h-28 bg-zinc-800 rounded-xl"></div>
        </div>
      </section>

      <section class="mt-10 animate-pulse space-y-4">
        <div class="h-12 bg-zinc-800 rounded-xl"></div>
        <div class="h-12 bg-zinc-800 rounded-xl"></div>
        <div class="h-12 bg-zinc-800 rounded-xl"></div>
      </section>

      <div class="flex justify-center mt-6">
        <div class="h-10 w-32 bg-red-500 rounded-lg animate-pulse"></div>
      </div>

      <p class="text-center text-xs text-zinc-500 pt-4 animate-pulse">Loading profile...</p>
    `;

      const info = await this.profileService.getProfileInfo();
      const userPost = await this.profileService.getUserPosts();
      const userCmnts = await this.profileService.getUserCmnts();

      this.container.innerHTML = "";

      //   profile top data

      const profileTop = document.createElement("section");
      profileTop.className =
        "bg-zinc-900 rounded-2xl p-8 flex flex-col md:flex-row gap-8 animate-slide";

      profileTop.innerHTML = `
      <img
        src="${info.image}"
        alt="Profile"
        class="w-36 h-36 rounded-xl border border-zinc-800 object-cover"
      />

      <div class="flex-1">
        <h2 class="text-3xl font-semibold">
          ${[info.firstName, info.maidenName, info.lastName]
            .filter(Boolean)
            .join(" ")}
          <span class="text-sm text-indigo-400 ml-2">
            (${info.role || "User"})
          </span>
        </h2>

        <p class="text-zinc-400 mt-1">${info.email}</p>

        <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div class="bg-zinc-800 p-4 rounded-lg">
            <p class="text-zinc-400">Username</p>
            <p class="font-medium">${info.username}</p>
          </div>

          <div class="bg-zinc-800 p-4 rounded-lg">
            <p class="text-zinc-400">Age</p>
            <p class="font-medium">${info.age}</p>
          </div>

          <div class="bg-zinc-800 p-4 rounded-lg">
            <p class="text-zinc-400">Gender</p>
            <p class="font-medium">${info.gender}</p>
          </div>

          <div class="bg-zinc-800 p-4 rounded-lg">
            <p class="text-zinc-400">Blood Group</p>
            <p class="font-medium">${info.bloodGroup}</p>
          </div>
        </div>
      </div>
    `;

      // Personal Details

      const personalDetails = document.createElement("section");
      personalDetails.className = "grid md:grid-cols-2 gap-6";

      personalDetails.innerHTML = `
            <!-- Personal Info -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Personal Info</h3>
                <ul class="text-sm space-y-2 text-zinc-300">
                <li>
                    Birth Date:
                    <span class="text-white">${info.birthDate || "N/A"}</span>
                </li>
                <li>
                    Height:
                    <span class="text-white">${info.height ?? "N/A"} cm</span>
                </li>
                <li>
                    Weight:
                    <span class="text-white">${info.weight ?? "N/A"} kg</span>
                </li>
                <li>
                    Eye Color:
                    <span class="text-white">${info.eyeColor || "N/A"}</span>
                </li>
                <li>
                    Hair:
                    <span class="text-white">
                    ${info.hair?.color || "N/A"}, ${info.hair?.type || ""}
                    </span>
                </li>
                </ul>
            </div>

            <!-- Contact -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Contact</h3>
                <ul class="text-sm space-y-2 text-zinc-300">
                <li>
                    Phone:
                    <span class="text-white">${info.phone || "N/A"}</span>
                </li>
                <li>
                    IP Address:
                    <span class="text-white">${info.ip || "N/A"}</span>
                </li>
                <li>
                    MAC:
                    <span class="text-white">${info.macAddress || "N/A"}</span>
                </li>
                <li>
                    Location:
                    <span class="text-white">
                    ${info.address?.city || ""}, ${
        info.address?.state || ""
      }, ${info.address?.country || ""}
                    </span>
                </li>
                </ul>
            </div>`;

      // education and work

      const educationAndWork = document.createElement("section");
      educationAndWork.className = "grid md:grid-cols-2 gap-6";

      educationAndWork.innerHTML = `
            <!-- Education -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Education</h3>
                <p class="text-sm text-zinc-300">
                ${info.university || "N/A"}
                </p>
            </div>

            <!-- Company -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Company</h3>
                <ul class="text-sm space-y-2 text-zinc-300">
                <li>
                    Name:
                    <span class="text-white">${
                      info.company?.name || "N/A"
                    }</span>
                </li>
                <li>
                    Department:
                    <span class="text-white">${
                      info.company?.department || "N/A"
                    }</span>
                </li>
                <li>
                    Title:
                    <span class="text-white">${
                      info.company?.title || "N/A"
                    }</span>
                </li>
                <li>
                    Office:
                    <span class="text-white">
                    ${info.company?.address?.city || "N/A"}
                    </span>
                </li>
                </ul>
            </div>
            `;

      // finance and crypto

      const financeAndCrypto = document.createElement("section");
      financeAndCrypto.className = "grid md:grid-cols-2 gap-6";

      financeAndCrypto.innerHTML = `
            <!-- Bank -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Bank</h3>
                <ul class="text-sm space-y-2 text-zinc-300">
                <li>
                    Card Expire:
                    <span class="text-white">${
                      info.bank?.cardExpire || "N/A"
                    }</span>
                </li>
                <li>
                    Card Number:
                    <span class="text-white">
                    ${
                      info.bank?.cardNumber
                        ? info.bank.cardNumber.replace(/(\d{4})(?=\d)/g, "$1-")
                        : "N/A"
                    }
                    </span>
                </li>
                <li>
                    Card Type:
                    <span class="text-white">${
                      info.bank?.cardType || "N/A"
                    }</span>
                </li>
                <li>
                    Currency:
                    <span class="text-white">${
                      info.bank?.currency || "N/A"
                    }</span>
                </li>
                <li>
                    IBAN:
                    <span class="text-white break-all">
                    ${info.bank?.iban || "N/A"}
                    </span>
                </li>
                </ul>
            </div>

            <!-- Crypto -->
            <div class="bg-zinc-900 rounded-xl p-6 animate-slide">
                <h3 class="font-semibold mb-4">Crypto</h3>
                <ul class="text-sm space-y-2 text-zinc-300">
                <li>
                    Coin:
                    <span class="text-white">${
                      info.crypto?.coin || "N/A"
                    }</span>
                </li>
                <li>
                    Network:
                    <span class="text-white">${
                      info.crypto?.network || "N/A"
                    }</span>
                </li>
                <li class="break-all">
                    Wallet:
                    <span class="text-white">
                    ${info.crypto?.wallet || "N/A"}
                    </span>
                </li>
                </ul>
            </div>
            `;

      // Recent Posts

      const postSection = document.createElement("section");
      postSection.className = "mt-10";

      postSection.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 animate-slide">Recent Posts</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        `;

      const grid = postSection.querySelector("div");

      userPost.forEach((post) => {
        const card = document.createElement("div");
        card.className =
          "bg-zinc-900 p-4 rounded-xl shadow hover:shadow-indigo-500 transition animate-slide";

        card.innerHTML = `
            <h4 class="font-semibold text-lg">${post.title}</h4>
            <p class="text-zinc-400 text-sm mt-2">${post.body}</p>
            `;

        grid.appendChild(card);
      });

      // Recent Comments Section
      const commentsSection = document.createElement("section");
      commentsSection.className = "mt-10";

      commentsSection.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 animate-slide">Recent Comments</h3>
            <div class="space-y-4"></div>
            `;

      const commentsContainer = commentsSection.querySelector("div");

      userCmnts.forEach((cmnt) => {
        const card = document.createElement("div");
        card.className = "bg-zinc-900 p-4 rounded-xl shadow animate-slide";

        card.innerHTML = `
            <p class="text-zinc-400 text-sm">
            <span class="font-medium">${
              cmnt.user?.username || "Unknown"
            }:</span>
            ${cmnt.body}
            </p>
        `;

        commentsContainer.appendChild(card);
      });

      //   logout button

      const logoutBtn = document.createElement("button");
      logoutBtn.className =
        "flex bg-red-500 py-2 px-4 rounded-lg mt-6 hover:bg-red-600 transition align-center mx-auto";

      logoutBtn.setAttribute("id", "logoutBtn");
      logoutBtn.innerText = "Log Out";

      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("userInfo");
        window.location.replace("login.html");
      });

      // Admin Dashboard Button

      const adminBtn = document.createElement("button");
      adminBtn.className =
        "flex bg-indigo-500 py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600 transition items-center mx-auto";
      adminBtn.innerText = "← Admin Dashboard";

      if (info.role && info.role.toLowerCase() !== "admin") {
        adminBtn.className =
          "flex bg-indigo-500 py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600 transition items-center mx-auto hidden";
      }

      adminBtn.addEventListener("click", () => {
        window.location.href = "admin.html";
      });

      //   footer text

      const p = document.createElement("p");
      p.className = "text-center text-xs text-zinc-500 pt-4";

      p.textContent = "Blogs first. Recipes next.";

      this.container.appendChild(profileTop);
      this.container.appendChild(personalDetails);
      this.container.appendChild(educationAndWork);
      this.container.appendChild(financeAndCrypto);
      this.container.appendChild(postSection);
      this.container.appendChild(commentsContainer);
      this.container.appendChild(logoutBtn);
      this.container.appendChild(adminBtn);
      this.container.appendChild(p);
    } catch (error) {
      showToast(error.message, "error");
      this.container.innerHTML =
        "<p class='text-red-500 text-center'>Failed to load profile data</p>";
    }
  }
}
