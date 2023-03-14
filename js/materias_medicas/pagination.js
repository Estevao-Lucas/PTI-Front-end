function previousPage() {
  if (curPage > 1) curPage--;
  add_elements_to_table(vars);
  openModalBtn();
}

function nextPage() {
  if (curPage * pageSize < vars.length) curPage++;
  add_elements_to_table(vars);
  openModalBtn();
}

document
  .querySelector(".nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector(".prevButton")
  .addEventListener("click", previousPage, false);
