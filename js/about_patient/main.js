let symptoms = [];

let apiSymptoms = [];

let patientID = localStorage.getItem("patientID");
const patientURL = `http://localhost:8000/api/patients/${patientID}/`;

async function getSymptoms() {
  const url = "http://localhost:8000/api/symptoms/";
  const response = await fetch(url);
  const data = await response.json();
  data.results.forEach((v) => apiSymptoms.push(v));
  return addOptionsToSelect(data.results);
}

async function getPatient() {
  const url = `http://localhost:8000/api/patients/${patientID}/`;
  const response = await fetch(url);
  const data = await response.json();
  addPatientData(data);
  addElementsToSubstanceTable(data);
  normalizeSymptoms(data.symptoms);
  return data;
}
let patient = getPatient();

function normalizeSymptoms(_symptoms) {
  _symptoms.forEach((v) => {
    symptoms.push({
      id: v.id,
      name: v.name,
      sub_category: v.sub_category.name,
      nature: v.nature,
      weight: v.weight,
    });
  });
  addElementsToTable(symptoms);
}

let headerContent = document.getElementsByClassName("header-content");
function addPatientData(patient) {
  const birthDate = new Date(patient.birth_date);
  const formattedDate = `${(birthDate.getDate() + 1)
    .toString()
    .padStart(2, "0")}/${(birthDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${birthDate.getFullYear()}`;

  headerContent[0].innerHTML = `<div class="patient-information">
  <div class="patient-img">
      <img src="../assets/baby_car.png" alt="carrinho de bebe">
  </div>
  <div class="patient-data">
      <h1>${patient.name}</h1>
      <h3>Criança</h3>
  </div>
</div>
<div class="patient-information">
  <div class="patient-img">
      <img src="../assets/user.png" alt="person icon">
  </div>
  <div class="patient-data">
      <h1>${patient.mothers_name}</h1>
      <h3>Mae</h3>
  </div>
</div>
<div class="patient-information">
  <div class="patient-img">
      <img src="../assets/present-box.png" alt="caixa de presente">
  </div>
  <div class="patient-data">
      <h1>${formattedDate}</h1>
      <h3>Nascimento</h3>
  </div>
</div>`;
}

let substanceTable = document.getElementsByClassName("substance-table");

function addElementsToSubstanceTable(patient) {
  let result = "";
  patient.substance_punctuation.forEach((v) => {
    result += `
        <tbody>
            <tr> 
                <td hidden>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.total_punctuation}</td>
                <td>${v.traeted_symptoms.length}/${patient.symptoms.length}</td>
                <td>
                    <button class="btn-inspect" data-id="${v.id}">
                        ...
                    </button>
                </td>
            <tr>
        </tbody>`;
  });
  substanceTable[0].innerHTML =
    ` <thead>
        <tr>
            <th>SUBSTANCIA</th>
            <th>PONTUAÇÃO</th>
            <th>SINTOMAS COBERTOS</th>
            <th></th>
        </tr>
      </thead>
    ` + result;
  openSubstanceModalBtn();
}

const pageSize = 5;
let curPage = 1;
let table = document.getElementsByClassName("symptom-table");

