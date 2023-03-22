function previousPage() {
  if (curPage > 1) curPage--;
  add_elements_to_table(substances);
  openModalBtn();
}

function nextPage() {
  if (curPage * pageSize < substances.length) curPage++;
  add_elements_to_table(substances);
  openModalBtn();
}

document
  .querySelector(".nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector(".prevButton")
  .addEventListener("click", previousPage, false);
openModalBtn();
