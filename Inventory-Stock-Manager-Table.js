let items;

const msPerDay = 86400000
const searchBox = document.getElementById('searchBox');
const filterCategory = document.getElementById('filterCategory');
const filterStatus = document.getElementById('filterStatus');

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
  <td>${item.totalValue}</td><td>${formatDateToDisplay(new Date(item.addedDate))}</td><td>${formatDateToDisplay(new Date(item.expiryDate))}</td><td>${item.expiryStatus}</td>
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
            item.restockStatus = findRestockStatus(new Date(newDate));
            item.totalValue = Number(item.quantity) * Number(item.unitPrice);
        }
    })
    generateTable(items);
    updateItemsInLocalStorage();
}


function findDaysToExpire(expiryDate){      
    let today = new Date();
    let expiry = new Date(expiryDate);
    
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    
    let diffInMs = expiry - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);
    
    return diffInDays;
}

function findExpiryStatus(expiryDate) {
    
    let noOfDaysToExpire = findDaysToExpire(expiryDate);
    
    if(noOfDaysToExpire <= 0){
        return "Expired";
    }
    
    else{
        return `Expire in ${noOfDaysToExpire} days`;
    }
}

function findDaysToRestock(restockDate){
    let today = new Date();
    let restock = new Date(restockDate);
    
    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);
    
    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);
    
    return diffInDays;
}

function findRestockStatus(restockDate) {
    
    let noOfDaysToRestock = findDaysToRestock(restockDate);
    
    if(noOfDaysToRestock <= 0){
        return "Restock OverDue"
    }
    
    else{
        return `Restock in ${noOfDaysToRestock} days`;
    }
    
}

function clearFilter(){
    filterCategory.value = "All Category";
    filterStatus.value = "All Status";
}

function clearSearch(){
    searchBox.value = "";
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
    clearFilter();
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
    clearSearch();
    tableBody.innerHTML = "";
    

    if (filterCategory.value === "All Category" && filterStatus.value === "All Status") {
    console.log("ss")
        generateTable(items);
        return;
    }

    let found = false;

    items.forEach((item) => {

        let categoryMatch = true;
        let statusMatch = true;

        if (filterCategory.value !== "All Category") {
            categoryMatch = (item.category === filterCategory.value);
        }

        if (filterStatus.value !== "All Status") {

            if (filterStatus.value === "Expired") {
                statusMatch = (item.expiryStatus === "Expired");
            }

            else if (filterStatus.value === "Expiring Soon") {
                statusMatch = (findDaysToExpire(item.expiryDate) <= 7 && findDaysToExpire(item.expiryDate) > 0);
            }

            else if (filterStatus.value === "Restock Overdue") {
                statusMatch = (item.restockStatus === "Restock OverDue");
            }
        }

        if (categoryMatch && statusMatch) {
            renderItemAsRows(item);
            found = true;
        }
        console.log(categoryMatch +" "+ statusMatch)
    });

    if (!found) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center; padding:20px; color:#666; font-size:14px;">
                    No content for applied filter
                </td>
            </tr>
        `;
    }
}

function formatDate(date) {
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatDateToDisplay(date) {
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

let asc = true;

document.getElementById('sortByName').addEventListener('click',()=>{
    clearFilter();
    clearSearch();
    if(asc){
        document.getElementById('sortByName').innerHTML = "Name ▲";
        let sorted = items.sort((a, b) => a.itemName.localeCompare(b.itemName));
        generateTable(sorted);
    }
    else{
        document.getElementById('sortByName').innerHTML = "Name ▼";
        let sorted = items.sort((a, b) => b.itemName.localeCompare(a.itemName));
        generateTable(sorted);
    }
    asc = !asc
})

function updateItemsInLocalStorage() {
    let string = JSON.stringify(items);
    localStorage.setItem("items", string);
}

window.addEventListener('load', () => {
    let string = localStorage.getItem('items');
    items = JSON.parse(string);
    generateTable(items);
})