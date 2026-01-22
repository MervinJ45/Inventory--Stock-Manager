
let items = [
    {
        id: 1,
        itemName: "Rice",
        category: "Groceries",
        quantity: 10,
        unitPrice: 50,
        totalValue: 500,
        addedDate: "2026-01-01",
        expiryDate: "2026-06-01",
        restockDate: "2026-02-01",
        updatedAt: new Date()
    },
    {
        id: 2,
        itemName: "Wheat Flour",
        category: "Groceries",
        quantity: 5,
        unitPrice: 50,
        totalValue: 250,
        addedDate: "2026-01-02",
        expiryDate: "2026-05-20",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 3,
        itemName: "Milk",
        category: "Dairy",
        quantity: 20,
        unitPrice: 50,
        totalValue: 100,
        addedDate: "2026-01-03",
        expiryDate: "2026-01-06",
        restockDate: "2026-01-05",
        updatedAt: new Date()
    },
    {
        id: 4,
        itemName: "Butter",
        category: "Dairy",
        quantity: 8,
        unitPrice: 50,
        totalValue: 400,
        addedDate: "2026-01-03",
        expiryDate: "2026-03-01",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 5,
        itemName: "Sugar",
        category: "Groceries",
        quantity: 15,
        unitPrice: 50,
        totalValue: 750,
        addedDate: "2026-01-04",
        expiryDate: null,
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 6,
        itemName: "Salt",
        category: "Groceries",
        quantity: 12,
        unitPrice: 50,
        totalValue: 600,
        addedDate: "2026-01-05",
        expiryDate: null,
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 7,
        itemName: "Cooking Oil",
        category: "Groceries",
        quantity: 6,
        unitPrice: 50,
        totalValue: 300,
        addedDate: "2026-01-06",
        expiryDate: "2026-09-01",
        restockDate: "2026-03-01",
        updatedAt: new Date()
    },
    {
        id: 8,
        itemName: "Eggs",
        category: "Poultry",
        quantity: 30,
        unitPrice: 50,
        totalValue: 150,
        addedDate: "2026-01-07",
        expiryDate: "2026-01-14",
        restockDate: "2026-01-12",
        updatedAt: new Date()
    },
    {
        id: 9,
        itemName: "Bread",
        category: "Bakery",
        quantity: 10,
        unitPrice: 50,
        totalValue: 500,
        addedDate: "2026-01-07",
        expiryDate: "2026-01-10",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 10,
        itemName: "Tea Powder",
        category: "Beverages",
        quantity: 4,
        unitPrice: 50,
        totalValue: 200,
        addedDate: "2026-01-08",
        expiryDate: "2026-12-01",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 11,
        itemName: "Coffee Powder",
        category: "Beverages",
        quantity: 3,
        unitPrice: 50,
        totalValue: 150,
        addedDate: "2026-01-08",
        expiryDate: "2026-11-15",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 12,
        itemName: "Soap",
        category: "Personal Care",
        quantity: 20,
        unitPrice: 50,
        totalValue: 1000,
        addedDate: "2026-01-09",
        expiryDate: "2027-01-01",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 13,
        itemName: "Shampoo",
        category: "Personal Care",
        quantity: 6,
        unitPrice: 50,
        totalValue: 300,
        addedDate: "2026-01-09",
        expiryDate: "2027-03-01",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 14,
        itemName: "Toothpaste",
        category: "Personal Care",
        quantity: 10,
        unitPrice: 50,
        totalValue: 500,
        addedDate: "2026-01-10",
        expiryDate: "2027-02-01",
        restockDate: null,
        updatedAt: new Date()
    },
    {
        id: 15,
        itemName: "Dish Wash Liquid",
        category: "Household",
        quantity: 5,
        unitPrice: 55,
        totalValue: 575,
        addedDate: "2026-01-10",
        expiryDate: "2027-06-01",
        restockDate: null,
        updatedAt: new Date()
    }
]

const form = document.getElementById('addItemForm');
const saveItemBtn = document.getElementById('saveItemBtn');
let idToEdit;
let editMode = false;

function updateItemsInLocalStorage(){
    let string = JSON.stringify(items);
    localStorage.setItem("items",string);
}

saveItemBtn.onclick = () => {

    if (editMode) {
        items.forEach((item) => {
            if (item.id == idToEdit) {
                item.itemName = itemName.value,
                item.category = category.value,
                item.quantity = quantity.value,
                item.unitPrice = unitPrice.value;
                item.totalValue = quantity.value * unitPrice.value;
                item.addedDate = addedDate.value,
                item.expiryDate = expiryDate.value || null,
                item.restockDate = restockDate.value || null,
                item.updatedAt = new Date(Date.now())
            }
        })
        saveItemBtn.innerHTML = "Add";
        form.reset();
        idToEdit = "";
        editMode = false;
        window.alert("Item Edited Successfully");
        window.location.href = "Inventory-Stock-Manager.html"

    }

    else {
        items.push({
            id: items.length + 1,
            itemName: itemName.value,
            category: category.value,
            quantity: quantity.value,
            unitPrice : unitPrice.value,
            totalValue : quantity.value * unitPrice.value,
            addedDate: addedDate.value,
            expiryDate: expiryDate.value || null,
            restockDate: restockDate.value || null,
            updatedAt: new Date(Date.now())
        })
        console.log(items)
        form.reset();
        console.log("ddubuyd")
        window.alert("Item Added Successfully");
    }
    updateItemsInLocalStorage();
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

window.addEventListener('load',()=>{
    let currentUrl = window.location.href;
    idToEdit = currentUrl.split('?')[1];
    if(idToEdit){
        editItem(idToEdit);
    }
})