
let items;

window.addEventListener('load',()=>{
    let string = localStorage.getItem('items');
    items = JSON.parse(string);
    generateTable();
})
    
function generateTable() {
    if(searchBox.value == ""){
        tableBody.innerHTML = "";
        items.forEach((item) => {
            renderItemAsRows(item);
        })
    }
    else{
        search(searchBox.value);
    }
}

function renderItemAsRows(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
  <td>${item.itemName}</td><td>${item.category}</td><td>${item.quantity}</td><td>${item.unitPrice}</td>
  <td>${item.totalValue}</td><td>${item.addedDate}</td><td>${findExpiryStatus(item.expiryDate)}</td>
  <td>${item.restockDate}</td>
  <td>
  <a href="Inventory-Stock-Manager.html?${item.id}"><button>Edit</button></a>
    <button onclick="deleteItem(${item.id})">Delete</button>
    <button onclick="restockItem(${item.id})">Restock</button>
    </td>`;
    tableBody.appendChild(row);
}

function debounce(func,delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>func.apply(this,args),delay)
    }
}

const debSearch = debounce(search,1000);

function search(searchInput){
    tableBody.innerHTML = "";
    searchInput = searchInput.toLowerCase();
    items.forEach((item)=>{
        if(item.itemName.toLowerCase().includes(searchInput)){
            renderItemAsRows(item);
        }
    })
}

searchBox.addEventListener('input',(e)=>debSearch(e.target.value))

function findExpiryStatus(expiryDate){
    let currentDate = new Date();
    let curTime = currentDate.getTime();
    let expiryTime = new Date(expiryDate).getTime();
    if(curTime > expiryTime){
        return "Expired";
    }
    else{
        return "Fresh";
    }
}

applyFilterBtn.onclick = () => {
    let filterCategory = document.getElementById('filterCategory').value;
    let filterStatus = document.getElementById('filterStatus').value;
    if(filterCategory == "None" && filterStatus == "None"){
        window.alert("No Filter Applied");
        return;
    }
    tableBody.innerHTML = "";
    if(filterCategory != "None" && filterStatus != "None"){
        items.forEach((item)=>{
            if(item.category == filterCategory && findExpiryStatus(item.expiryDate) == filterStatus){
                renderItemAsRows(item);
            }
        })
    }
    if(filterCategory == "None"){
        items.forEach((item)=>{
            if(findExpiryStatus(item.expiryDate) == filterStatus){
                renderItemAsRows(item);
            }
        })
    }
    else{
        items.forEach((item)=>{
            if(item.category == filterCategory){
                renderItemAsRows(item);
            }
        })
    }
}

function restockItem(id){
    items.forEach((item)=>{
        if(item.id == id){

        }
    })
}

function deleteItem(id){
    let confirmation = confirm("Do you want to Delete the item?")
    if(!confirmation){
        return;
    }
    items = items.filter((item)=> item.id != id);
    generateTable();
    updateItemsInLocalStorage();
    
}

function updateItemsInLocalStorage(){
    let string = JSON.stringify(items);
    localStorage.setItem("items",string);
}

