# <img src="agrosos/Docs/Screenshots/logo2.png" alt="AgroSOS Logo" width="40"> AgroSOS

<div align="center">
  <a href="https://github.com/Aiimaar/AgroSOS">
    <img src="agrosos/Docs/Screenshots/logo.png" alt="AgroSOS Logo" width="200">
  </a>
  <h2>AgroSOS</h2>
  <p>
    🌱 A comprehensive agricultural data management system<br>
    Empowering precision agriculture with technology.
  </p>
  <p>
    <a href="https://github.com/Aiimaar/AgroSOS"><strong>Explore the project »</strong></a>
  </p>
</div>

<a name="readme-top"></a>

---

## 📖 About The Project

AgroSOS is designed to enhance agricultural productivity by managing data collected from sensors placed on agricultural fields. The system enables farmers, technicians, and administrators to collaborate effectively, using technology to monitor and optimize crop yields.

### Key Features

- 📊 **Data Visualization**: Graphs showcasing key indicators of crop health and field conditions.
- 🤖 **Automation**: Recommendations and actions based on sensor data to optimize crop performance.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🔐 Authentication and Roles

AgroSOS implements both basic and token-based authentication to ensure secure access. The roles used in the system are as follows:

- **Admin**: Manages users and configurations.
- **Farmers**: Registers and manages fields, sensors, and crops, while accessing their specific data.
- **Technicians**: Configures automated rules based on sensor data.

This structure emphasizes the distinction between authentication (verifying identity) and authorization (assigning permissions). For example, access to certain frontend routes is restricted based on authentication state, verified by checking tokens stored locally.

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

### 📑 Data Access and Relationships

AgroSOS ensures consistency between the database schema and its relationships through:

  <div style="display: flex; gap: 10px;">
    <img src="agrosos/Docs/Screenshots/class-diagram.png" alt="Class Diagram" width="400">
    <img src="agrosos/Docs/Screenshots/entidad-relacion.png" alt="Entity-Relationship Diagram" width="400">
    <img src="agrosos/Docs/Screenshots/useCase-diagram.png" alt="Use Case Diagram" width="300">
  </div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

## 📦 System Requirements

Make sure to have the following programs installed before getting started:

- **Node.js** (version = v20.18.0)
- **MySQL** (version = 8.0.38)
- **NPM** (version = 10.8.2)

---

## 📸 Screenshots

Here are some screenshots of the application:

<div style="display: flex; gap: 10px;">
  <img src="agrosos/Docs/Screenshots/cap1.png" alt="AgroSOS Logo" width="100">
  <img src="agrosos/Docs/Screenshots/cap2.png" alt="AgroSOS Logo" width="100">
  <img src="agrosos/Docs/Screenshots/cap4.png" alt="AgroSOS Logo" width="100">
  <img src="agrosos/Docs/Screenshots/cap3.png" alt="AgroSOS Logo" width="100">
</div>

---
### 🖥️ RESTful API and CRUD Operations

