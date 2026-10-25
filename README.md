# 📍 Real-Time Location Tracker

A lightweight, real-time device and user location tracking web application. Built with **Node.js**, **Express**, **Socket.IO**, and **Leaflet.js**, it streams device geolocation coordinates via WebSockets and visualizes all connected users live on an interactive OpenStreetMap.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Render-brightgreen?style=flat-square)](https://live-locator.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

---

## 🌐 Live Demo

Experience the app live: **[https://live-locator.onrender.com/](https://live-locator.onrender.com/)**

---

## ✨ Features

- **Live Geolocation Tracking**: Uses the browser's HTML5 `navigator.geolocation.watchPosition` API with high-accuracy GPS tracking.
- **Bi-Directional WebSocket Communication**: Low-latency, real-time coordinate streaming across all connected clients via **Socket.IO**.
- **Interactive OpenStreetMap Integration**: Smooth mapping, panning, zooming, and marker animations powered by **Leaflet.js**.
- **User Identification**: Assigns unique markers to individual users with custom popups displaying their entered username.
- **Live User Dashboard**: Displays dynamic online user count and a live list of active users overlaying the map.
- **Auto-Cleanup on Disconnect**: Instantly removes markers and updates user counts when a client disconnects.
- **Responsive Fullscreen Design**: Adapts cleanly across mobile and desktop displays.

---

## 🛠️ Tech Stack

### Backend
- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)**: Minimalist web application framework.
- **[Socket.IO](https://socket.io/)**: Real-time bi-directional event-based communication engine.
- **[EJS](https://ejs.co/)**: Embedded JavaScript templating engine.

### Frontend
- **[Leaflet.js](https://leafletjs.com/)**: Open-source JavaScript library for mobile-friendly interactive maps.
- **[OpenStreetMap](https://www.openstreetmap.org/)**: Map tile provider.
- **HTML5 Geolocation API**: Device position tracking.
- **CSS3**: Fullscreen layout with floating control overlays.

---

## 🏗️ Architecture & Data Flow

```text
[ User Browser ] 
       │ 
       ├─ (1) Enters Username & requests Geolocation permissions
       ├─ (2) watchPosition() captures (latitude, longitude)
       │
       ▼  Socket.IO Emit: 'send-location' { username, latitude, longitude }
[ Express + Socket.IO Server ]
       │
       ├─ (3) Stores active socket ID and username
       ├─ (4) Broadcasts to all connected clients
       │
       ▼  Socket.IO Broadcast: 'recieve-location' & 'update-user-count'
[ All Connected Browsers ]
       │
       └─ (5) Leaflet.js updates/places marker with popup and updates user list
```

---

## 📁 Project Structure

```text
location-tracker/
├── public/
│   ├── css/
│   │   └── style.css         # Fullscreen map layout and floating HUD overlays
│   └── js/
│       └── script.js        # Geolocation polling, Leaflet map setup & client socket events
├── views/
│   └── index.ejs            # Main entry template with CDN scripts and map container
├── .gitignore               # Ignored files (node_modules, etc.)
├── app.js                   # Express server and Socket.IO WebSocket handlers
├── package.json             # App dependencies and metadata
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and `npm` installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/karanrathour619/location-tracker.git
   cd location-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   node app.js
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

> [!NOTE]
> When prompted by your browser, make sure to **allow location access**. For best testing results, open the URL in multiple browser windows or across different devices connected to the same network.

---

## 🔌 Socket.IO Event Reference

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `send-location` | Client ➔ Server | `{ username, latitude, longitude }` | Sent continuously by device when position changes |
| `recieve-location` | Server ➔ Client | `{ id, username, latitude, longitude }` | Broadcast to all clients to render/update markers |
| `update-user-count` | Server ➔ Client | `Number` (count) | Broadcast to update online user count badge |
| `user-disconnected` | Server ➔ Client | `socket.id` | Broadcast to clean up marker when user disconnects |

---

## 🔒 Permissions & Browser Notes

- **HTTPS Requirement**: Modern browsers restrict the HTML5 Geolocation API (`navigator.geolocation`) to secure origins (`https://` or `localhost`).
- **Accuracy**: Positioning accuracy depends on the user's hardware (GPS, Wi-Fi triangulation, or IP geolocation).

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.
