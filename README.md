# 🌾 AgroSOS

<div align="center">
  <a href="https://github.com/Aiimaar/AgroSOS">
    <img src="frontend/src/components/header-image-only/logo.png" alt="AgroSOS Logo" width="200">
  </a>
  <h2 align="center">AgroSOS</h2>
  <p align="center">
    🌱 A comprehensive agricultural data management system<br />
    Empowering precision agriculture with technology.<br />
    <a href="#about-the-project"><strong>Explore the project »</strong></a>
  </p>
</div>

---

## 📖 About The Project

AgroSOS is designed to enhance agricultural productivity by managing data collected from sensors placed on agricultural fields. The system enables farmers, technicians, and administrators to collaborate effectively, using technology to monitor and optimize crop yields.

### Key Features

- 📊 **Data Visualization**: Graphs showcasing key indicators of crop health and field conditions.
- 🤖 **Automation**: Recommendations and actions based on sensor data to optimize crop performance.
- 🔒 **Role-Based Access**:
  - **Admin**: Manage users and system configurations.
  - **Farmers**: Control actuators, register fields, sensors, and crops, and access data specific to their fields.
  - **Technicians**: Configure rules for automated recommendations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠️ Technologies Used

- **Frontend**: ReactJS
- **Backend**: Node.js + Express
- **Database**: MySQL
- **ORM**: Sequelize

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 👥 Team Description

### Students and Roles
- **2nd DAW-Evening**: Development of the backend and frontend for the system.

### Coordination
- **Project Coordinator**: Miguel Ángel Figueroa García
- **Product Owner**: Miguel Ángel (responsible for clarifying project requirements).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🔄 Database Queries

This section includes the queries and database setup for the project.

### Database Setup

Before running the application, ensure you have the MySQL database set up correctly. You can use the following steps to configure the database:

1. **Create the database**:

   Log into MySQL and create the database for the project:

   ```sql
   CREATE DATABASE agrosos;
   ```
2. Query with the basic structure of the database.

```sql
   Query con la base de datos
   ```
---

## 🚀 How To Get Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Aiimaar/AgroSOS.git
2. Navigate to the project directory:
   ```bash
   cd AgroSOS/agrosos
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   cd backend && npm install
   ```
   ```bash
   cd ../frontend && npm install
   ```
4. Run the development server:
   ```bash
   cd backend && node express.js
   ```
5. Run the frontend
   ```bash
   cd frontend && npm run dev
   ```
---

## 📸 Screenshots

Here are some screenshots of the application:

![Screenshot](path/to/your/screenshot.png)

---

## 🤝 How to Contribute

Thank you for your interest in contributing to AgroSOS! Here are some guidelines to follow:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests to ensure everything works correctly
5. Commit your changes (`git commit -m 'Add my feature'`)
6. Push your branch (`git push origin feature/my-feature`)
7. Open a pull request

Before submitting your PR, make sure to follow these conventions:

- Use clear branch and commit message naming conventions.
- Keep the code clean and well-documented.
- If possible, add unit tests for your functionality.

---

## 🖥️ API Usage Guide

To interact with the API, make HTTP requests to the following endpoints:

- **GET /api/fields**: Get all registered fields.
- **POST /api/fields**: Create a new field.

---

## 📦 System Requirements

Make sure to have the following programs installed before getting started:

- **Node.js** (version >=14.x)
- **MySQL** (version >=5.7)
- **NPM** or **Yarn** (for managing dependencies)

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
