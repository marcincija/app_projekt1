var amountSumIncome = 0;
var amountSumExpense = 0;
var total = 0;
var totalIncome = document.getElementById("totalIncome");
var totalExpense = document.getElementById("totalExpense");
var totalAmount = document.getElementById("total");
var j = 0;
var idIncome = 0;
var idExpense = 0;
var approveId = 0;
var id = 0;

const add = (addButton, name, amount, addItem) => {
  addButton.addEventListener("click", () => {
    if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("income")
    ) {
      addItem.innerHTML += `<div class="row addRow income">
          <div class="col nameAmount"><ul><li>${name.value} - ${
        amount.value
      } zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success" id=${idIncome++} onclick="editItemIncome()">Edytuj</button></div>
          <div class="col delete"><button class=" btn btn-success"  onclick="deleteItem()">Usuń</button></div>
          </div>`;
      addIncome(amount, addItem);
    } else if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("expense")
    ) {
      addItem.innerHTML += `<div class="row addRow expense">
          <div class="col nameAmount" ><ul><li>${name.value} - ${
        amount.value
      } zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success " id=${idExpense++} onclick="editItemExpense()">Edytuj</button></div>
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
      let amount = nameAmount[i].querySelector("li").textContent;
      amount = amount.split(" ");

      let check = row[i].className;
      check = check.split(" ");
      row[i].remove();

      console.log(amount[2]);

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

  document.getElementById("income").onclick = button;

  function button(e) {
    if (e.target.tagName == "BUTTON") {
      id = e.target.id;
      let value = editRow[id].querySelector("li");

      let button = editRow[id].querySelector(".edit");

      let split = value.textContent;
      let all = split.split(" ");
      let text = all[0];
      let number = all[2];

      amountSumIncome = amountSumIncome - number;

      button.innerHTML = `<button class="btn btn-primary" onclick="approve()" id="${approveId++}">Zatwierdź</button>`;
      value.innerHTML = `<ul><li><input type="text" id="newName"  placeholder="${text}" /></li>
      <input type="number" id="newAmount"  placeholder="${number}" /></li>
      </ul>`;
    }
  }
};

function approve() {
  let editRow = document.querySelectorAll(".income");
  let amount = document.getElementById("newAmount").value;
  let text = document.getElementById("newName").value;

  document.getElementById("income").onclick = button;

  function button(e) {
    if (e.target.tagName == "BUTTON") {
      let value = editRow[id].querySelector("li");

      let buttonEdit = editRow[id].querySelector(".edit");

      totalIncome.innerHTML = `Suma Przychodów: ${amountSumIncome}`;

      value.innerHTML = `${text} - ${amount} zł`;
      buttonEdit.innerHTML = `<div class="col edit"><button class=" btn btn-success" id=${idIncome++} onclick="editItemIncome()">Edytuj</button></div>`;
      amountSumIncome = amountSumIncome + Number(amount);
      total = amountSumIncome - amountSumExpense;
      checkTotal();
    }
  }
}

const editItemExpense = () => {
  let editRow = document.querySelectorAll(".expense");
  let value;
  let editButton;

  let id;
  document.getElementById("expense").onclick = button;

  function button(e) {
    if (e.target.tagName == "BUTTON") {
      id = e.target.id;
      editRow[id].innerHTML = `<input type="text" />`;
    }
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
