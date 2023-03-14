let table = document.getElementsByClassName(
  "substancias__apresentacao__table__table"
);
const container = document.getElementsByClassName(
  "substancias__apresentacao__table"
)[0];
const pageSize = 5;
let curPage = 1;
let vars = [
  {
    substancia: "Acetato de ciproterona",
    abreviacao: "ACC",
  },
  {
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
];

function add_elements_to_table(elements) {
  let result = "";
  elements
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((v) => {
      result += `
      <tr class="substancias__apresentacao__table__content">
          <td>${v.substancia}</td>
          <td>${v.abreviacao}</td>
          <td class="td_button"><button class="btn"><i class="fa fa-trash"></i></button></td>
      </tr>
      `;
    });
  table[0].innerHTML = result;
}

function remove_elements_from_table() {
  let elements = document.getElementsByClassName(
    "substancias__apresentacao__table__content"
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

let searchForm = document.getElementById("form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = document
    .getElementsByClassName("pesquisa_substancia__input")
    .item(0)
    .value.toLowerCase();
  let result =
    vars.find((v) => v.substancia.toLowerCase() == search) ||
    vars.find((v) => v.abreviacao.toLowerCase() == search);
  if (result) {
    remove_elements_from_table();
    add_elements_to_table([result]);
  } else {
    alert("Não encontrado");
  }
});

const filterCallback = (substance, value) => {
  return (
    substance.substancia.toLowerCase().includes(value.toLowerCase()) ||
    substance.abreviacao.toLowerCase().includes(value.toLowerCase())
  );
};

const setFilter = ({ target: { value } }) => {
  remove_elements_from_table();
  const substanceToShow = vars.filter((substance) =>
    filterCallback(substance, value)
  );
  add_elements_to_table(substanceToShow);
};
searchForm.addEventListener("keyup", setFilter);

add_elements_to_table(vars);

function previousPage() {
  if (curPage > 1) curPage--;
  add_elements_to_table(vars);
}

function nextPage() {
  if (curPage * pageSize < vars.length) curPage++;
  add_elements_to_table(vars);
}

document
  .querySelector(".nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector(".prevButton")
  .addEventListener("click", previousPage, false);