function addElementsToTable(elements) {
  let result = "";
  let start = (curPage - 1) * pageSize;
  let end = curPage * pageSize;
  elements
    .filter((row, index) => {
      if (index >= start && index < end) return true;
    })
    .forEach((v) => {
      result += `
        <tbody>
            <tr> 
                <td hidden>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.sub_category ? v.sub_category : "-"}</td>
                <td>${v.nature}</td>
                <td>${v.weight}</td>
                <td>
                    <button class="btn-remove" data-id="${v.id}">
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
  removeSymptom();
}

function refreshPage() {
  window.location.reload();
}

// Search

let searchInput = document.getElementById("search-symptom");

const filterCallback = (symptom, value) => {
  return `${symptom.name} ${symptom.sub_category}`
    .toLowerCase()
    .includes(value.toLowerCase());
};

const setFilter = ({ target: { value } }) => {
  const symptomsToShow = symptoms.filter((symptom) =>
    filterCallback(symptom, value)
  );
  addElementsToTable(symptomsToShow);
  removeSymptom();
  openSubstanceModalBtn();
};

function searchSymptom(searchInput) {
  searchInput.addEventListener("keyup", setFilter);
}
searchSymptom(searchInput);

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
  let removeButtons = document.querySelectorAll(".btn-remove");
  removeButtons.forEach((button) => {
    button.removeEventListener("click", handleRemoveSymptom);
    button.addEventListener("click", handleRemoveSymptom);
  });
}

function handleRemoveSymptom(event) {
  const id = event.currentTarget.getAttribute("data-id");
  const index = symptoms.findIndex((s) => s.id == id);
  symptoms.splice(index, 1);
  addElementsToTable(symptoms);
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
  openSubstanceModalBtn();
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

// Add Symptoms with select option
const opcoesInput = document.querySelector("#opcoes");

const saveSymptom = function () {
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
  openSubstanceModalBtn();
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
  url = patientURL;
  if (symptoms.length === 0) {
    tagError.innerHTML =
      "<strong>Error</strong> Adicione pelo menos um sintoma!";
    tagError.classList.remove("hidden");
    return;
  }
  const symptomsIds = symptoms.map((symptom) => symptom.id);
  let symptomsIdsString = [];
  symptomsIds.forEach((id) => {
    symptomsIdsString.push({ id: id });
  });
  let bodyToPost = JSON.stringify({
    symptoms: symptomsIdsString,
  });
  // TODO: add error handling
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: bodyToPost,
  });
  closeRepertorizationModal();
  window.refreshPage();
};

confirmRepertorizationModalBtn.addEventListener(
  "click",
  confirmRepertorization
);

saveIncludeModalBtn.addEventListener("click", saveSymptom);
validateForm();

// Pagination

function previousPage() {
  if (curPage > 1) curPage--;
  removeSymptom();
  addElementsToTable(symptoms);
  openSubstanceModalBtn();
}

function nextPage() {
  if (curPage * pageSize < symptoms.length) curPage++;
  removeSymptom();
  addElementsToTable(symptoms);
  openSubstanceModalBtn();
}

document
  .querySelector("#nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector("#prevButton")
  .addEventListener("click", previousPage, false);

removeSymptom();
getSymptoms();

// Substance Detail Modal
const substanceModal = document.querySelector(".substance-detail");
const closeSubstanceModalBtn = document.querySelector(
  ".btn-close-substance-detail"
);

const substanceDetailTable = document.querySelector(".substance-detail-table");
function addSubstanceDetailTable(substance) {
  let result = "";
  substance.traeted_symptoms.forEach((v) => {
    symptoms.forEach((symptom) => {
      subCategory = symptom.sub_category ? symptom.sub_category : symptom.name;
      if (subCategory == v) {
        result += `
        <tbody>
            <tr>
                <td>${symptom.name}</td>
                <td>${symptom.sub_category ? symptom.sub_category : "-"}</td>
                <td>${symptom.nature}</td>
                <td>${symptom.weight}</td>
            <tr>
        </tbody>`;
        substanceDetailTable.innerHTML =
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
    });
  });
}

function findSymptomsBySubstance(substanceName, patient) {
  patient.then((patient) => {
    console.log(patient);
    if (patient.substance_punctuation) {
      patient.substance_punctuation.forEach((substanceToFind) => {
        if (substanceToFind.name === substanceName) {
          addSubstanceDetailTable(substanceToFind);
        }
      });
    } else {
      console.log(`Substance ${substanceName} not found in patient`);
    }
  });
}

function openSubstanceModalBtn() {
  let inspectButtons = document.querySelectorAll(".btn-inspect");
  inspectButtons.forEach((button) => {
    let substance = button.parentElement.parentElement.children[1].innerHTML;
    button.addEventListener("click", () => {
      findSymptomsBySubstance(substance, patient);
      substanceModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  });
}

const closeSubstanceModal = function () {
  tagError.classList.add("hidden");
  tagError.innerHTML = "";
  substanceModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeSubstanceModalBtn.addEventListener("click", closeSubstanceModal);
overlay.addEventListener("click", closeSubstanceModal);
openSubstanceModalBtn();
