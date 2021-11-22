var amountSum = 0;
var total = document.getElementById("total");
const add = (addButton, name, amount, add) => {
  addButton.addEventListener("click", () => {
    if (name.value != 0 && amount.value != 0) {
      add.innerHTML += `<div class="row addRow">
          <div class="col-sm-8 nameAmount"><ul><li>${name.value} - ${amount.value}</li></ul></div>
          <div class="col"><button class="edit" onclick="editItem()">Edytuj</button></div>
          <div class="col"><button class="delete" onclick="deleteItem()">Usuń</button></div>
          </div>`;

      if (add === document.getElementById("income")) {
        amountSum = amountSum + amount.valueAsNumber;
        total.innerHTML = `<h1>${amountSum}</h1>`;
      } else {
        amountSum = amountSum - amount.valueAsNumber;
        total.innerHTML = `<h1>${amountSum}</h1>`;
      }
    } else;
  });
};

const deleteItem = () => {
  let row = document.querySelectorAll(".row.addRow");

  for (let i = 0; i < row.length; i++) {
    row[i].onclick = () => {
      let amount = row[i].querySelector("li").textContent;
      amount = amount.split("-");
      amountSum -= amount[1];
      total.innerHTML = `<h1>${amountSum}</h1>`;
      row[i].remove();
    };
  }
};

const editItem = () => {
  let row = document.querySelectorAll(".row.addRow");

  for (let i = 0; i < row.length; i++) {
    row[i].onclick = () => {
      console.log(row[i]);
    };
  }
};

add(
  document.getElementById("addIncome"),
  document.getElementById("incomeName"),
  document.getElementById("incomeAmount"),
  document.getElementById("income")
);

add(
  document.getElementById("addExpense"),
  document.getElementById("expenseName"),
  document.getElementById("expenseAmount"),
  document.getElementById("expense")
);
