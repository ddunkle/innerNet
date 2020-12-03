$(document).ready(function () {

    const $
    // Add toDo item
    $(document).on("click", ".toDo-item")

    // Initial items array
    const items = [];

    getItems();

    // UPDATE TO ITEMS - This function resets the todos displayed with new todos from the database
    // function initializeRows() {
    //     $todoContainer.empty();
    //     var rowsToAdd = [];
    //     for (var i = 0; i < todos.length; i++) {
    //         rowsToAdd.push(createNewRow(todos[i]));
    //     }
    //     $todoContainer.prepend(rowsToAdd);
    // }

    // This function grabs items from the database and updates the view
    function getItems() {
        $.get("/api/items", function (data) {
            items = data;
            initializeRows();
        });
    }

    // UPDATE to change status from active to inactive
  

    // UPDATE Create a new item row
    function createNewItem(item) {
        const $newItemRow = $(
            [
                "<li class='list-group-item todo-item'>",
                "<span>",
                item.text,
                "</span>",
                "<input type='text' class='edit' style='display: none;'>",
                "<button class='delete btn btn-danger'>x</button>",
                "<button class='complete btn btn-primary'>✓</button>",
                "</li>"
            ].join("")
        );

        $newInputRow.find("button.delete").data("id", todo.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("todo", todo);
        if (todo.complete) {
          $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
      }
    }
})
