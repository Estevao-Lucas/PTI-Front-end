let searchForm = document.getElementById("form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = document
    .getElementsByClassName("pesquisa_substancia__input")
    .item(0)
    .value.toLowerCase();
  let result =
    substances.find((v) => v.name.toLowerCase() == search) ||
    substances.find((v) => v.abbreviation.toLowerCase() == search);
  if (result) {
    remove_elements_from_table();
    add_elements_to_table([result]);
    openModalBtn();
  }
});

const filterCallback = (substance, value) => {
  return (
    substance.name.toLowerCase().includes(value.toLowerCase()) ||
    substance.abbreviation.toLowerCase().includes(value.toLowerCase())
  );
};

const setFilter = ({ target: { value } }) => {
  remove_elements_from_table();
  const substanceToShow = substances.filter((substance) =>
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
