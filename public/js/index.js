$(document).ready(function () {
    var $newToDoInput = $("input.toDo-item");    

    function addTodo(event) {
        event.preventDefault();
        console.log("inside todo function")
        var todo = {
            title: $newToDoInput.val().trim(),
            category: "toDo",
            isActive: true
        };

        console.log(todo)
        $.post("/api/toDos", todo); //, getTodos);
        $newToDoInput.val("");
    };

    $(document).on("click", ".add-item", addTodo);

    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/toDos", function (data) {
            todos = data;
            initializeRows();
        });
    }
});

