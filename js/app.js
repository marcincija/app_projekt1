var amountSumIncome = 0;
var amountSumExpense = 0;
var total = 0;
var totalIncome = document.getElementById("totalIncome");
var totalExpense = document.getElementById("totalExpense");
var totalAmount = document.getElementById("total");
var j = 0;

const add = (addButton, name, amount, addItem) => {
  addButton.addEventListener("click", () => {
    if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("income")
    ) {
      addItem.innerHTML += `<div class="row addRow income">
          <div class="col nameAmount"><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success" onclick="editItemIncome()">Edytuj</button></div>
          <div class="col delete"><button class=" btn btn-success" onclick="deleteItem()">Usuń</button></div>
          </div>`;
      addIncome(amount, addItem);
    } else if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("expense")
    ) {
      addItem.innerHTML += `<div class="row addRow expense">
          <div class="col nameAmount" ><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success " onclick="editItemExpense()">Edytuj</button></div>
          <div class="col delete"><button class=" btn btn-success" onclick="deleteItem()">Usuń</button></div>
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
  let buttonDelete = document.querySelectorAll(".delete");
  let nameAmount = document.querySelectorAll(".nameAmount");
  let row = document.querySelectorAll(".row.addRow");

  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].onclick = () => {
      console.log(buttonDelete[i]);
      let amount = nameAmount[i].querySelector("li").textContent;
      amount = amount.split(" ");

      let check = row[i].className;
      check = check.split(" ");
      row[i].remove();

      console.log(check);

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

const editItemIncome = () => {
  let editRow = document.querySelectorAll(".income");
  let value;
  let editButton;

  for (let i = 0; i < editRow.length; i++) {
    editRow[i].addEventListener("click", () => {
      value = editRow[i].querySelector("li");
      editButton = editRow[i].querySelector(".edit");
      value.innerHTML = `<input type="value" />`;
      editButton.innerHTML = "<button>Zatwierdź</button>";
      console.log(editButton);
    });
  }
};

const editItemExpense = () => {
  let editRow = document.querySelectorAll(".expense");
  let value;
  let editButton;

  for (let i = 0; i < editRow.length; i++) {
    editRow[i].addEventListener("click", () => {
      value = editRow[i].querySelector("li");
      editButton = editRow[i].querySelector(".edit");
      value.innerHTML = `<input type="value" />`;
      editButton.innerHTML = "<button>Zatwierdź</button>";
      console.log(editButton);
    });
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
