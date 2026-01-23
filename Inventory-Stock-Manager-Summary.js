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
        if(findExpireInDays(item.expiryDate) < 0){
            expiredItems = Number(expiredItems) + Number(1);
        }
        else if(findExpireInDays(item.expiryDate) <= 7){
            expiringItems = Number(expiringItems) + Number(1);
        }
        if(findRestockInDays(item.restockDate) <= 0){
            console.log(item)
            restockDueItems = Number(restockDueItems) + Number(1); 
        }
    })
    displayTotalItem.innerHTML = items.length;
    displayTotalValue.innerHTML = totalValue;
    displayExpiredItems.innerHTML = expiredItems;
    displayExpiringItems.innerHTML = expiringItems;
    displayRestockItems.innerHTML = restockDueItems;
}

function findDayToExpiryDay(expiryDate) {

    let today = new Date();
    let expiry = new Date(expiryDate);


    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    let diffInMs = expiry - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    if (diffInDays < 0) {
        return 0;
    }
    return diffInDays;
}

function findExpiryStatus(expiryDate){
    if(findDayToExpiryDay(expiryDate) == 0){
        return "Expired";
    }
    else{
        return `Expire in ${findDayToExpiryDay(expiryDate)} Days`;
    }
}

function findDayToRestock(restockDate) {
    
    let today = new Date();
    let restock = new Date(restockDate);

    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);

    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    if(diffInDays < 0){
        return "Restock OverDue";
    }

    return `Restock in ${diffInDays} days`;
}
    function findRestockStatus(restockDate) {
    if (!restockDate) return "No Restock Date";

    let today = new Date();
    let restock = new Date(restockDate);

    if (isNaN(restock)) return "Invalid Restock Date";

    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);

    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    if(diffInDays <= 0){
        return "Restock OverDue"
    }

    return `Restock in ${diffInDays} days`;
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

function findRestockInDays(restockDate){
    let today = new Date();
    let restock = new Date(restockDate);


    today.setHours(0, 0, 0, 0);
    restock.setHours(0, 0, 0, 0);

    let diffInMs = restock - today;
    let diffInDays = Math.ceil(diffInMs / msPerDay);

    return diffInDays;
}
