
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btnAdd = document.getElementById("add-button").addEventListener('click', togglePopUp);

let table = document.getElementById("myTable");

let btnOptimize = document.getElementById("optimize-button").addEventListener('click', optimizerDeal);

let create = document.getElementById("create-button").addEventListener('click',createNewItem);

window.addEventListener('click',windowPopUp);

// When the user clicks the button, open the modal
function togglePopUp() {
  modal.classList.toggle("d-block");
}


function windowPopUp(event) {
  if (event.target == modal) {
    modal.classList.toggle('d-block');
  }
}


// Optimize Button on click function gets the best deal for your budget!!
function optimizerDeal() {
  let budget = parseInt(document.getElementById('budget').textContent.substr(1));
  let rowLength = table.tBodies[0].rows.length;
  let rows = table.rows;
  sortTable();
  // goes through all the elements and start checking the elements you got to buy
  for (let i = rowLength; i >= 1; i--) {
    let costRow = parseInt((rows[i].cells[1].innerHTML).substr(1), 10);
    let budgetLessCost = budget-costRow;
    if (budgetLessCost >= 0) {
      budget -= costRow;
      rows[i].cells[2].childNodes[0].checked = true;
    }
  }
}


// When the user clicks on "create", close the modal
function createNewItem() {
  // Find a <table> element with id="myTable"
  let name = document.getElementById("fname").value;
  let cost = document.getElementById("cost").value;
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "form-check-input mx-auto");

  let row = table.insertRow(-1);
  let nameCell = row.insertCell(0);
  let costCell = row.insertCell(1);
  let checkBoxCell = row.insertCell(2);

  nameCell.innerHTML = name;
  costCell.innerHTML = ('$' + cost);
  checkBoxCell.append(checkBox);
  modal.classList.toggle("d-block");
}

// function that is hable to sort the rows of a table using the cost column
function sortTable() {
  let i, costFirstRow, costNextRow;
  let Switch;
  let switching = true;

  // Run loop until no switching is needed
  while (switching) {
    switching = false;
    let rows = table.rows;

    // Loop to go through all rows
    for (i = 1; i < (rows.length - 1); i++) {
      Switch = false;

      // Fetch 2 elements that need to be compared
      costFirstRow = parseInt((rows[i].cells[1].innerHTML).substr(1), 10);
      costNextRow = parseInt((rows[i + 1].cells[1].innerHTML).substr(1), 10);

      // Check if 2 rows need to be switched
      if (costFirstRow < costNextRow) {

        // If yes, mark Switch as needed and break loop
        Switch = true;
        break;
      }
    }
    if (Switch) {
      // Function to switch rows and mark switch as completed
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

