
const defaultItems = [
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-001",
    itemName: "Rice",
    category: "Groceries",
    quantity: 25,
    unitPrice: 40,
    totalValue: 1000,
    addedDate: "2026-02-01",
    expiryDate: "2026-06-01",
    restockDate: "2026-03-01",
    expiryStatus: "120 days left",
    restockStatus: "30 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-001",
    itemName: "Wheat Flour",
    category: "Groceries",
    quantity: 15,
    unitPrice: 45,
    totalValue: 675,
    addedDate: "2026-02-01",
    expiryDate: "2026-05-20",
    restockDate: "2026-03-10",
    expiryStatus: "108 days left",
    restockStatus: "37 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-001",
    itemName: "Sugar",
    category: "Groceries",
    quantity: 20,
    unitPrice: 30,
    totalValue: 600,
    addedDate: "2026-02-02",
    expiryDate: "2026-07-01",
    restockDate: "2026-03-15",
    expiryStatus: "149 days left",
    restockStatus: "42 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-001",
    itemName: "Salt",
    category: "Groceries",
    quantity: 18,
    unitPrice: 10,
    totalValue: 180,
    addedDate: "2026-02-02",
    expiryDate: "2027-02-02",
    restockDate: "2026-04-01",
    expiryStatus: "365 days left",
    restockStatus: "59 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-001",
    itemName: "Cooking Oil",
    category: "Groceries",
    quantity: 10,
    unitPrice: 120,
    totalValue: 1200,
    addedDate: "2026-02-03",
    expiryDate: "2026-08-01",
    restockDate: "2026-03-20",
    expiryStatus: "179 days left",
    restockStatus: "45 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-002",
    itemName: "Milk",
    category: "Dairy",
    quantity: 30,
    unitPrice: 25,
    totalValue: 750,
    addedDate: "2026-02-05",
    expiryDate: "2026-02-08",
    restockDate: "2026-02-07",
    expiryStatus: "3 days left",
    restockStatus: "2 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-002",
    itemName: "Butter",
    category: "Dairy",
    quantity: 12,
    unitPrice: 80,
    totalValue: 960,
    addedDate: "2026-02-01",
    expiryDate: "2026-04-01",
    restockDate: "2026-03-01",
    expiryStatus: "59 days left",
    restockStatus: "28 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-002",
    itemName: "Cheese",
    category: "Dairy",
    quantity: 10,
    unitPrice: 150,
    totalValue: 1500,
    addedDate: "2026-02-03",
    expiryDate: "2026-04-15",
    restockDate: "2026-03-10",
    expiryStatus: "71 days left",
    restockStatus: "35 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-002",
    itemName: "Eggs",
    category: "Poultry",
    quantity: 40,
    unitPrice: 6,
    totalValue: 240,
    addedDate: "2026-02-04",
    expiryDate: "2026-02-11",
    restockDate: "2026-02-09",
    expiryStatus: "7 days left",
    restockStatus: "5 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-003",
    itemName: "Bread",
    category: "Bakery",
    quantity: 20,
    unitPrice: 35,
    totalValue: 700,
    addedDate: "2026-02-05",
    expiryDate: "2026-02-09",
    restockDate: "2026-02-08",
    expiryStatus: "4 days left",
    restockStatus: "3 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-003",
    itemName: "Buns",
    category: "Bakery",
    quantity: 25,
    unitPrice: 20,
    totalValue: 500,
    addedDate: "2026-02-05",
    expiryDate: "2026-02-10",
    restockDate: "2026-02-08",
    expiryStatus: "5 days left",
    restockStatus: "3 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-003",
    itemName: "Tea Powder",
    category: "Beverages",
    quantity: 8,
    unitPrice: 180,
    totalValue: 1440,
    addedDate: "2026-02-01",
    expiryDate: "2026-12-01",
    restockDate: "2026-04-01",
    expiryStatus: "303 days left",
    restockStatus: "59 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-003",
    itemName: "Coffee Powder",
    category: "Beverages",
    quantity: 6,
    unitPrice: 220,
    totalValue: 1320,
    addedDate: "2026-02-02",
    expiryDate: "2026-11-15",
    restockDate: "2026-04-05",
    expiryStatus: "286 days left",
    restockStatus: "63 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-004",
    itemName: "Soft Drinks",
    category: "Beverages",
    quantity: 50,
    unitPrice: 30,
    totalValue: 1500,
    addedDate: "2026-02-01",
    expiryDate: "2026-08-01",
    restockDate: "2026-03-15",
    expiryStatus: "179 days left",
    restockStatus: "42 days left",
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    warehouseId: "WH-004",
    itemName: "Mineral Water",
    category: "Beverages",
    quantity: 100,
    unitPrice: 15,
    totalValue: 1500,
    addedDate: "2026-02-01",
    expiryDate: "2027-02-01",
    restockDate: "2026-03-10",
    expiryStatus: "365 days left",
    restockStatus: "37 days left",
    updatedAt: new Date()
  }
];

const msPerDay = 86400000

let displayTotalItem = document.getElementById('displayTotalItem');
let displayTotalValue = document.getElementById('displayTotalValue');
let displayExpiredItems = document.getElementById('displayExpiredItems');
let displayExpiringItems = document.getElementById('displayExpiringItems');
let displayRestockItems = document.getElementById('displayRestockItems');
let items;

window.addEventListener("load", () => {
    let string = localStorage.getItem("items");
    items = JSON.parse(string);

    let selectedWarehouse = localStorage.getItem("selectedWarehouse");
    items = items.filter((item) => item.warehouseId === selectedWarehouse);

    console.log(items);
    generateSummary();
});

function generateSummary() {
    let totalValue = 0;
    let expiredItems = 0;
    let expiringItems = 0;
    let restockDueItems = 0;
    items.forEach((item) => {
        totalValue = Number(totalValue) + Number(item.totalValue);
        if (findDaysToExpire(item.expiryDate) < 0) {
            expiredItems = Number(expiredItems) + Number(1);
        }
        else if (findDaysToExpire(item.expiryDate) <= 7 && findDaysToExpire(item.expiryDate) > 0) {
            expiringItems = Number(expiringItems) + Number(1);
        }
        if (findDaysToRestock(item.restockDate) <= 0) {
            restockDueItems = Number(restockDueItems) + Number(1);
        }
    })
    displayTotalItem.innerHTML = items.length;
    displayTotalValue.innerHTML = totalValue;
    displayExpiredItems.innerHTML = expiredItems;
    displayExpiringItems.innerHTML = expiringItems;
    displayRestockItems.innerHTML = restockDueItems;
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

function findDaysToRestock(restockDate) {
    let today = new Date();
    let restock = new Date(restockDate);

    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);

    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    return diffInDays;
}

goToExpiredItems.addEventListener('click', () => {
    window.location.href = "Inventory-Stock-Manager-table.html?Expired";
})

goToExpiringItems.addEventListener('click', () => {
    window.location.href = "Inventory-Stock-Manager-table.html?Expiring%20Soon";
})

goToRestockItems.addEventListener('click', () => {
    window.location.href = "Inventory-Stock-Manager-table.html?Restock%20Overdue";
})