$(document).ready(function () {
    departments = loadDepartments();
    $("#addDepartment").click(function () {
        $("#addDepartmentForm").toggle();
    });

    $("#addDepartmentBut").click(function () {
        addDepartment();
    });

    $("#editDepartmentBut").click(function () {
        editDepartment();
    });
})

function loadDepartments() {
    $.ajax({
        type: 'GET', //delete
        url: 'https://morganoffice.herokuapp.com/api/departments/',
        success: function (departments) {
            console.log(departments);
            i = 0;
            while (i < departments.length){
                $("#departmentslist").append("<tr>" +
                    "<td>"+departments[i].department_id+"</td>" +
                    "<td>"+departments[i].name+"</td>" +
                    "<td>"+departments[i].location+"</td>" +
                    "<td><button class='deleteDepartment' delid = '"+departments[i].department_id+"'>X</button></td>" +
                    "<td><button class='editDepartment' editID = '"+departments[i].department_id+"'>Edit</button></td>"+
                    "</tr>");
                i = i+1;
            }
            $(".deleteDepartment").click(function () {
                delid = $(this).attr("delid"); // this is the clicked button, we take value of person ID on this button
                deleteDepartment(delid);
                $(this).parent().parent().remove();
            });
            $(".editDepartment").click(function () {
                depID = $(this).attr("editID");
                $("#editDepartmentForm").show();
                showDepartment(depID);
            });
        },
        error: function () {
            alert("error");
        }
    });
}

function addDepartment() {
    id = $("#department_id_input").val();
    name1 = $("#department_name_input").val();
    location1 = $("#department_location_input").val();
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: 'https://morganoffice.herokuapp.com/api/departments/',
        data: {department_id : id, name: name1, location: location1},
        success: function (data) {
            console.log(data);
            location.reload();
        },
        error: function (err) {
            console.log(err);
            $("#err_block").empty();
            $("#err_block").append("<p>" +
                err.responseJSON.department_id[0] + "<br>" +
                err.responseJSON.name[0] + "<br>" +
                err.responseJSON.location[0] + "<br>" +
                "</p>");
        }
    });
}

function deleteDepartment(delid) {
    $.ajax({
        type: 'DELETE', //delete
        url:'https://morganoffice.herokuapp.com/api/departments/'+delid+'/',
        success: function (data) {
            alert("Department Deleted");
        },
        error: function () {
            alert("error");
        }
    })
}

function showDepartment(depID) {
    $.ajax({
        type: 'GET', //get
        url:'https://morganoffice.herokuapp.com/api/departments/'+depID+'/',
        success: function (data) {
            $("#department_id_edit").val(data.department_id);
            $("#department_name_edit").val(data.name);
            $("#department_location_edit").val(data.location);
        },
        error: function () {
            alert("error");
        }
    })
}

function editDepartment() {
    depID = $("#department_id_edit").val();
    name1 = $("#department_name_edit").val();
    location1 = $("#department_location_edit").val();
    $.ajax({
        type: 'PUT', //put
        data: {department_id: depID, name: name1, location: location1},
        url:'https://morganoffice.herokuapp.com/api/departments/'+depID+'/',
        success: function (data) {
            console.log(data);
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
