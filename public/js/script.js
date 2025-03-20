const socket = io();

let username = prompt("Enter your username:")

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            socket.emit("send-location", {username, latitude, longitude});
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

const map = L.map("map").setView([0,0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Open Street Map"
}).addTo(map)

const markers = {};
const usernames = {};

// Username list display
const usernameListDiv = document.createElement("div");
usernameListDiv.id = "username-list";
usernameListDiv.innerText = "Connected Users:";
document.body.appendChild(usernameListDiv);

// Add user count element to the page
const userCountDiv = document.createElement("div");
userCountDiv.id = "user-count";
userCountDiv.innerText = "Users online: 0";
document.body.appendChild(userCountDiv);

socket.on("update-user-count", (count) => {
    userCountDiv.innerText = `Users online: ${count}`;
});

socket.on("recieve-location", (data) => {
    const {id, username, latitude, longitude} = data;
    
    map.setView([latitude, longitude]);

    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }
    else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
        
        // Add username above the marker
        const popup = L.popup({ offset: [0, -25] })
            .setLatLng([latitude, longitude])
            .setContent(`<b>${username}</b>`)
            .openOn(map);

        markers[id].bindPopup(popup).openPopup();

        usernames[id] = username;
        updateUsernameList();
    }
})

socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
        delete usernames[id];
        updateUsernameList();
    }
})

// Function to update username list in the separate div
function updateUsernameList() {
    usernameListDiv.innerHTML = "Connected Users:<br>";
    for (const id in usernames) {
        usernameListDiv.innerHTML += `<div>${usernames[id]}</div>`;
    }
}