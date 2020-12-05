$(document).ready(function () {
    //console.log("inside function");
    let todos = [];
    getTodos();


    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/items", function (data) {
            todos = data;
            addTodos(todos);
        });
    };


    function addTodos(todos) {
        console.log(todos);
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].isActive) {
                let row = $("<div>");
                row.addClass("row");
                let col1 = $("<div>");
                col1.addClass("col-md-12");
                let listItem = $("<li>");
                listItem.addClass("list-group-item");
                let url = JSON.stringify(todos[i].title)
                url = url.slice(1, 5)
                if (JSON.stringify(todos[i].title).slice(1, 5) === "http") {
                    let atagOne = $("<a>")
                    atagOne.text(todos[i].title);
                    atagOne.attr("href", todos[i].title);
                    atagOne.attr("target", "_blank");
                    listItem.append(atagOne);
                } else {
                    listItem.text(todos[i].title);
                }
                let atag = $("<a>");
                let itag = $("<i>");
                itag.addClass("far fa-check-circle");
                itag.addClass("float-right");
                atag.append(itag);
                let href = "/api/archive/" + todos[i].id;
                atag.attr("href", href);
                atag.attr("data-toggle", "tooltip");
                atag.attr("data-placement", "top");
                atag.attr("title", "Archive");
                listItem.append(atag);
                col1.append(listItem);
                row.append(col1);
                let category = todos[i].category
                $(`#${category}`).append(row);
            }
        }
    }

});



