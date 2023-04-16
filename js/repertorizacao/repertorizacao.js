let symptoms = [];

let apiSymptoms = [
  {
    id: 1,
    name: "Dor de cabeca",
    nature: "Mental",
    weight: 2,
    sub_category: "Dor de cabeca a noite",
  },
  {
    id: 2,
    name: "Dor de cabeca",
    nature: "Geral",
    weight: 1,
    sub_category: null,
  },
  {
    id: 3,
    name: "Dor de cabeca",
    nature: "Mental",
    weight: 2,
    sub_category: "Dor de cabeca no almoco",
  },
];

let table = document.getElementsByClassName("symptom-table");

function addElementsToTable(elements) {
  let result = "";
  elements.forEach((v) => {
    result += `
        <tbody>
            <tr> 
                <td hidden>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.sub_category ? v.sub_category : "-"}</td>
                <td>${v.nature}</td>
                <td>${v.weight}</td>
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
    symptom.name.toLowerCase().includes(value.toLowerCase()) ||
    symptom.sub_category.toLowerCase().includes(value.toLowerCase())
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
const tagError = document.getElementById("error-added-symptom");
const overlay = document.querySelector(".overlay");
const includeModal = document.querySelector(".include");
const closeIncludeModalBtn = document.querySelector(".btn-close-include");
const saveIncludeModalBtn = document.querySelector(".confirm-include");
function openIncludeModalBtn() {
  document
    .getElementsByClassName("add-symptom-btn")[0]
    .addEventListener("click", () => {
      includeModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
}

const closeIncludeModal = function () {
  tagError.classList.add("hidden");
  tagError.innerHTML = "";
  includeModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeIncludeModalBtn.addEventListener("click", closeIncludeModal);
overlay.addEventListener("click", closeIncludeModal);
openIncludeModalBtn();

// Remove Modal

function removeSymptom() {
  const removeButtons = document.querySelectorAll(".btn-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = symptoms.findIndex((s) => s.name === this.value);
      symptoms.splice(index, 1);
      addElementsToTable(symptoms);
      removeSymptom();
    });
  });
}

// Search
const opcoesList = document.querySelector("#opcoes-list");
opcoesList.addEventListener("keyup", () => {
  const texto = opcoesList.value.toLowerCase();

  for (let option of opcoesList.options) {
    const optionTexto = option.value.toLowerCase();

    optionTexto.includes(texto)
      ? (option.style.display = "")
      : (option.style.display = "none");
  }
  removeSymptom();
});

// add symptoms to options

function addOptionsToSelect(symptoms) {
  let options = "";
  symptoms.forEach((symptom) => {
    let subCategory = symptom.sub_category
      ? symptom.sub_category
      : symptom.name;
    options += `<option value="${subCategory}">${subCategory}</option>`;
  });
  opcoesList.innerHTML = options;
}

addOptionsToSelect(apiSymptoms);

// Add Symptoms with select option
const opcoesInput = document.querySelector("#opcoes");

const saveSubstance = function () {
  let input = opcoesInput;

  if (input.value === "") {
    tagError.innerHTML = "<strong>Error</strong> Escolha um sintoma primeiro!";
    tagError.classList.remove("hidden");
    return;
  }

  const data = apiSymptoms.find((symptom) => {
    let nameToCompare = symptom.sub_category
      ? symptom.sub_category
      : symptom.name;
    return nameToCompare === input.value;
  });

  const index = symptoms.findIndex((s) => s.id === data.id);
  if (index === -1) {
    symptoms.push(data);
    addElementsToTable(symptoms);
    closeIncludeModal();
  } else {
    tagError.innerHTML = "<strong>Error</strong> Sintoma já adicionado!";
    tagError.classList.remove("hidden");
  }
  removeSymptom();
};

// Repertorization

const repertorizationModal = document.querySelector(".repertorization");
const closeRepertorizationModalBtn = document.querySelector(
  ".btn-close-repertorization"
);
const confirmRepertorizationModalBtn = document.querySelector(
  ".confirm-repertorization"
);

function openRepertorizationModalBtn() {
  document
    .getElementsByClassName("repertorizar")[0]
    .addEventListener("click", () => {
      repertorizationModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
}

const closeRepertorizationModal = function () {
  tagError.classList.add("hidden");
  tagError.innerHTML = "";
  repertorizationModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeRepertorizationModalBtn.addEventListener(
  "click",
  closeRepertorizationModal
);
overlay.addEventListener("click", closeRepertorizationModal);

openRepertorizationModalBtn();
var forms = document.querySelectorAll(".needs-validation");
function validateForm() {
  "use strict";

  Array.prototype.slice.call(forms).forEach(function (form) {
    document.getElementsByClassName("repertorizar")[0].addEventListener(
      "click",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      true
    );
  });
}

const confirmRepertorization = function () {
  if (symptoms.length === 0) {
    tagError.innerHTML =
      "<strong>Error</strong> Adicione pelo menos um sintoma!";
    tagError.classList.remove("hidden");
    return;
  }
};

confirmRepertorizationModalBtn.addEventListener(
  "click",
  confirmRepertorization
);

saveIncludeModalBtn.addEventListener("click", saveSubstance);
removeSymptom();
validateForm();
