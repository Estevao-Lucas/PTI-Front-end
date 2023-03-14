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
    openModalBtn();
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
  openModalBtn();
};

function searchSubstance(searchForm) {
  searchForm.addEventListener("keyup", setFilter);
  openModalBtn();
}
searchSubstance(searchForm);
