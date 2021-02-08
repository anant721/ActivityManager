var data = [];
var itemToUpdate = 0;
//date from stack-overflow
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("date").value = today;

function tb() {
    var d_tb = "<tr><td><b>Task</b></td><td><b>Status</b></td><td><b>Priority</b></td><td><b>Date</b></td><td><b>Delete</b></td><td><b>Edit</b></td></tr>";

    for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        if (today == data[i].date1) {
            d_tb += "<tr>";
            d_tb += "<td>" + data[i].task1 + "</td>";
            d_tb += "<td>" + data[i].status1 + "</td>";
            d_tb += "<td>" + data[i].priority1 + "</td>";
            d_tb += "<td>" + data[i].date1 + "</td>";
            d_tb += `<td><button onclick="remove(${i})" class="btn btn-secondary">Delete</button></td>`;
            d_tb += `<td><button onclick="Edit(${i})" class="btn btn-secondary"> Edit</button></td>`;
            d_tb += "</tr>";
        }
    }
    document.getElementById("demo").innerHTML = d_tb;
/// for sorting code from w3school
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("demo");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
///push data

function pushData() {
    var task1 = document.getElementById("task").value;
    var status1 = document.getElementById("status").value;
    var priority1 = document.getElementById("priority").value;
    var date1 = document.getElementById("date").value;
    if (task1 != "" && status1 != "" && priority1 != "") {
        data.push({
            task1: task1,
            status1: status1,
            priority1: priority1,
            date1: date1
        });
        tb();
        setData();
    // } else {
        //alert("fill details");
    }
    document.getElementById("task").value = "";
     document.getElementById("status").value = "Start";
    document.getElementById("priority").value = "Low";
    // document.getElementById("date").value = "";
}
function remove(i) {
    data.splice(i, 1);
    setData();
    tb();
}

function Edit(item) {
    ///bootstrap
    $(".add-Save-button").text("Update").attr("onclick", `update(${item})`);
    $('#showUpdateForm').show();
    itemToUpdate = item; 
    document.getElementById("task").value = data[item].task1;
    document.getElementById("status").value = data[item].status1;
    document.getElementById("priority").value = data[item].priority1;
    document.getElementById("date").value = data[item].date1;

}
function update() {
    $(".add-Save-button").text("Save");

    // $("#btn1").show();
    var new_data = {};
    new_data["task1"] = document.getElementById("task").value;
    new_data["status1"] = document.getElementById("status").value;
    new_data["priority1"] = document.getElementById("priority").value;
    new_data["date1"] = document.getElementById("date").value;
    data.splice(itemToUpdate, 1, new_data);
    tb();
    setData();
}
/// set data in local storage using json -array-string-js
function setData() {
    var str = (JSON.stringify(data));
    localStorage.setItem("data", str);
}

/// set data in local storage using json -array-string-js
function getData() {
    var str = localStorage.getItem("data");
    data = JSON.parse(str);
    if (!data) {
        data = [];
    }
}
getData();
tb();



