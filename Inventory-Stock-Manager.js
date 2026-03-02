let items = JSON.parse(localStorage.getItem('items'));

const msPerDay = 86400000
const form = document.getElementById('addItemForm');
const saveItemBtn = document.getElementById('saveItemBtn');
const resetBtn = document.getElementById('resetBtn');
let idToEdit;
let editMode = false;


function updateItemsInLocalStorage() {
    let string = JSON.stringify(items);
    localStorage.setItem("items", string);
}

document.querySelectorAll("input").forEach(el => {
    el.addEventListener("blur", () => {
        validateForm()
    });
});

function validateForm() {

    document.querySelectorAll(".error").forEach(err => err.remove());

    const itemName = document.getElementById("itemName");
    const category = document.getElementById("category");
    const quantity = document.getElementById("quantity");
    const unitPrice = document.getElementById("unitPrice");
    const addedDate = document.getElementById("addedDate");
    const expiryDate = document.getElementById("expiryDate");
    const restockDate = document.getElementById("restockDate");

    if (itemName.value.length < 2 || itemName.value  == "") {
        itemName.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Min 2 Characters</p>`
        );
    }

    if (quantity.value == "" || quantity.value < 1) {
        quantity.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Quantity must be greater than 0</p>`
        );
    }

    if (unitPrice.value == "" || unitPrice.value < 1) {
        unitPrice.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Unit price must be greater than 0</p>`
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
            `<p class="error">Expiry date should be after added date</p>`
        );
    }

    if (!restockDate.value) {
        restockDate.parentElement.insertAdjacentHTML(
            "beforeend",
            `<p class="error">Restock date must be added</p>`
        );
    }

    if (
        itemName.value.length >= 2 &&
        itemName.value != "" &&
        category.value &&
        quantity.value != "" &&
        quantity.value > 0 &&
        unitPrice.value != "" &&
        unitPrice.value > 0 &&
        addedDate.value &&
        expiryDate.value &&
        expiryDate.value > addedDate.value &&
        restockDate.value
    ) {
        return true;
    }

}

resetBtn.onclick = (e) => {
    form.reset();
    document.querySelectorAll(".error").forEach(err => err.remove());
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
                    item.updatedAt = new Date(Date.now());
                }
            })
            saveItemBtn.innerHTML = "Add";
            form.reset();
            idToEdit = "";
            editMode = false;

            window.alert("Item Edited Successfully");

            updateItemsInLocalStorage();

            document.getElementById('heading').innerHTML = 'Add Form'

            window.location.href = "Inventory-Stock-Manager-Table.html"
        }
    }

    else {
        if (validateForm()) {
            items.push({
                id: crypto.randomUUID(),
                warehouseId: localStorage.getItem("selectedWarehouse"),
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
            form.reset();
            window.alert("Item Added Successfully");
            updateItemsInLocalStorage();
        }
    }
}

function editItem(id) {
    let isPageAvailable = false
    editMode = true;
    idToEdit = id;
    document.getElementById('heading').innerHTML = 'Edit Item'
    saveItemBtn.innerHTML = "Update";
    items.forEach((item) => {
        if (item.id == id) {
            isPageAvailable = true;
            itemName.value = item.itemName;
            category.value = item.category;
            quantity.value = item.quantity;
            unitPrice.value = item.unitPrice;
            addedDate.value = item.addedDate,
                expiryDate.value = item.expiryDate,
                restockDate.value = item.restockDate
        }
    })
    if (!isPageAvailable) {
        window.alert("Requested Item not found, Redirecting to home page");
        window.location.href = "home.html"
    }
}

function findDaysToExpire(expiryDate) {
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

    if (noOfDaysToExpire <= 0) {
        return "Expired";
    }

    else {
        return `${noOfDaysToExpire} days left`;
    }
}

function findDaysToRestock(restockDate) {
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

    if (noOfDaysToRestock <= 0) {
        return "Restock OverDue"
    }

    else {
        return `${noOfDaysToRestock} days left`;
    }

}

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let today = `${year}-${month}-${day}`;
    document.getElementById("addedDate").setAttribute("max", today);
}

formatDate()




window.addEventListener('load', () => {
    let currentUrl = window.location.href;
    idToEdit = currentUrl.split('?')[1];
    if (idToEdit) {
        editItem(idToEdit);
    }
    localStorage.setItem("items", JSON.stringify([
      { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Sugar", category: "Grains", quantity: 28, unitPrice: 78, totalValue: 2184, addedDate: "2026-02-10", expiryDate: "2026-02-25", restockDate: "2026-02-20", expiryStatus: findExpiryStatus("2026-02-25"), restockStatus: findRestockStatus("2026-02-20"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Salt", category: "Grains", quantity: 12, unitPrice: 30, totalValue: 360, addedDate: "2026-02-12", expiryDate: "2026-03-05", restockDate: "2026-02-28", expiryStatus: findExpiryStatus("2026-03-05"), restockStatus: findRestockStatus("2026-02-28"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Tea", category: "Beverages", quantity: 20, unitPrice: 110, totalValue: 2200, addedDate: "2026-02-18", expiryDate: "2026-03-01", restockDate: "2026-02-25", expiryStatus: findExpiryStatus("2026-03-01"), restockStatus: findRestockStatus("2026-02-25"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Coffee", category: "Beverages", quantity: 14, unitPrice: 240, totalValue: 3360, addedDate: "2026-02-05", expiryDate: "2026-04-05", restockDate: "2026-02-15", expiryStatus: findExpiryStatus("2026-04-05"), restockStatus: findRestockStatus("2026-02-15"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Milk", category: "Dairy", quantity: 8, unitPrice: 45, totalValue: 360, addedDate: "2026-02-20", expiryDate: "2026-02-22", restockDate: "2026-02-21", expiryStatus: findExpiryStatus("2026-02-22"), restockStatus: findRestockStatus("2026-02-21"), updatedAt: new Date() },

  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Butter", category: "Dairy", quantity: 10, unitPrice: 260, totalValue: 2600, addedDate: "2026-02-01", expiryDate: "2026-03-20", restockDate: "2026-02-05", expiryStatus: findExpiryStatus("2026-03-20"), restockStatus: findRestockStatus("2026-02-05"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Flour", category: "Grains", quantity: 26, unitPrice: 58, totalValue: 1508, addedDate: "2026-02-08", expiryDate: "2026-02-28", restockDate: "2026-02-10", expiryStatus: findExpiryStatus("2026-02-28"), restockStatus: findRestockStatus("2026-02-10"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Shampoo", category: "Toiletries", quantity: 16, unitPrice: 190, totalValue: 3040, addedDate: "2026-02-03", expiryDate: "2027-02-03", restockDate: "2026-02-04", expiryStatus: findExpiryStatus("2027-02-03"), restockStatus: findRestockStatus("2026-02-04"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Toothpaste", category: "Toiletries", quantity: 42, unitPrice: 95, totalValue: 3990, addedDate: "2026-02-15", expiryDate: "2027-02-15", restockDate: "2026-02-16", expiryStatus: findExpiryStatus("2027-02-15"), restockStatus: findRestockStatus("2026-02-16"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Water Bottle", category: "Beverages", quantity: 120, unitPrice: 18, totalValue: 2160, addedDate: "2026-02-07", expiryDate: "2027-02-07", restockDate: "2026-02-08", expiryStatus: findExpiryStatus("2027-02-07"), restockStatus: findRestockStatus("2026-02-08"), updatedAt: new Date() },

  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Detergent", category: "Toiletries", quantity: 18, unitPrice: 140, totalValue: 2520, addedDate: "2026-02-14", expiryDate: "2026-02-16", restockDate: "2026-02-10", expiryStatus: findExpiryStatus("2026-02-16"), restockStatus: findRestockStatus("2026-02-10"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Chips", category: "Snacks", quantity: 35, unitPrice: 50, totalValue: 1750, addedDate: "2026-02-09", expiryDate: "2026-02-11", restockDate: "2026-02-05", expiryStatus: findExpiryStatus("2026-02-11"), restockStatus: findRestockStatus("2026-02-05"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Cookies", category: "Snacks", quantity: 24, unitPrice: 70, totalValue: 1680, addedDate: "2026-02-06", expiryDate: "2026-03-18", restockDate: "2026-02-07", expiryStatus: findExpiryStatus("2026-03-18"), restockStatus: findRestockStatus("2026-02-07"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Noodles", category: "Snacks", quantity: 60, unitPrice: 25, totalValue: 1500, addedDate: "2026-02-04", expiryDate: "2026-03-25", restockDate: "2026-02-01", expiryStatus: findExpiryStatus("2026-03-25"), restockStatus: findRestockStatus("2026-02-01"), updatedAt: new Date() },
  { id: crypto.randomUUID(), warehouseId: "chennai", itemName: "Cereal", category: "Grains", quantity: 19, unitPrice: 120, totalValue: 2280, addedDate: "2026-02-11", expiryDate: "2026-02-13", restockDate: "2026-02-09", expiryStatus: findExpiryStatus("2026-02-13"), restockStatus: findRestockStatus("2026-02-09"), updatedAt: new Date() },
]));
})


