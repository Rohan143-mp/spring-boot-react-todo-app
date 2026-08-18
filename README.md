# Todo App — Spring Boot + React

A minimal full-stack project: a Java Spring Boot REST API backend and a React (Vite) frontend.

## Structure

```
project/
├── backend/     # Spring Boot REST API (Java 17, Maven, H2 in-memory DB)
└── frontend/    # React app (Vite, plain fetch calls, no extra libraries)
```

## Prerequisites

- Java 17+ and Maven (or use the included `mvnw` wrapper if you add one)
- Node.js 18+ and npm

## Running the backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Endpoints:

| Method | URL              | Description       |
|--------|------------------|--------------------|
| GET    | /api/todos       | List all todos     |
| GET    | /api/todos/{id}  | Get one todo       |
| POST   | /api/todos       | Create a todo      |
| PUT    | /api/todos/{id}  | Update a todo      |
| DELETE | /api/todos/{id}  | Delete a todo      |

H2 console (dev only): http://localhost:8080/h2-console
JDBC URL: `jdbc:h2:mem:tododb`, user `sa`, empty password.

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** and talks to the backend at `http://localhost:8080`.

## Notes

- CORS is pre-configured on the backend to allow `http://localhost:5173`.
- Data is stored in-memory (H2) and resets every time the backend restarts. Swap in MySQL/Postgres by changing the datasource properties in `backend/src/main/resources/application.properties`.
- To build the frontend for production: `npm run build` (output in `frontend/dist`).
"# spring-boot-react-todo-app" 
