
let items;

window.addEventListener('load',()=>{
    let string = localStorage.getItem('items');
    items = JSON.parse(string);
    generateSummary();
})

function generateSummary() {
    let totalValue = 0;
    let expiredItems = 0;
    let restockDueItems = 0;
    let currentDate = new Date();
    let curTime = currentDate.getTime();
    items.forEach((item) => {
        totalValue = totalValue +  item.price;
        let expiryDate = new Date(item.expiryDate);
        let expiryTime = expiryDate.getTime();
        let restockDate = new Date(item.restockDate);
        let restockTime = restockDate.getTime();
        if (curTime > expiryTime) {
            expiredItems++;
        }
        if (item.restockDate != null && restockTime < curTime) {
            restockDueItems++;
        }
    })
    let displayTotalItem = document.getElementById('displayTotalItem');
    let displayTotalValue = document.getElementById('displayTotalValue');
    let displayExpiredItems = document.getElementById('displayExpiredItems');
    let displayExpiringItems = document.getElementById('displayExpiringItems');
    let displayRestockItems = document.getElementById('displayRestockItems');
    displayTotalItem.innerHTML = items.length;
    displayTotalValue.innerHTML = totalValue;
    displayExpiredItems.innerHTML = expiredItems;
    displayExpiringItems.innerHTML = expiredItems;
    displayRestockItems.innerHTML = restockDueItems;
}