var amountSumIncome = 0;
var amountSumExpense = 0;
var total = 0;
var totalIncome = document.getElementById("totalIncome");
var totalExpense = document.getElementById("totalExpense");
var totalAmount = document.getElementById("total");

const add = (addButton, name, amount, addItem) => {
  addButton.addEventListener("click", () => {
    if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("income")
    ) {
      addItem.innerHTML += `<div class="row addRow income">
          <div class="col-sm-8 nameAmount"><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col"><button class="edit btn btn-success" onclick="editItem()">Edytuj</button></div>
          <div class="col"><button class="delete btn btn-success" onclick="deleteItem()">Usuń</button></div>
          </div>`;
      addIncome(amount, addItem);
    } else if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("expense")
    ) {
      addItem.innerHTML += `<div class="row addRow expense">
          <div class="col-sm-8 nameAmount"><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col"><button class="edit btn btn-success" onclick="editItem()">Edytuj</button></div>
          <div class="col"><button class="delete btn btn-success" onclick="deleteItem()">Usuń</button></div>
          </div>`;
      addIncome(amount, addItem);
    }
  });
};

const addIncome = (amount, addItem) => {
  if (addItem === document.getElementById("income")) {
    amountSumIncome += amount.valueAsNumber;
    totalIncome.innerHTML = `Suma Przychodów: ${amountSumIncome}`;
    total = amountSumIncome - amountSumExpense;
    checkTotal();
  }

  if (addItem === document.getElementById("expense")) {
    amountSumExpense += amount.valueAsNumber;
    totalExpense.innerHTML = `Suma Wydatków: ${amountSumExpense}`;
    total = amountSumIncome - amountSumExpense;
    checkTotal();
  }
};

const deleteItem = () => {
  let row = document.querySelectorAll(".row.addRow");

  for (let i = 0; i < row.length; i++) {
    row[i].onclick = () => {
      let amount = row[i].querySelector("li").textContent;
      amount = amount.split(" ");

      console.log(amount);

      let check = row[i].className;
      check = check.split(" ");
      row[i].remove();

      if (check[2] === "income") {
        amountSumIncome -= Number(amount[2]);
        totalIncome.innerHTML = `Suma Przychodów: ${amountSumIncome}`;
        total = amountSumIncome - amountSumExpense;
        checkTotal();
      }

      if (check[2] === "expense") {
        amountSumExpense -= Number(amount[2]);
        totalExpense.innerHTML = `Suma Wydatków: ${amountSumExpense}`;
        total = amountSumIncome - amountSumExpense;
        checkTotal();
      }
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

const checkTotal = () => {
  if (total > 0) {
    totalAmount.innerHTML = `Możesz jeszcze wydać ${total} złotych`;
  } else if (total === 0) {
    totalAmount.innerHTML = `Bilans wynosi zero`;
  } else {
    totalAmount.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${total} złotych`;
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
