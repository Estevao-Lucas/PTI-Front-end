let table = document.getElementsByClassName(
  "substancias-apresentacao-table-table"
);
const container = document.getElementsByClassName(
  "substancias-apresentacao-table"
)[0];
const pageSize = 5;
let curPage = 1;
let substances = [];
async function getSubstances() {
  const url = "http://localhost:8000/api/substances";
  const response = await fetch(url);
  const data = await response.json();
  data.results.forEach((v) => substances.push(v));
  return addElementsToTable(data.results);
}

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
        <tr class="substancias-apresentacao-table-content">
            <td class="hidden">${v.id}</td>
            <td>${v.name}</td>
            <td>${v.abbreviation}</td>
            <td class="td-button"><button class="btn"><i class="fa fa-trash"></i></button></td>
        </tr>
        `;
    });
  table[0].innerHTML =
    `<tr class="substancias-apresentacao-table-head">
  <th>SUBSTANCIAS</th>
  <th>ABREVIAÇÃO</th>
  <th></th>
</tr>` + result;
  openModalBtn();
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

getSubstances();
