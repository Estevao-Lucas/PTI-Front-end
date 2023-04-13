symptoms = [
  {
    categoria: "Categoria 1",
    subCategoria: "Sub Categoria 1",
    natureza: "Natureza 1",
    peso: "Peso 1",
  },
  {
    categoria: "Categoria 2",
    subCategoria: "Sub Categoria 2",
    natureza: "Natureza 1",
    peso: "Peso 1",
  },
];

let table = document.getElementsByClassName("symptom-table");

function addElementsToTable(elements) {
  let result = "";
  elements.forEach((v) => {
    result += `
        <tbody>
            <tr>
                <td>${v.categoria}</td>
                <td>${v.subCategoria}</td>
                <td>${v.natureza}</td>
                <td>${v.peso}</td>
                <td>
                    <button class="btn-remove">
                        <img src="../assets/close-btn.png" alt="botao de excluir" id="img-btn-remove"></i>
                    </button>
                </td>
            <tr>
        </tbody>`;
  });
  table[0].innerHTML =
    `<thead>
    <tr>
        <th>CATEGORIA</th>
        <th>SUB CATEGORIA</th>
        <th>NATUREZA</th>
        <th>PESO</th>
        <th></th>
    </tr>
    </thead>` + result;
}

function removeElementsFromTable() {
  let elements = document.getElementsByClassName(
    "substancias-apresentacao-table-content"
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
function refreshPage() {
  window.location.reload();
}

// Search

let searchInput = document.getElementById("search-symptom");

const filterCallback = (symptom, value) => {
  return (
    symptom.categoria.toLowerCase().includes(value.toLowerCase()) ||
    symptom.subCategoria.toLowerCase().includes(value.toLowerCase())
  );
};

const setFilter = ({ target: { value } }) => {
  removeElementsFromTable();
  const symptomsToShow = symptoms.filter((symptom) =>
    filterCallback(symptom, value)
  );
  addElementsToTable(symptomsToShow);
};

function searchSubstance(searchInput) {
  searchInput.addEventListener("keyup", setFilter);
}
searchSubstance(searchInput);

// Add Modal
const overlay = document.querySelector(".overlay");
const includeModal = document.querySelector(".include");
const closeIncludeModalBtn = document.querySelector(".btn-close-include");
const saveIncludeModalBtn = document.querySelector(".btn-save");
function openIncludeModalBtn() {
  document
    .getElementsByClassName("add-symptom-btn")[0]
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
  let categoryInput = document.getElementById("category");
  let subCategoryInput = document.getElementById("sub-category");
  let naturezaInput = document.getElementById("natureza");
  let pesoInput = document.getElementById("peso");
  const data = {
    categoria: categoryInput.value,
    subCategoria: subCategoryInput.value,
    natureza: naturezaInput.value,
    peso: pesoInput.value,
  };
  symptoms.push(data);
  closeIncludeModal();
};

saveIncludeModalBtn.addEventListener("click", saveSubstance);
closeIncludeModalBtn.addEventListener("click", closeIncludeModal);
overlay.addEventListener("click", closeIncludeModal);
openIncludeModalBtn();
