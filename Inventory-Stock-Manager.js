
// let items = [
//     {
//         id: 1,
//         itemName: "Rice",
//         category: "Groceries",
//         quantity: 10,
//         unitPrice: 50,
//         totalValue: 500,
//         addedDate: "2026-01-01",
//         expiryDate: "2026-02-01",
//         restockDate: "2026-02-01",
//         updatedAt: new Date()
//     },
//     {
//         id: 2,
//         itemName: "Wheat Flour",
//         category: "Groceries",
//         quantity: 5,
//         unitPrice: 50,
//         totalValue: 250,
//         addedDate: "2026-01-02",
//         expiryDate: "2026-02-20",
//         restockDate: "2026-02-15",
//         updatedAt: new Date()
//     },
//     {
//         id: 3,
//         itemName: "Milk",
//         category: "Dairy",
//         quantity: 20,
//         unitPrice: 50,
//         totalValue: 100,
//         addedDate: "2026-01-03",
//         expiryDate: "2026-01-06",
//         restockDate: "2026-01-05",
//         updatedAt: new Date()
//     },
//     {
//         id: 4,
//         itemName: "Butter",
//         category: "Dairy",
//         quantity: 8,
//         unitPrice: 50,
//         totalValue: 400,
//         addedDate: "2026-01-03",
//         expiryDate: "2026-02-10",
//         restockDate: "2026-02-08",
//         updatedAt: new Date()
//     },
//     {
//         id: 5,
//         itemName: "Sugar",
//         category: "Groceries",
//         quantity: 15,
//         unitPrice: 50,
//         totalValue: 750,
//         addedDate: "2026-01-04",
//         expiryDate: "2026-01-30",
//         restockDate: "2026-01-28",
//         updatedAt: new Date()
//     },
//     {
//         id: 6,
//         itemName: "Salt",
//         category: "Groceries",
//         quantity: 12,
//         unitPrice: 50,
//         totalValue: 600,
//         addedDate: "2026-01-05",
//         expiryDate: "2026-02-02",
//         restockDate: "2026-02-01",
//         updatedAt: new Date()
//     },
//     {
//         id: 7,
//         itemName: "Cooking Oil",
//         category: "Groceries",
//         quantity: 6,
//         unitPrice: 50,
//         totalValue: 300,
//         addedDate: "2026-01-06",
//         expiryDate: "2026-02-22",
//         restockDate: "2026-02-19",
//         updatedAt: new Date()
//     },
//     {
//         id: 8,
//         itemName: "Eggs",
//         category: "Poultry",
//         quantity: 30,
//         unitPrice: 50,
//         totalValue: 150,
//         addedDate: "2026-01-07",
//         expiryDate: "2026-01-14",
//         restockDate: "2026-01-12",
//         updatedAt: new Date()
//     },
//     {
//         id: 9,
//         itemName: "Bread",
//         category: "Bakery",
//         quantity: 10,
//         unitPrice: 50,
//         totalValue: 500,
//         addedDate: "2026-01-07",
//         expiryDate: "2026-01-10",
//         restockDate: "2026-01-07",
//         updatedAt: new Date()
//     },
//     {
//             id: 10,
//             itemName: "Tea Powder",
//         category: "Beverages",
//         quantity: 4,
//         unitPrice: 50,
//         totalValue: 200,
//         addedDate: "2026-01-08",
//         expiryDate: "2026-02-11",
//         restockDate: "2026-02-08",
//         updatedAt: new Date()
//     }
// ]

const msPerDay = 86400000
const form = document.getElementById('addItemForm');
const saveItemBtn = document.getElementById('saveItemBtn');
let idToEdit;
let editMode = false;
items = JSON.parse(localStorage.getItem('items'))

function updateItemsInLocalStorage() {
    let string = JSON.stringify(items);
    localStorage.setItem("items", string);
}


