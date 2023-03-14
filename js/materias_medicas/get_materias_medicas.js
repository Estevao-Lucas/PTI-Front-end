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
    id: 1,
    substancia: "Acetato de ciproterona",
    abreviacao: "ACC",
  },
  {
    id: 2,
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
  {
    id: 3,
    substancia: "Acetato de ciproterona",
    abreviacao: "ACC",
  },
  {
    id: 4,
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
  {
    id: 5,
    substancia: "Acetato de ciproterona",
    abreviacao: "ACC",
  },
  {
    id: 6,
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
  {
    id: 7,
    substancia: "Acetato de ciproterona",
    abreviacao: "ACC",
  },
  {
    id: 8,
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
  {
    substancia: "Acetato de ciproterona Ultimo",
    abreviacao: "ACC",
  },
  {
    substancia: "Dipirona",
    abreviacao: "DIP",
  },
];

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
            <td>${v.substancia}</td>
            <td>${v.abreviacao}</td>
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
}

function remove_elements_from_table() {
  let elements = document.getElementsByClassName(
    "substancias__apresentacao__table__content"
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

add_elements_to_table(vars);
