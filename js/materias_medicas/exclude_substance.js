const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const deleteModalBtn = document.querySelector(".btn-confirm");

function deleteSubstance() {
  document.querySelectorAll(".btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      id = btn.parentElement.parentElement.children[0].innerHTML;
    })
  );
  const url = `http://localhost:8000/api/substances/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  refreshPage();
  closeModal();
}
function openModalBtn() {
  buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      id = btn.parentElement.parentElement.children[0].innerHTML;
    })
  );
}

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
deleteModalBtn.addEventListener("click", () => deleteSubstance());
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
openModalBtn();
