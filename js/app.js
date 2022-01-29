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
          <div class="col nameAmount"><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success"  onclick="editItemIncome()">Edytuj</button></div>
          <div class="col delete"><button class=" btn btn-success"  onclick="deleteItem()">Usuń</button></div>
          </div>`;
      addIncome(amount, addItem);
    } else if (
      name.value != 0 &&
      amount.value != 0 &&
      addItem === document.getElementById("expense")
    ) {
      addItem.innerHTML += `<div class="row addRow expense">
          <div class="col nameAmount" ><ul><li>${name.value} - ${amount.value} zł</li></ul></div>
          <div class="col edit"><button class=" btn btn-success "  onclick="editItemExpense()">Edytuj</button></div>
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
  document.getElementById("income").onclick = income;
  document.getElementById("expense").onclick = expense;

  function income(e) {
    if (e.target.tagName == "BUTTON") {
      parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");

      let split = value.textContent;
      let all = split.split(" ");

      let number = all[2];

      amountSumIncome -= Number(number);
      totalIncome.innerHTML = `Suma Przychodów: ${amountSumIncome}`;
      total = amountSumIncome - amountSumExpense;
      checkTotal();

      deleteElement = e.target.closest(".addRow").remove();
    }
  }

  function expense(e) {
    if (e.target.tagName == "BUTTON") {
      parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");

      let split = value.textContent;
      let all = split.split(" ");

      let number = all[2];

      amountSumExpense -= Number(number);
      totalExpense.innerHTML = `Suma Wydatków: ${amountSumExpense}`;
      total = amountSumIncome - amountSumExpense;
      checkTotal();

      deleteElement = e.target.closest(".addRow").remove();
    }
  }
};

const editItemIncome = () => {
  document.getElementById("income").onclick = button;

  function button(e) {
    if (e.target.tagName == "BUTTON") {
      id = e.target.id;
      let parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");
      let button = parentElement.querySelector(".edit");

      let split = value.textContent;
      let all = split.split(" ");
      let text = all[0];
      let number = all[2];

      amountSumIncome = amountSumIncome - Number(number);

      button.innerHTML = `<button class="btn btn-primary" onclick="approve()" id="${id}">Zatwierdź</button>`;
      value.innerHTML = `<ul><li><input type="text" id="newName"  placeholder="${text}" /></li>
      <input type="number" id="newAmount"  placeholder="${number}" /></li>
      </ul>`;
    }
  }
};

const editItemExpense = () => {
  document.getElementById("expense").onclick = button;

  function button(e) {
    if (e.target.tagName == "BUTTON") {
      id = e.target.id;
      let parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");

      let button = parentElement.querySelector(".edit");

      let split = value.textContent;
      let all = split.split(" ");
      let text = all[0];
      let number = all[2];

      amountSumExpense = amountSumExpense - Number(number);

      button.innerHTML = `<button class="btn btn-primary" onclick="approve()" id="${id}">Zatwierdź</button>`;
      value.innerHTML = `<ul><li><input type="text" id="newName"  placeholder="${text}" /></li>
      <input type="number" id="newAmount"  placeholder="${number}" /></li>
      </ul>`;
    }
  }
};

function approve() {
  let amount = document.getElementById("newAmount").value;
  let text = document.getElementById("newName").value;

  document.getElementById("income").onclick = buttonIncome;

  function buttonIncome(e) {
    if (e.target.tagName == "BUTTON") {
      const parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");

      let buttonEdit = parentElement.querySelector(".edit");

      value.innerHTML = `${text} - ${amount} zł`;
      buttonEdit.innerHTML = `<div class="col edit"><button class=" btn btn-success" id=${id} onclick="editItemIncome()">Edytuj</button></div>`;

      amountSumIncome += Number(amount);
      totalIncome.innerHTML = `Suma Przychodów: ${amountSumIncome}`;
      total = amountSumIncome - amountSumExpense;
      checkTotal();
    }
  }

  document.getElementById("expense").onclick = buttonExpense;

  function buttonExpense(e) {
    if (e.target.tagName == "BUTTON") {
      const parentElement = e.target.closest(".addRow");
      let value = parentElement.querySelector("li");

      let buttonEdit = parentElement.querySelector(".edit");

      value.innerHTML = `${text} - ${amount} zł`;
      buttonEdit.innerHTML = `<div class="col edit"><button class=" btn btn-success" id=${id} onclick="editItemExpense()">Edytuj</button></div>`;

      amountSumExpense += Number(amount);
      totalExpense.innerHTML = `Suma Wydaktów: ${amountSumExpense}`;
      total = amountSumIncome - amountSumExpense;
      checkTotal();
    }
  }
}

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