function validateForm() {

    document.querySelectorAll(".error").forEach(err => err.remove());

    const itemName = document.getElementById("itemName");
    const category = document.getElementById("category");
    const quantity = document.getElementById("quantity");
    const unitPrice = document.getElementById("unitPrice");
    const addedDate = document.getElementById("addedDate");
    const expiryDate = document.getElementById("expiryDate");
    const restockDate = document.getElementById("restockDate");

    if (itemName.value.length < 2 || itemName == "") {
        itemName.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Name can't be emapty and Minimum 2 characters required</p>`
        );
    }

    if (!category.value) {
        category.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Category is required</p>`
        );
    }

    if (quantity.value == "" || quantity.value < 0) {
        quantity.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Quantity must be an integer greater than 0</p>`
        );
    }

    if (unitPrice.value == "" || unitPrice.value < 0) {
        unitPrice.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Unit price must begreater than 0</p>`
        );
    }

    if (!addedDate.value) {
        addedDate.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Added date is required</p>`
        );
    }
    
    if (!expiryDate.value || expiryDate.value < addedDate.value) {
        expiryDate.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Expiry date can't be empty and should be after added date</p>`
        );
    }

    if (!restockDate.value || restockDate.value > expiryDate.value) {
        restockDate.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Restock date must be added and should be before expiry date</p>`
        );
    }

    if(itemName.value.length >= 2 && itemName != "" && category.value && quantity.value != "" && quantity.value >= 0 && unitPrice.value != "" && unitPrice.value > 0 && addedDate.value && expiryDate.value && expiryDate.value > addedDate.value && restockDate.value && restockDate.value >= expiryDate.value){
        return true
    }

}


saveItemBtn.onclick = () => {

    if (editMode) {
        if (validateForm()) {
            items.forEach((item) => {
                if (item.id == idToEdit) {
                    item.itemName = itemName.value,
                        item.category = category.value,
                        item.quantity = quantity.value,
                        item.unitPrice = unitPrice.value;
                    item.totalValue = quantity.value * unitPrice.value;
                    item.addedDate = addedDate.value,
                        item.expiryDate = expiryDate.value,
                        item.restockDate = restockDate.value,
                        item.expiryStatus = findExpiryStatus(expiryDate.value); 
                        item.restockStatus = findRestockStatus(restockDate.value);
                        item.updatedAt = new Date(Date.now())
                    }
                })
                saveItemBtn.innerHTML = "Add";
                form.reset();
                idToEdit = "";
                editMode = false;
                window.alert("Item Edited Successfully");
                updateItemsInLocalStorage();
                window.location.href = "Inventory-Stock-Manager-Table.html"
            }
        }
        
        else {
            if (validateForm()) {
                items.push({
                    id: items.length + 1,
                    itemName: itemName.value,
                    category: category.value,
                    quantity: quantity.value,
                    unitPrice: unitPrice.value,
                    totalValue: quantity.value * unitPrice.value,
                    addedDate: addedDate.value,
                    expiryDate: expiryDate.value,
                    restockDate: restockDate.value,
                    expiryStatus: findExpiryStatus(expiryDate.value),
                    restockStatus: findRestockStatus(restockDate.value),
                    updatedAt: new Date(Date.now())
                })
                // console.log(items);
            form.reset();
            window.alert("Item Added Successfully");
            updateItemsInLocalStorage();
        }
    }
}

function editItem(id) {
    editMode = true;
    idToEdit = id;
    saveItemBtn.innerHTML = "Update";
    items.forEach((item) => {
        if (item.id == id) {
            itemName.value = item.itemName;
            category.value = item.category;
            quantity.value = item.quantity;
            unitPrice.value = item.unitPrice;
            addedDate.value = item.addedDate,
            expiryDate.value = item.expiryDate,
            restockDate.value = item.restockDate
        }
    })
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

    if (isNaN(restock)) return "Invalid Restock Date";

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


window.addEventListener('load', () => {
    let currentUrl = window.location.href;
    idToEdit = currentUrl.split('?')[1];
    if (idToEdit) {
        editItem(idToEdit);
    }
})