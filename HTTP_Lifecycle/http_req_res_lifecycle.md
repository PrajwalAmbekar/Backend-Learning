# 🔁 How a Server Handles an HTTP Request (Node.js + Express.js)

## 🧠 Big Picture (1 line)
A client request travels through DNS → OS → Node.js HTTP server → Express middleware → route logic → response back to client.

---

## ⚙️ Node.js Request Lifecycle (Low-Level)

### 🔁 Flowchart
```mermaid
flowchart TD
    A[🌐 Client Browser] --> B[📡 DNS Resolution]
    B --> C[🖥️ Operating System]
    C --> D[🔌 TCP Connection]
    D --> E[⚙️ Node.js HTTP Server]
    E --> F[📄 Raw HTTP Request]
```

### 🧠 Mind Map
```mermaid
mindmap
  root((Node.js HTTP Flow))
    Client
      Browser
      Mobile App
    DNS
      Domain
      IP Address
    OS
      Port Binding
      Network Stack
    TCP
      Connection
    Node.js
      http.createServer
      Event Loop
```

### 🔍 Step-by-Step Flow
<details>
<summary>Click to expand</summary>

1. User enters `example.com`
2. DNS resolves domain → IP address
3. OS receives request on port `443`
4. TCP connection is established
5. Node.js HTTP server receives raw HTTP data

</details>

### 🧪 Example
<details>
<summary>Click to expand</summary>

Browser → `GET /api/users/123`  
DNS → returns IP  
OS → routes to port 443  
Node.js → receives raw HTTP request

</details>

### 💡 Why + Common Mistakes
<details>
<summary>Click to expand</summary>

**Why**
- Node.js efficiently handles many connections using event-driven architecture.

**Common Mistakes**
- Blocking the event loop
- Thinking Node handles DNS
- Mixing OS and Node responsibilities

</details>

---

## 🚀 Express.js Request Lifecycle (High-Level)

### 🔁 Flowchart
```mermaid
flowchart TD
    A[📄 Raw HTTP Request] --> B[⚙️ Node HTTP Server]
    B --> C[🧱 Express App]
    C --> D[🧩 Middleware Chain]
    D --> E[🎯 Route Handler]
    E --> F[📦 DB / Service Logic]
    F --> G[📤 HTTP Response]
```

### 🧠 Mind Map
```mermaid
mindmap
  root((Express Flow))
    Express App
    Middleware
      Auth
      Logger
      Validator
    Request Object
      params
      query
      body
    Response Object
      status
      json
```

### 🔍 Step-by-Step Flow
<details>
<summary>Click to expand</summary>

1. Node passes request to Express
2. Express creates `req` and `res`
3. Middleware runs sequentially
4. Route handler executes
5. Response is sent using `res.send()`

</details>

### 🧪 Example
<details>
<summary>Click to expand</summary>

Request → `/api/users/123`  
Auth middleware validates user  
Controller fetches data  
Express sends JSON response

</details>

### 💡 Why + Common Mistakes
<details>
<summary>Click to expand</summary>

**Why**
- Express simplifies HTTP handling and structure.

**Common Mistakes**
- Forgetting `next()`
- Sending response twice
- Wrong middleware order

</details>
