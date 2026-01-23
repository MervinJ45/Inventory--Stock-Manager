let items;

const msPerDay = 86400000
const searchBox = document.getElementById('searchBox');

window.addEventListener('load', () => {
    let string = localStorage.getItem('items');
    items = JSON.parse(string);
    generateTable(items);
})

function generateTable(items) {
    if (searchBox.value == "") {
        tableBody.innerHTML = "";
        items.forEach((item) => {
            renderItemAsRows(item);
        })
    }
    else {
        search(searchBox.value);
    }
}

function renderItemAsRows(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
  <td>${item.itemName}</td><td>${item.category}</td><td>${item.quantity}</td><td>${item.unitPrice}</td>
  <td>${item.totalValue}</td><td>${item.addedDate}</td><td>${item.expiryDate}</td><td>${item.expiryStatus}</td>
  <td>${item.restockStatus}</td>
  <td>
    <button onclick="editItem(${item.id})">Edit</button>
    <button onclick="deleteItem(${item.id})">Delete</button>
    <button onclick="restockItem(${item.id})">Restock</button>
    </td>`;
    tableBody.appendChild(row);
}

function editItem(id) {
    updateItemsInLocalStorage();
    window.location.href = "Inventory-Stock-Manager.html?" + id
}

function deleteItem(id) {
    let confirmation = confirm("Do you want to Delete the item?")
    if (!confirmation) {
        return;
    }
    items = items.filter((item) => item.id != id);
    generateTable(items);
    updateItemsInLocalStorage();

}

function restockItem(id) {
    items.forEach((item) => {
        if (item.id == id) {
            console.log(item);
            item.quantity = Number(item.quantity) + Number(10);
            let newDate = new Date(new Date(item.restockDate).getTime() + 10 * 24 * 60 * 60 * 1000);
            item.restockDate = formatDate(newDate);
            item.expiryStatus = findExpiryStatus(item.expiryDate);
            item.restockStatus = findRestockStatus(findExpiryStatus(item.expiryDate), new Date(newDate));
            item.totalValue = Number(item.quantity) * Number(item.unitPrice);
        }
    })
    generateTable(items);
    updateItemsInLocalStorage();
}


function findExpiryStatus(expiryDate) {

    let today = new Date();
    let expiry = new Date(expiryDate);


    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    let diffInMs = expiry - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    if (diffInDays < 0) {
        return "Expired";
    }
    return `Expire in ${diffInDays} days`;
}

function findExpireInDays(expiryDate){
    let today = new Date();
    let expiry = new Date(expiryDate);


    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    let diffInMs = expiry - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    return diffInDays;
}

function findRestockStatus(expiryStatus, restockDate) {

    let today = new Date();
    let restock = new Date(restockDate);

    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);

    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    if(diffInDays < 0){
        return "Restock Overdue"
    }

    return `Restock in ${diffInDays} days`;
}

const debSearch = debounce(search, 1000);

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay)
    }
}

function search(searchInput) {
    tableBody.innerHTML = "";
    searchInput = searchInput.toLowerCase();
    items.forEach((item) => {
        if (item.itemName.toLowerCase().includes(searchInput)) {
            renderItemAsRows(item);
        }
    })
}

searchBox.addEventListener('input', (e) => debSearch(e.target.value))

applyFilterBtn.onclick = () => {
    tableBody.innerHTML = "";
    let filterCategory = document.getElementById('filterCategory').value;
    let filterStatus = document.getElementById('filterStatus').value;
    if (filterCategory == "None" && filterStatus == "None") {
        generateTable(items)
    }
    if (filterCategory != "None" && filterStatus != "None") {
        items.forEach((item) => {
            if (item.category == filterCategory && (item.expiryStatus == filterStatus || item.restockStatus == filterStatus)) {
                renderItemAsRows(item);
            }
        })
    }
    else if (filterCategory == "None") {
        items.forEach((item) => {
            if ((item.expiryStatus == filterStatus || item.restockStatus == filterStatus || ((filterStatus=="Expiring Soon") && (findExpireInDays(item.expiryDate) <= 7 && findExpireInDays(item.expiryDate) > 0)))) {
                renderItemAsRows(item);
            }
        })
    }
    else {
        items.forEach((item) => {
            if (item.category == filterCategory) {
                renderItemAsRows(item);
            }
        })
    }
}

function formatDate(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

let asc = true;

document.getElementById('sortByName').addEventListener('click',()=>{
    if(asc){
        let sorted = items.sort((a, b) => a.itemName.localeCompare(b.itemName));
        generateTable(sorted);
    }
    else{
        let sorted = items.sort((a, b) => b.itemName.localeCompare(a.itemName));
        generateTable(sorted);
    }
    asc = !asc
})

function updateItemsInLocalStorage() {
    let string = JSON.stringify(items);
    localStorage.setItem("items", string);
}

