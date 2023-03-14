const includeModal = document.querySelector(".include");
const closeIncludeModalBtn = document.querySelector(".btn-close-include");
function openIncludeModalBtn() {
  document
    .getElementsByClassName("footer__button")[0]
    .addEventListener("click", () => {
      includeModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
}

const openIncludeModal = function () {
  includeModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeIncludeModal = function () {
  includeModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeIncludeModalBtn.addEventListener("click", closeIncludeModal);
overlay.addEventListener("click", closeIncludeModal);
openIncludeModalBtn();
