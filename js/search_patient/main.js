// add patients to options
const opcoesInput = document.querySelector("#opcoes");
const opcoesList = document.querySelector("#opcoes-list");
const tagError = document.getElementById("error-added-symptom");
const confirmButton = document.querySelector(".confirm");
const form = document.querySelector(".search-patient-form");

async function getPatients() {
  url = "http://localhost:8000/api/patients/";
  const response = await fetch(url);
  const patients = await response.json();
  addOptionsToSelect(patients.results);
  return patients.results;
}

function addOptionsToSelect(patients) {
  let options = "";
  patients.forEach((patient) => {
    options += `<option value="${patient.name}">${patient.mothers_name}</option>`;
  });
  opcoesList.innerHTML = options;
}

opcoesList.addEventListener("keyup", () => {
  const texto = opcoesList.value.toLowerCase();

  for (let option of opcoesList.options) {
    const optionTexto = option.value.toLowerCase();

    optionTexto.includes(texto)
      ? (option.style.display = "")
      : (option.style.display = "none");
  }
});

let patients = getPatients();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let patient = opcoesInput.value;

  if (patient.trim() === "") {
    tagError.classList.remove("hidden");
    tagError.innerHTML = "Error Selecione um paciente!";
    return;
  }
  patients.then((patients) => {
    let patientSelected = patients.find((p) => p.name === patient);
    if (patientSelected) {
      localStorage.setItem("patientID", patientSelected.id);
      form.submit();
      window.location.href = "../components/about_patient.html";
    }
  });
});
