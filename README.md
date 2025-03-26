## Car Rental Application - README

---

### Introduction
The Car Rental App is a full-stack enterprise solution designed to streamline the process of renting vehicles. It allows users to browse a fleet of cars, make bookings, and manage their rentals, while administrators can manage inventory and oversee bookings. The system is built with scalability, performance, and security in mind.

---

### Project Aim & Objectives

**Main Goal**  
To deliver a scalable and secure enterprise-grade car rental system that facilitates vehicle reservations, rental tracking, and admin management.

**Key Objectives**
- Implement secure user authentication and role-based access.
- Enable CRUD operations for vehicles, bookings, and users.
- Ensure scalable architecture using a three-tier structure.
- Deploy the application with secure and efficient configurations.
- Optimize performance and follow enterprise-grade coding practices.

---

### Solution Overview
This system follows a **three-layer architecture**:

1. **Frontend** – Built in React, providing users and admins with intuitive interfaces and deployed using render.
2. **Middleware/API** – .NET Core Web API for business logic and data access deployed using azure.
3. **Backend** – SQL Server database deployed on azure.

---

### Enterprise Considerations

#### Security
- JWT-based user authentication.
- Passwords hashed using industry-standard cryptographic algorithms.
- Role-based access control (admin vs customer).
- Input validation on both frontend and backend.
- Secure HTTP headers and CORS configuration.

#### Scalability
- Modular folder structure for features and components.
- Stateless API design for future scalability with microservices.
- Separation of concerns through layered architecture.
- Easily extensible database schema and services.

#### Performance
- Eager loading and pagination to prevent over-fetching.
- Optimized LINQ queries and database indexing.
- React memoization (`React.memo`, `useMemo`) and code splitting for faster rendering.

#### Robustness
- Global error-handling middleware in the API.
- Form validation and optimistic UI on the frontend.
- Try-catch blocks and logging for runtime resilience.

---

### Deployment

**Frontend** – Deployed using [e.g., Render, React]  
**Backend** – Deployed on [e.g., Azure, .net]  
**Database** – SQL Server hosted on [e.g., Azure SQL]

**Security Best Practices**
- Environment variables are used for sensitive credentials.
- HTTPS enforced in production.
- CORS is restricted to verified domains.

---

### Installation & Setup

#### Prerequisites
- [.NET SDK 6.0+](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server)

#### Clone & Setup
```bash
git clone https://github.com/Baaizeed-Ahmed/car-rental-repo.git
cd car-rental-repo
```

#### Backend Setup
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

> Configure `.env` files in both frontend and backend with appropriate values.

---

### Feature Overview

| Feature              | Description                                                  | Code Location |
|----------------------|--------------------------------------------------------------|---------------|
| **User Auth**        | Sign up, login, JWT token auth, and role-based access        | `/backend/Controllers/AuthController.cs`, `/frontend/pages/Login.jsx` |
| **Car Listings**     | View available cars with filtering options                   | `/backend/Controllers/CarsController.cs`, `/frontend/pages/Home.jsx` |
| **Bookings**         | Book, view, and cancel car rentals                           | `/backend/Controllers/BookingsController.cs`, `/frontend/pages/MyRentals.jsx` |
| **Admin Panel**      | Manage users, cars, and bookings                             | `/frontend/pages/AdminDashboard.jsx` |
| **Responsive UI**    | Fully mobile-friendly with clean navigation and user flows   | `/frontend/components/` |
| **API Layer**        | RESTful APIs with data validation, models, and services      | `/backend/Services/`, `/backend/Models/` |

---

### Known Issues & Future Enhancements

- 📉 No real-time availability check (could be improved with WebSockets).
- 📋 Admin analytics dashboard is in progress.
- 📲 Plan to create a mobile-friendly PWA version.
- 🛂 Add social login support (Google, GitHub).

---

### References

- React + Vite official docs  
- .NET Core & EF Core documentation  
- JWT.io for auth strategy  
- Microsoft SQL Docs  
- Tailwind CSS


