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
                col1.addClass("col-md-10");
                let url = JSON.stringify(todos[i].title)
                url = url.slice(1, 5)
                if (JSON.stringify(todos[i].title).slice(1, 5) === "http") {
                    let atagOne = $("<a>")
                    atagOne.text(todos[i].title);
                    atagOne.attr("href", todos[i].title);
                    atagOne.attr("target","_blank");
                    col1.append(atagOne);
                } else {
                    col1.text(todos[i].title);
                }
                let col2 = $("<div>");
                col2.addClass("col-md-2");
                let atag = $("<a>");
                let itag = $("<i>");
                itag.addClass("fas fa-dumpster");
                atag.append(itag);
                let href = "/api/archive/" + todos[i].id;
                atag.attr("href", href);
                col2.append(atag);
                row.append(col1, col2);
                let category = todos[i].category
                $(`#${category}`).append(row);
            }
        }
    }

});



