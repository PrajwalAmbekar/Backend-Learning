# 🔁 HTTP Request Lifecycle (Node.js + Express.js)

## 🧠 Big Picture
A client request goes through DNS and OS networking, reaches Node.js, then Express processes it and sends a response.

---

## ⚙️ Node.js Request Lifecycle (Low Level)

### 🔁 Horizontal Flowchart

```mermaid
flowchart LR
    A[Client<br/>Browser / App] --> 
    B[DNS<br/>Domain → IP] --> 
    C[Operating System<br/>Port & Network Stack] --> 
    D[TCP Connection] --> 
    E[Node.js<br/>HTTP Server] --> 
    F[Raw HTTP Request]

    style A fill:#EAF3FF,stroke:#1E3A8A,color:#000
    style B fill:#FFF7ED,stroke:#9A3412,color:#000
    style C fill:#F0FDF4,stroke:#166534,color:#000
    style D fill:#F8FAFC,stroke:#334155,color:#000
    style E fill:#ECFEFF,stroke:#155E75,color:#000
    style F fill:#FEFCE8,stroke:#854D0E,color:#000
```

### 🧠 Mind Map (Sequential & Clean)

```mermaid
mindmap
  root((HTTP Request))
    Client
      Browser
      Mobile App
    DNS
      Resolve Domain
      Return IP
    OS
      Port Binding
      Network Stack
    TCP
      Connection
    Node.js
      HTTP Server
      Event Loop
```

### 📝 What Is Happening (Simple Explanation)

- User enters a URL in browser
- DNS converts domain name into IP address
- OS receives network data on a specific port
- TCP establishes a reliable connection
- Node.js HTTP server receives raw HTTP data

---

## 🚀 Express.js Request Lifecycle (High Level)

### 🔁 Horizontal Flowchart

```mermaid
flowchart LR
    A[Raw HTTP Request] --> 
    B[Express App] --> 
    C[Middleware Chain] --> 
    D[Controller Logic] --> 
    E[Database / Service] --> 
    F[HTTP Response]

    style A fill:#FEFCE8,stroke:#854D0E,color:#000
    style B fill:#F5F3FF,stroke:#5B21B6,color:#000
    style C fill:#EFF6FF,stroke:#1D4ED8,color:#000
    style D fill:#ECFEFF,stroke:#155E75,color:#000
    style E fill:#F0FDF4,stroke:#166534,color:#000
    style F fill:#EAF3FF,stroke:#1E3A8A,color:#000
```

### 🧠 Mind Map (Ordered, Not Random)

```mermaid
mindmap
  root((Express Flow))
    Express App
      app.listen
    Request Object
      params
      query
      body
    Middleware
      Auth
      Validation
    Controller
      Business Logic
    Response
      Status Code
      JSON
```

### 📝 What Is Happening (Simple Explanation)

- Node.js forwards request to Express
- Express creates `req` and `res` objects
- Middleware checks or modifies request
- Controller executes business logic
- Data is fetched or processed
- Response is sent back to client

---

## 🧪 One Simple Example

User hits: `GET /api/users/123`

- Browser sends request
- DNS resolves domain
- Node.js receives HTTP request
- Express middleware validates user
- Controller fetches user from DB
- JSON response is returned
