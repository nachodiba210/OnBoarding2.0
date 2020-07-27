let modal = document.getElementById("newItemPopUp");

// Get the button that opens the modal
let btnAdd = document.getElementById("add-button");

let table = document.getElementById("myTable");

let btnOptimize = document.getElementById("optimize-button");

let create = document.getElementById("create-button");



// When the user clicks the button, open the modal
btnAdd.onclick = function showPopUp() {
  modal.classList.remove('d-none');
  modal.classList.add('d-block');
}


// Optimize Button on click function gets the best deal for your budget!!
btnOptimize.onclick = function optimizerDeal() {
  let text = [];
  let result = 0;
  let budget = (document.getElementById("budget").textContent).substr(8);
  let rowLength = table.tBodies[0].rows.length;
  for (let i = 1; i < rowLength + 1; i++) {
    let idCheckbox = "checkbox" + (i);
    table.rows[i].cells[2].firstChild.setAttribute("id", idCheckbox);
    if (document.getElementById(idCheckbox).checked) {
      document.getElementById(idCheckbox).checked = false;
    }
  }
  // get all the cost of each element and sorts them out.
  for (let i = 1; i < rowLength + 1; i++) {
    let costRow = parseInt((table.rows[i].cells[1].innerHTML).substr(1), 10);
    text.push(costRow);
  }
  text.sort((a, b) => a - b);
  // goes through all the elements and start checking the elements you got to buy
  for (let i = 0; i < text.length; i++) {
    result = result + text[i];
    if (result <= budget) {
      for (let j = 1; j < rowLength + 1; j++) {
        let costRow = parseInt((table.rows[j].cells[1].innerHTML).substr(1), 10);
        if (text[i] == costRow) {
          let idCheckbox = "checkbox" + (j);
          document.getElementById(idCheckbox).checked = true;
          continue;
        }
      }
    }
  }
  sortTable();
}

// When the user clicks on "create", close the modal
create.onclick = function createNewItem() {
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
  modal.classList.add('d-none');
  modal.classList.remove('d-block');
}

// function that is hable to sort the rows of a table using the cost column
function sortTable() {
  let i, costFirstRow, costNextRow;
  let swtich;
  let switching = true;

  // Run loop until no switching is needed
  while (switching) {
      switching = false;
      let rows = table.rows;

      // Loop to go through all rows
      for (i = 1; i < (rows.length - 1); i++) {
          Switch = false;

          // Fetch 2 elements that need to be compared
          costFirstRow = parseInt((table.rows[i].cells[1].innerHTML).substr(1), 10);
          costNextRow = parseInt((table.rows[i+1].cells[1].innerHTML).substr(1), 10);

          // Check if 2 rows need to be switched
          if (costFirstRow > costNextRow)
              {

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

