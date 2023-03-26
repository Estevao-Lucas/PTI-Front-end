const includeModal = document.querySelector(".include");
const closeIncludeModalBtn = document.querySelector(".btn-close-include");
const saveIncludeModalBtn = document.querySelector(".btn-save");
function openIncludeModalBtn() {
  document
    .getElementsByClassName("footer-button")[0]
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

const saveSubstance = function () {
  const substanceName =
    document.getElementsByClassName("substance-name")[0].value;
  const abbreviation = document.getElementsByClassName(
    "substance-abreviation"
  )[0].value;
  const url = "http://localhost:8000/api/substances";
  const data = {
    name: substanceName,
    abbreviation: abbreviation,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  closeIncludeModal();
  refreshPage();
};

saveIncludeModalBtn.addEventListener("click", saveSubstance);
closeIncludeModalBtn.addEventListener("click", closeIncludeModal);
overlay.addEventListener("click", closeIncludeModal);
openIncludeModalBtn();
