const msPerDay = 86400000

let displayTotalItem = document.getElementById('displayTotalItem');
let displayTotalValue = document.getElementById('displayTotalValue');
let displayExpiredItems = document.getElementById('displayExpiredItems');
let displayExpiringItems = document.getElementById('displayExpiringItems');
let displayRestockItems = document.getElementById('displayRestockItems');
let items;


window.addEventListener('load',()=>{
    let string = localStorage.getItem('items');
    items = JSON.parse(string);
    console.log(items);
    generateSummary();
})

function generateSummary() {
    let totalValue = 0;
    let expiredItems = 0;
    let expiringItems = 0;
    let restockDueItems = 0;
    items.forEach((item) => {
        totalValue = Number(totalValue) +  Number(item.totalValue);
        if(findDaysToExpire(item.expiryDate) < 0){
            expiredItems = Number(expiredItems) + Number(1);
        }
        else if(findDaysToExpire(item.expiryDate) <= 7 && findDaysToExpire(item.expiryDate)>0){
            expiringItems = Number(expiringItems) + Number(1);
        }
        if(findDaysToRestock(item.restockDate) <= 0){
            restockDueItems = Number(restockDueItems) + Number(1); 
        }
    })
    displayTotalItem.innerHTML = items.length;
    displayTotalValue.innerHTML = totalValue;
    displayExpiredItems.innerHTML =  expiredItems;
    displayExpiringItems.innerHTML = expiringItems;
    displayRestockItems.innerHTML = restockDueItems;
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

function findDaysToRestock(restockDate){
    let today = new Date();
    let restock = new Date(restockDate);
    
    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);
    
    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);
    
    return diffInDays;
}

goToExpiredItems.addEventListener('click',()=>{
    window.location.href = "Inventory-Stock-Manager-table.html?Expired"; 
})

goToExpiringItems.addEventListener('click',()=>{
    window.location.href = "Inventory-Stock-Manager-table.html?Expiring%20Soon"; 
})

goToRestockItems.addEventListener('click',()=>{
    window.location.href = "Inventory-Stock-Manager-table.html?Restock%20Overdue"; 
})