# <img src="agrosos/Docs/Screenshots/logo2.png" alt="AgroSOS Logo" width="40"> AgroSOS
<a name="readme-top"></a>
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
    -- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: agrosos
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actuators`
--

DROP TABLE IF EXISTS `actuators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actuators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `plot_id` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actuators_ibfk_1` (`plot_id`),
  CONSTRAINT `actuators_ibfk_1` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actuators`
--

LOCK TABLES `actuators` WRITE;
/*!40000 ALTER TABLE `actuators` DISABLE KEYS */;
/*!40000 ALTER TABLE `actuators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admins_ibfk_1` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,1),(2,127);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crops`
--

DROP TABLE IF EXISTS `crops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `graphic_image` varchar(255) DEFAULT NULL,
  `crop_image` varchar(255) DEFAULT NULL,
  `info` longtext,
  `start_month` varchar(45) DEFAULT NULL,
  `end_month` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crops`
--

LOCK TABLES `crops` WRITE;
/*!40000 ALTER TABLE `crops` DISABLE KEYS */;
INSERT INTO `crops` VALUES (1,'zanahoria',NULL,'zanahoria.png','','Julio','Ago'),(2,'platano',NULL,'platano.png','','Enero','Diciembre'),(3,'papa',NULL,'papa.png','','Marzo','Junio'),(4,'ajo',NULL,'ajo.png','','Junio','Julio'),(5,'EGFWG','1733855234316-568757681-tiochill.jpg','1733855234316-765937037-tiochill.jpg','RGAAAAAAAA','Enero','Noviembre');
/*!40000 ALTER TABLE `crops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `farmers_ibfk_1` (`user_id`),
  CONSTRAINT `farmers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmers`
--

LOCK TABLES `farmers` WRITE;
/*!40000 ALTER TABLE `farmers` DISABLE KEYS */;
INSERT INTO `farmers` VALUES (1,2),(2,4),(3,88),(4,90),(5,92),(7,94),(8,112),(9,114),(10,115),(11,120),(12,121),(13,123),(17,126),(20,129),(21,130);
/*!40000 ALTER TABLE `farmers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `irrigationschedules`
--

DROP TABLE IF EXISTS `irrigationschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `irrigationschedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plotId` int NOT NULL,
  `days` json NOT NULL,
  `time` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `irrigationschedules_ibfk_1` (`plotId`),
  CONSTRAINT `irrigationschedules_ibfk_1` FOREIGN KEY (`plotId`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `irrigationschedules`
--

LOCK TABLES `irrigationschedules` WRITE;
/*!40000 ALTER TABLE `irrigationschedules` DISABLE KEYS */;
INSERT INTO `irrigationschedules` VALUES (2,64,'\"[\\\"Monday\\\",\\\"Saturday\\\",\\\"Thursday\\\"]\"','12:00:00','2024-12-10 17:27:57','2024-12-10 17:27:57'),(3,64,'\"[\\\"Tuesday\\\",\\\"Saturday\\\",\\\"Thursday\\\"]\"','22:00:00','2024-12-11 16:51:52','2024-12-11 16:51:52');
/*!40000 ALTER TABLE `irrigationschedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plots`
--

DROP TABLE IF EXISTS `plots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `size` float DEFAULT NULL,
  `image` text,
  `crop_id` int DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `default_image` varchar(45) DEFAULT NULL,
  `farmer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plots_fbk_1_idx` (`crop_id`),
  KEY `user_fbk_1_idx` (`farmer_id`),
  CONSTRAINT `plots_fbk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`),
  CONSTRAINT `user_fbk_1` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plots`
--

LOCK TABLES `plots` WRITE;
/*!40000 ALTER TABLE `plots` DISABLE KEYS */;
INSERT INTO `plots` VALUES (64,'Postman',-50,NULL,1,'#a31f1f',NULL,93),(66,'Chano',2103,NULL,NULL,NULL,'X',93),(67,'Papas',234,NULL,1,NULL,'X',127),(68,'Chano',234,NULL,NULL,NULL,'X',114),(69,'G3',42,NULL,3,'#a80000',NULL,127),(70,'hffsghs',-3455,'1734017241667-Informe_Cambios_Aimar.pdf',NULL,NULL,NULL,93);
/*!40000 ALTER TABLE `plots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rules`
--

DROP TABLE IF EXISTS `rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `crop_id` int DEFAULT NULL,
  `technician_id` int NOT NULL,
  `rule_info` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `technician_fbk_1_idx` (`technician_id`),
  KEY `crop_fbk_1_idx` (`crop_id`),
  CONSTRAINT `crop_fbk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`),
  CONSTRAINT `technician_fbk_1` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
INSERT INTO `rules` VALUES (23,'Regla 1 Cultivo',1,93,'\"{\\\"AND\\\":[{\\\"conditions\\\":[{\\\"type\\\":\\\"humidity\\\",\\\"value\\\":8,\\\"operator\\\":\\\"=\\\"},{\\\"type\\\":\\\"humidity\\\",\\\"value\\\":40,\\\"operator\\\":\\\"=\\\"}],\\\"actions\\\":[\\\"Activar Riego\\\"],\\\"sensors\\\":[{\\\"type\\\":\\\"Humedad\\\"}],\\\"actuators\\\":[{\\\"type\\\":\\\"Riego\\\"}]}]}\"'),(30,'Regla 1 Cultivo',3,93,'\"{\\\"AND\\\":[{\\\"conditions\\\":[{\\\"type\\\":\\\"temperature\\\",\\\"value\\\":\\\"16\\\",\\\"operator\\\":\\\">\\\"},{\\\"type\\\":\\\"temperature\\\",\\\"value\\\":23,\\\"operator\\\":\\\"<\\\"}],\\\"actions\\\":[\\\"Cubrir cultivos con lona semi-transparente\\\"],\\\"sensors\\\":[{\\\"type\\\":\\\"Temperatura\\\"}],\\\"actuators\\\":[{\\\"type\\\":\\\"Riego\\\"}]}]}\"');
/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_value`
--

DROP TABLE IF EXISTS `sensor_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_value` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sensor_id` int NOT NULL,
  `value` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sensor_fbk_1_idx` (`sensor_id`),
  CONSTRAINT `sensor_fbk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_value`
--

LOCK TABLES `sensor_value` WRITE;
/*!40000 ALTER TABLE `sensor_value` DISABLE KEYS */;
INSERT INTO `sensor_value` VALUES (172,37,66.13,'2024-12-12 00:00:00'),(173,36,34.54,'2024-12-12 00:00:00'),(174,35,74.31,'2024-12-12 00:00:00'),(175,34,67.91,'2024-12-12 00:00:00'),(176,37,16.63,'2024-12-12 08:00:00'),(177,36,79.42,'2024-12-12 08:00:00'),(178,35,47.22,'2024-12-12 08:00:00'),(179,34,97.82,'2024-12-12 08:00:00'),(180,37,47.44,'2024-12-12 16:00:00'),(181,36,43.75,'2024-12-12 16:00:00'),(182,35,76.44,'2024-12-12 16:00:00'),(183,34,50.95,'2024-12-12 16:00:00'),(184,37,25.41,'2024-12-12 23:00:00'),(185,36,74.19,'2024-12-12 23:00:00'),(186,35,94.75,'2024-12-12 23:00:00'),(187,34,51.17,'2024-12-12 23:00:00'),(203,34,38,'2024-12-12 04:00:00'),(204,34,11,'2024-12-12 12:00:00'),(205,34,12,'2024-12-12 20:00:00'),(206,36,33,'2024-12-12 04:00:00'),(207,36,76,'2024-12-12 12:00:00'),(208,36,21,'2024-12-12 20:00:00');
/*!40000 ALTER TABLE `sensor_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `plot_id` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sensors_ibfk_1` (`plot_id`),
  CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (34,'temperature',69,'20241211'),(35,'soil_temperature',69,'4234234'),(36,'humidity',69,'77'),(37,'soil_humidity',69,'123213');
/*!40000 ALTER TABLE `sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technicians`
--

DROP TABLE IF EXISTS `technicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technicians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `technicians_ibfk_1` (`user_id`),
  CONSTRAINT `technicians_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technicians`
--

LOCK TABLES `technicians` WRITE;
/*!40000 ALTER TABLE `technicians` DISABLE KEYS */;
INSERT INTO `technicians` VALUES (1,3),(2,93);
/*!40000 ALTER TABLE `technicians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `role` enum('Admin','Farmer','Technician') NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alice Smith','Admin','alice.smith@example.com','$2y$10$e1.S3BHQnpZzz2.HF1G9/Oh5E9AaBxdIWZZh0BzA1KmlVJ0R1JTP2',NULL),(2,'Bob Johnson','Farmer','bob.johnson@example.com','$2y$10$e1.S3BHQnpZzz2.HF1G9/Oh5E9AaBxdIWZZh0BzA1KmlVJ0R1JTP3',NULL),(3,'Charlie Brown','Technician','charlie.brown@example.com','$2y$10$e1.S3BHQnpZzz2.HF1G9/Oh5E9AaBxdIWZZh0BzA1KmlVJ0R1JTP4',NULL),(4,'Diana Prince','Farmer','diana.prince@example.com','$2y$10$e1.S3BHQnpZzz2.HF1G9/Oh5E9AaBxdIWZZh0BzA1KmlVJ0R1JTP5',NULL),(88,'Jose Juan','Farmer','josejuan@gmail.com','$2b$10$1rKGIfXoE8cT655dszP3UuuWdLY/ibIJhenXfKH5RPSVqsNa6bxEi','1732132049535-bp.jpg'),(90,'Juan','Farmer','juan@juan','$2b$10$.yoOdC8luC5muguNOJ11eeoGQh7dzo/SHBj9PmRWzpfVad8DZvK/e',NULL),(92,'Jose','Farmer','jose@gmail.com','$2b$10$xg7oaYlKOBo8akv2aeAvz.6UJyy5YhyuCM2GcYtfEm/cE0Jj2ZP5i',NULL),(93,'pepe','Technician','pepe@gmail.com','$2b$10$8dRquNOy2vDjgTVk2/9csuPq6G1eKsLb3Qg2aE3wTNm64TKkY4zq6','1733848140173-platano.png'),(94,'Martin','Farmer','martin@martin.com','$2b$10$q22opWcU1ab5yMbKwr.TeOXwPmepB.I9rEaopXmbbHQfbJzbEstD6',NULL),(112,'Juan','Farmer','juan@juan.com','$2b$10$ka0WZOiZjqFcyvWobH17RO3ZZup7V10mHRsgsfI./VCZF61jktqWq','1733848095945-ajo.png'),(114,'Jose','Farmer','jose@jose','$2b$10$dQIAgLwgijlm2Juqt15uZuaQGAbiBL2ND9.8DohaaJfrQUFEgNQFe',NULL),(115,'Julian','Farmer','julian@julian','$2b$10$Pf7I4JZ/YxwWoPOUE1ZmGes2sPUzs46IeLc.TGM6vhCkEB7sdr23e',NULL),(120,'Wilmer','Farmer','wilmerzeasrodriguez@gmail.com','$2b$10$OmpQb3/fxkjWvxpiP0pwkOfdxw/q.uX1HTMUq4lh9Cqw9flFqI5q.','1734016133576-monkey.jpg'),(121,'Tiburcio','Farmer','tiburcio@tiburcio.com','$2b$10$h1kJO2JeAVv.xlv39LYUK.sGT8nSXThLFluLBTbx6xALf7d7ZyAnq',NULL),(123,'Miguel Ángel ','Farmer','miguelangelfigueroa@ieselrincon.es','$2b$10$3lAiIsU9ok9OxaY3/0iUSukVbY4DfyBod4UOw/3QBWJWSFuxpFoc6','1732206138614-bp.jpg'),(126,'Miguel ángel','Farmer','mfiggar@canariaseducacion.es','$2b$10$aTVMoCtUkN3exlcp5bWheuydXm6MXfzeZiphe8VQuokKgrhR2UlT.',NULL),(127,'Chano','Admin','chano@chano','$2b$10$RdKIL3Y9J7G7L8jlWASZh.fOKYKTCyN9H6/74VGVZTiF0GPKXJZ5y','1732813711313-bp.jpg'),(129,'Pepe Juan','Farmer','pepejuan@gmail.com','$2b$10$G/hlYC8SQg8GsVJM4XfmiOKmW1bnE.gKSOmV.HLEF38GF/EQ50IHi',NULL),(130,'Paco Jose','Farmer','pacojose@gmail.com','$2b$10$NjvRb0f0DeU/ckiIIgGBUeXq786a8UKK/D9W2agkLfVQVEZ0Bh2la',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 17:42:29

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

# 🚀 Approach 2

In this project, we have integrated various technologies and tools to create an efficient, scalable, and modern application. Here’s a summary of what we used:

## 🛠️ Tools & Technologies

### 🐳 Docker Deployment

To facilitate deployment and ensure a consistent environment, we use Docker. 
Follow these steps to run the application with Docker:

- Make sure you have Docker installed on your machine.
   
- Build and run the containers with the following command:
  ```bash
  docker-compose up --build -d
  ```
- Access the application in your browser at http://localhost:3000.

  If you need to stop containers, use:
  ```bash
  docker-compose down -d o -b
  ```
  <p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🌐 **Views with EJS**
We use **EJS** for dynamic frontend views. This templating engine allows us to embed data directly into HTML in a simple and flexible way, enhancing the user experience.

### 🧪 **Testing in Frontend & Backend**

- **Vitest** 🔬: We use **Vitest** for unit and integration testing in the frontend, ensuring everything works as expected in a fast and efficient manner.  

- **Supertest** ✅: In the backend, we use **Supertest** to perform functional testing on our APIs, guaranteeing correct responses and expected system behavior.

### ✨ **Animations**
We added a visual touch to the application with **animations** in different parts of the UI. Technologies like **CSS Animations** and **JavaScript** help make the experience more engaging and dynamic.

### 🔗 **Websockets**
With **Websockets**, we establish real-time communication between the client and the server. This enables instant updates and smoother interactions, such as live chats or real-time status updates.

### 📲 **Web-Push Notifications**
We implemented **push notifications** to keep users informed even when they are not actively using the app. This ensures they receive important updates instantly.

### 🗃️ **Seeders & Migrations**
We manage the database using **Seeders** and **Migrations**, which help keep the database structure organized and easily updatable as the project evolves. This is crucial for handling test data and maintaining a well-structured system.

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
   - **Description:** Víctor is a dedicated Full Stack Developer with a focus on building responsive and visually appealing user interfaces. He is highly skilled in React and other modern JavaScript technologies. He is passionate about creating intuitive solutions and ensuring the best possible user experience for AgroSOS users. Her work bridges the gap between design and functionality.
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
   - **Description:** without further ado, bob dylan
   - 🌍 **Location:** Las Palmas de Gran Canaria, Spain
   - 🐙 **GitHub:** [Bob Dylan GitHub](https://github.com/Deathvks)

---
