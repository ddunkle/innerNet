$(document).ready(function () {
    console.log("inside function");
    let todos = [];
    getTodos();
    

    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/items", function(data) {
            //console.log("endpoint hit");
            todos = data;
        });
    };
});

