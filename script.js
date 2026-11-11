let items = JSON.parse(localStorage.getItem("campusItems")) || [];

// Save items in browser
function saveItems() {
    localStorage.setItem("campusItems", JSON.stringify(items));
}

// Add new lost or found item
function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const type = document.getElementById("itemType").value;
    const location = document.getElementById("location").value.trim();
    const date = document.getElementById("date").value;

    if (!name || !location || !date) {
        alert("Please fill all details!");
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        type: type,
        location: location,
        date: date
    };

    items.push(newItem);

    saveItems();
    displayItems();

    document.getElementById("itemName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("date").value = "";

    alert("Item added successfully!");
}

// Display all items
function displayItems() {
    const container = document.getElementById("items");
    const search = document.getElementById("search").value.toLowerCase();
    const filter = document.getElementById("filter").value;

    container.innerHTML = "";

    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(search) &&
            (filter === "All" || item.type === filter);
    });

    if (filteredItems.length === 0) {
        container.textContent = "No items found.";
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const status = document.createElement("p");
        status.textContent = "Status: " + item.type;

        const place = document.createElement("p");
        place.textContent = "Location: " + item.location;

        const date = document.createElement("p");
        date.textContent = "Date: " + item.date;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            items = items.filter(i => i.id !== item.id);
            saveItems();
            displayItems();
        };

        card.append(title, status, place, date, deleteButton);
        container.appendChild(card);
    });
}

// Load items when website opens
displayItems();
