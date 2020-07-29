
// When the user clicks the button, open the modal
$("#add-button").click(function showModal() {
  $("#myModal").addClass("d-block");
});

// Touch any part of the windows when adding a new item and the modal will close.
$('#myModal').click(function (event){
   if($(event.target).is('#myModal')){
     $('#myModal').removeClass('d-block');
   }
});

// Optimize Button on click function gets the best deal for your budget!!
$("#optimize-button").click(function optimizerTable() {
  let budget = parseFloat(($('#budget').text()));
  let tbody = $('#myTable tbody');
  sortTable();
  $("#myTable tbody tr").each(function () {
    $(this).find('input').prop('checked', false);
    let costRow = $(this).find('td:nth-child(2)').text().substr(1);
    let budgetLessCost = budget - costRow;
    if (budgetLessCost >= 0) {
      budget -= costRow;
      $(this).find('input').prop('checked', true);
    }
  });
  tbody.html($('tr',tbody).get().reverse());
});

// When the user clicks on "create", close the modal
$("#create-button").click(function createNewItem() {
  // Find a <table> element with id="myTable"
  let name = $("#fname").val();
  let cost = $("#cost").val();

  if(name != '' && cost != ''){
    $("#myTable").find('tbody')
    .append($('<tr>')
      .append($('<td>')
        .text(name)
      )
      .append($('<td>')
        .text("$" + cost)
      )
      .append($('<td>')
        .append($(document.createElement('input')).attr({
          class: 'form-check-input mx-auto',
          type: 'checkbox'
        }))
      )
    );
  }
  $("#myModal").removeClass("d-block");
});

//function that is hable to sort the rows of a table using the cost column
function sortTable() {
  let costFirstRow, costNextRow;
  let Switch;
  let rowToChange;
  let switching = true;

  // Run loop until no switching is needed
  while (switching) {
    switching = false;
    let rows = $('#myTable tbody tr');

    // Goes to all rows except last and ask if the next row has a higher cost than the one on
    // if it does it put switch in true and after it changes.
    (rows.not(":last")).each(function iterateRows(e) {
      Switch = false;
      costFirstRow = parseFloat(($(this).find('td:nth-child(2)')).text().substr(1));
      costNextRow = parseFloat(($(this).next('tr').find('td:nth-child(2)')).text().substr(1));
      if (costFirstRow > costNextRow) {
        rowToChange = $(this);
        Switch = true;
        return false;
      }
    });
    // this if is able to change the rows if they have to change.
    if(Switch){
      rowToChange.insertAfter(rowToChange.next('tr'));
      switching = true;
    }
  }
}




