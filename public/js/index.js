$(document).ready(function () {
    //console.log("inside function");
    let todos = [];
    getTodos();
    

    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/items", function(data) {
            //console.log("endpoint hit");
            todos = data;
            addTodos(todos);
        });
    };

    function addTodos(todos) {
        console.log(todos);
        for (var i = 0; i<todos.length; i++) {
            if (todos[i].isActive) {
                // console.log(todos[i]);
                var row = $("<div>");
                row.addClass("row");
                var col1 = $("<div>");
                col1.addClass("col-md-10");
                col1.text(todos[i].title);
                var col2 = $("<div>");
                col2.addClass("col-md-2");
                var atag = $("<a>");
                atag.text("delete");
                //atag.click(function() {runArchive(todos[i].id)});
                //atag.attr("onclick", runArchive(todos[i].id))
                var href = "/api/archive/" + todos[i].id;
                atag.attr("href", href);
                col2.append(atag);
                row.append(col1, col2);
                var category = todos[i].category
                $(`#${category}`).append(row);            
            }
        }
    }

    // function runArchive(id) {
    //     $.put(`/api/archive/${id}`, function(data) {
    //         console.log(data);
    //     });
    // }
});



