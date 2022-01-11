function getandupdate() {
    console.log("Updating List...");

    title = document.getElementById("title").value;
    desc = document.getElementById("description").value;

    if (title.length > 0 && desc.length > 0) {
        if (localStorage.getItem("itemsJson") == null) {
            itemJsonArray = [];
            itemJsonArray.push([title, desc]);
            localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
        } else {
            itemJsonArrayStr = localStorage.getItem("itemsJson");
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([title, desc]);
            localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
        }
        update();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    } else {
        alert("Title and dicription can't be empty!");
    }
}

function update() {
    if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    //Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `<tr>
              <th scope="row">${index + 1}</th>
              <td style="text-transform:capitalize">${element[0]}</td>
              <td style="text-transform:capitalize">${element[1]}</td>
              <td><button class="btn btn-sm btn-danger" onclick = "deleted(${index})">Delete</button></td>
            </tr>`;
    });
    tableBody.innerHTML = str;
}

function clearr() {
    let form = document.getElementById("title");
    let form2 = document.getElementById("description");
    form.reset();
    form2.reset();
}
add = document.getElementById("add");
add.addEventListener("click", getandupdate);
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {
    if (confirm("Do you really want to clear?")) localStorage.clear();
    console.log("Clearing the storage");
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    update();
}