The project adheres to RESTful principles for communication between frontend and backend. API endpoints are documented and tested using Postman. Find the complete collection [here](https://documenter.getpostman.com/view/38432154/2sAYHwKQaD).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 📂 Directory Structure

#### Backend
The backend follows a modular structure:
- `controllers/`: Handles business logic.
- `middleware/`: Contains middleware functions for request processing.
- `models/`: Defines database models using Sequelize.
- `routes/`: Contains route definitions for API endpoints.
- `uploads/`: Directory for handling file uploads.
- `db.js`: Database connection configuration.
- `express.js`: Main server setup and configuration.

#### Frontend
The frontend is organized to separate concerns effectively:
- `public/`: Contains static assets
- `src/`:
  - `assets/`: Images, styles, and other assets.
  - `components/`: Reusable React components.
  - `context/`: React context for managing global state.
  - `pages/`: Defines the main pages for the application.
  - `App.jsx`: Main application component.
  - `main.jsx`: Entry point for the React app.
  - `index.css`: Global styles.

This structure ensures clarity, maintainability, and scalability for both backend and frontend development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🌐 System Design Comparison

The project adopts the **Enfoque 1** architecture, utilizing separate frontend and backend technologies. In contrast, **Enfoque 2** integrates server-side rendering tools like Laravel Blade. The decision to use Enfoque 1 enables:

- Enhanced scalability.
- Clearer separation of concerns.

Technologies:
- Backend: Node.js
- Frontend: ReactJS

An example comparison:

| Feature                | Enfoque 1 (AgroSOS)           | Enfoque 2                |
|------------------------|-------------------------------|--------------------------|
| Communication          | RESTful APIs                 | Server-side rendering    |
| Technologies           | Node.js, ReactJS             | Laravel Blade            |
| Flexibility            | High                         | Moderate                 |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📝 License

This project is licensed under the MIT License. See the [license](agrosos/License) file for more details.

---

## 🤝 How to Contribute

Thank you for considering contributing to AgroSOS! We appreciate your interest and help in improving the project. To ensure a smooth collaboration, please follow these guidelines:

### 📝 Steps to Contribute:

1. 🍴 **Fork the repository** to your own GitHub account.
2. 🔽 **Clone your forked repository** to your local machine.
3. 🌱 **Create a new branch** for your feature or fix:  
   `git checkout -b feature/my-feature`
4. ✨ **Make your changes** and ensure that the code is clean and well-documented.
5. 🧪 **Run tests** to verify that everything works correctly.
6. 💬 **Commit your changes** with a descriptive message:  
   `git commit -m 'Add my feature'`
7. 🚀 **Push your branch** to your forked repository:  
   `git push origin feature/my-feature`
8. 🔄 **Open a pull request** to the main repository.

### 📋 Guidelines for Pull Requests:

- 🏷️ **Use meaningful branch names** that clearly describe the purpose of the feature or fix.
- ✍️ **Write clear and concise commit messages** that explain the "what" and "why" of your changes.
- 💻 **Keep your code clean and readable**: Follow best practices and ensure your code is properly formatted.
- 🧪 **Add unit tests**: Whenever possible, include tests that validate your changes.
- ✅ **Ensure your changes don't break existing functionality**: Run all tests and check that everything is working as expected.

We review all contributions and may suggest changes or improvements before merging. Thank you for helping to make AgroSOS better! 🙌

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 👥 Team

Meet the talented individuals behind **AgroSOS**:

### 👨‍💻 **Víctor**
   - **Role:** Full Stack Developer
   - **Description:** Víctor is a dedicated Full Stack Developer with a focus on building responsive and visually appealing user interfaces. She is highly skilled in React and other modern JavaScript technologies. He is passionate about creating intuitive solutions and ensuring the best possible user experience for AgroSOS users. Her work bridges the gap between design and functionality.
   - 🌍 **Location:** Las Palmas de Gran Canaria, Spain
   - 🐙 **GitHub:** [Víctor GitHub](https://github.com/Vitolofs7)

---

### 👨‍💻 **Aimar**
   - **Role:** Full Stack Developer
   - **Description:** Aimar is a versatile Full Stack Developer who is passionate about both frontend and backend technologies. With extensive knowledge of JavaScript, Node.js, and databases, he plays a key role in ensuring seamless integration between the user interface and backend systems for AgroSOS. He is also passionate about improving performance and optimizing user experience.
   - 🌍 **Location:** Las Palmas de Gran Canaria, Spain
   - 🐙 **GitHub:** [Aimar GitHub](https://github.com/Aiimaar)

---

### 👨‍💻 **Bob Dylan**
   - **Role:** Full Stack Developer
   - **Description:** simply bob dylan
   - 🌍 **Location:** Las Palmas de Gran Canaria, Spain
   - 🐙 **GitHub:** [Bob Dylan GitHub](https://github.com/Deathvks)

---
