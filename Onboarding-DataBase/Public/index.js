
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

// When the user clicks on "create", close the modal
$("#create-button").click(function createNewItem() {
  // Find a <table> element with id="myTable"
  $("#myModal").removeClass("d-block");
});