### Kanban
-within this Kanban board you should find defined backlog with story-points and a estimation of how difficult it was using fibinacy numbers
[Link to Kanban Board](https://github.com/users/Baaizeed-Ahmed/projects/1/views/1)

### UML Diagrams
![UML Diagram](https://private-user-images.githubusercontent.com/115352840/312294664-29fcc3a5-0185-4c73-b27d-6b6b028429bb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTkwMjQsIm5iZiI6MTcxMDI5ODcyNCwicGF0aCI6Ii8xMTUzNTI4NDAvMzEyMjk0NjY0LTI5ZmNjM2E1LTAxODUtNGM3My1iMjdkLTZiNmIwMjg0MjliYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxM1QwMjU4NDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yMWRhM2Q0NjhkMmI0ZmFiNDNhZThjNjc5ZTU0NjUxNzY3MmNhNTg0ODU4NzY4NDc2ODhiYmZiZGI3NzM2ZDBmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.5dbvtxJETsp2r_5OblHXDu9ruC1kA8ABz6_xKmNCL00)
activity diagram
![UML Diagram](https://private-user-images.githubusercontent.com/115352840/312294191-ce5b39ad-cd7f-42b6-98ac-9c81336dd12d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTkxMjEsIm5iZiI6MTcxMDI5ODgyMSwicGF0aCI6Ii8xMTUzNTI4NDAvMzEyMjk0MTkxLWNlNWIzOWFkLWNkN2YtNDJiNi05OGFjLTljODEzMzZkZDEyZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxM1QwMzAwMjFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01NWExODVhMzQzYTU5OTk5ZTFhYTg2YmYwODMzYTBmMDRlNzVjODM4NTljZDQ1M2FhNjZkZGY3NmEwNDc4NzkzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.rJfYtgai18nEVMctLgnV3Ge-wl0ukGDs8C60uWBkRzU) Sequence Diagram
![UML Diagram](https://private-user-images.githubusercontent.com/115352840/312294303-1d4a17f2-a982-4ef3-96aa-cbe09d28b4a7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTkyMDIsIm5iZiI6MTcxMDI5ODkwMiwicGF0aCI6Ii8xMTUzNTI4NDAvMzEyMjk0MzAzLTFkNGExN2YyLWE5ODItNGVmMy05NmFhLWNiZTA5ZDI4YjRhNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxM1QwMzAxNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mMzBlNjMxN2IwNzIyODkzZTQ2NjIwNmVlODI4OWIxYThkN2M0ZGEwODQyYTczYzNiZWQ0YzM5OWM0MDg1NTM2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.GTmI-FtNdPy73eZHTBKPZOv3ReUBVLchDwoYjEoOvcg)backend class diagram
![UML Diagram](https://private-user-images.githubusercontent.com/115352840/312294395-70640791-e2de-40f3-b01b-42708c7d62c1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTkyMDIsIm5iZiI6MTcxMDI5ODkwMiwicGF0aCI6Ii8xMTUzNTI4NDAvMzEyMjk0Mzk1LTcwNjQwNzkxLWUyZGUtNDBmMy1iMDFiLTQyNzA4YzdkNjJjMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxM1QwMzAxNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNzA4ZmMxNzAxMDU3YTA3Njk3MDgwZWI3NDdkMWQ2MjYzZTc2Nzc1NDExOTQ0NWJhNmNiZGNhZjU1NmYxNzIyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.hetYq_kcb5rmubVigMsptlHMPRcNHPpzEqnbZdIlyzo)frontend class diagram
![UML Diagram](https://private-user-images.githubusercontent.com/115352840/312294009-dc6438f1-eaef-43e9-af86-2d59f7fca9c9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTkyOTAsIm5iZiI6MTcxMDI5ODk5MCwicGF0aCI6Ii8xMTUzNTI4NDAvMzEyMjk0MDA5LWRjNjQzOGYxLWVhZWYtNDNlOS1hZjg2LTJkNTlmN2ZjYTljOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxM1QwMzAzMTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mNThhNDJjNzk3YmNiNjBjODQ4MDk4NzYxM2U4MjgwZWNiMTJiNjAwOTliYmU0NWFlMmQ5OTU1MGU5N2ZhZWY3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.LVrYKa-q4xlBAVDx1L1ZKO-bGILr8glzOnyVrfnGvp8)use case diagram
