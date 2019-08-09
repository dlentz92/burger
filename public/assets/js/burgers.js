// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-eat").on("click", function (event) {
      var id = $(this).data("id");
      var newDevoured = $(this).data("neweat");
  
      var newBurgerState = {
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newBurgerState
      }).then(
        function () {
          console.log("changed eating to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $('#submit').on("click", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurgers = {
        burger_name: $("#burgerName").val(),
        devoured: 0
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurgers
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          // location.reload();
        }
      );
    });
  
    $(".delete").on("click", function (event) {
      // Make sure to preventDefault on a submit event.
      
      var burgersID = $(this).data("id")
  
  
      // Send the POST request.
      $.ajax("/api/burgers/" + burgersID, {
        type: "DELETE",
  
      }).then(
        function () {
          console.log("deleted burger", burgersID);
          // Reload the page to get the updated list
          location.reload();
        });
    })
  });
  