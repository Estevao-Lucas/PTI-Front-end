let table = document.getElementsByClassName(
  "substancias__apresentacao__table__table"
);
const container = document.getElementsByClassName(
  "substancias__apresentacao__table"
)[0];
const pageSize = 5;
let curPage = 1;
let substances = [];
async function getSubstances() {
  const url = "http://localhost:8000/api/substances";
  const response = await fetch(url);
  const data = await response.json();
  data.results.forEach((v) => substances.push(v));
  return add_elements_to_table(data.results);
}

function add_elements_to_table(elements) {
  let result = "";
  let start = (curPage - 1) * pageSize;
  let end = curPage * pageSize;
  elements
    .filter((row, index) => {
      if (index >= start && index < end) return true;
    })
    .forEach((v) => {
      result += `
        <tr class="substancias__apresentacao__table__content">
            <td class="hidden">${v.id}</td>
            <td>${v.name}</td>
            <td>${v.abbreviation}</td>
            <td class="td_button"><button class="btn"><i class="fa fa-trash"></i></button></td>
        </tr>
        `;
    });
  table[0].innerHTML =
    `<tr class="substancias__apresentacao__table__head">
  <th>SUBSTANCIAS</th>
  <th>ABREVIAÇÃO</th>
  <th></th>
</tr>` + result;
  openModalBtn();
}

function remove_elements_from_table() {
  let elements = document.getElementsByClassName(
    "substancias__apresentacao__table__content"
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
function refreshPage() {
  window.location.reload();
}

getSubstances();
