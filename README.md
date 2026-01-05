# CRUD Workout Creator with AUTH

- NOT FINAL README (WIP)

> Website URL
> https://mern-auth-app-hunt.onrender.com/

> Back_end
> This is a Express JS REST API for creating, reading, updating and deleting workouts that runs in Node JS Runtime.
> This project uses Mongo DB (NoSQL Database) for the Data DB and Upstash Redis for the RateLimiting middleware.

> Front_end
> React JS was used for the components along with Tailwind CSS with DaisyUI for easier CSS Class creation and manipulation.

> Hosting
> Render was used for the deployment and hosting of the Web App.

## 🔧 Features

- Create a workout
- Get all workouts (except for the deleted)
- Get a workout using their respective ID
- Update a workout's title and content
- Basic validation middlewares such as CORS and Upstash redis for Spam Protection.

---

## 🚀 Tech Stack

- Mongo DB
- Express JS
- React JS
- Node JS

## 📦 Installation

```bash
git clone https://github.com/JshMarkCastillo-GHdev/mern-notes-app.git
```

```bash
npm run build
```

```bash
npm run start
```

Server runs by default on: (Change depending on your machine)

```localhost
http://localhost:5001
```

## 📡 API Endpoints

- GET /workouts
- GET /workout/:id
- DELETE /workout/:id
- POST /notes body example:
  {
  "title": "My Note",
  "reps": "12",
  "load": "10"
  }

- PATCH /notes/:id body example:
  {
  "title": "My Note",
  "reps": "8",
  "load": "18"
  }
