let table = document.getElementsByClassName(
  "substancias__apresentacao__table__table"
);
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

function add_elments_to_table(elements) {
  elements.forEach((v) => {
    table[0].innerHTML += `
      <tr class="substancias__apresentacao__table__content">
          <td>${v.substancia}</td>
          <td>${v.abreviacao}</td>
          <td class="td_button"><button class="btn"><i class="fa fa-trash"></i></button></td>
      </tr>
      `;
  });
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
    .item(0).value;
  let result =
    vars.find((v) => v.substancia == search) ||
    vars.find((v) => v.abreviacao == search);
  if (result) {
    remove_elements_from_table();
    add_elments_to_table([result]);
  } else {
    alert("Não encontrado");
  }
});

add_elments_to_table(vars);
