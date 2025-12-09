# Todo Full-Stack Application

## Tech Stack
- Frontend: Angular
- Backend: ASP.NET Core Web API (.NET)
- Database: MySQL (Docker)
- ORM: Entity Framework Core

## Features
- Create a task with title and description
- View latest 5 incomplete tasks
- Mark tasks as completed
- RESTful API + SPA

## How to Run

### Backend
- cd backend/Todo.Api
- dotnet restore
- dotnet ef database update
- dotnet run

API runs on: http://localhost:5292

###Frontend
- cd todo-frontend
- npm install
- ng serve
  
App runs on: http://localhost:4200

###Database
- MySQL runs via Docker:

  docker-compose up -d

  App runs on: http://localhost:8081
