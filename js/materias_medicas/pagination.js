function previousPage() {
  if (curPage > 1) curPage--;
  addElementsToTable(substances);
  openModalBtn();
}

function nextPage() {
  if (curPage * pageSize < substances.length) curPage++;
  addElementsToTable(substances);
  openModalBtn();
}

document
  .querySelector(".nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector(".prevButton")
  .addEventListener("click", previousPage, false);
openModalBtn();
