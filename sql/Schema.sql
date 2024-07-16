CREATE DATABASE  IF NOT EXISTS `itsecwb-mp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `itsecwb-mp`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: itsecwb-mp
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `logID` char(36) NOT NULL DEFAULT (uuid()),
  `timestamp` datetime NOT NULL,
  `userID` varchar(36) NOT NULL,
  `eventType` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL DEFAULT 'N/A',
  PRIMARY KEY (`logID`),
  UNIQUE KEY `logID_UNIQUE` (`logID`),
  KEY `FK_userID2` (`userID`),
  CONSTRAINT `FK_userID2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorylist`
--

DROP TABLE IF EXISTS `categorylist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorylist` (
  `categoryID` varchar(36) NOT NULL DEFAULT (uuid()),
  `categoryName` varchar(45) NOT NULL,
  `categoryType` enum('expense','income') DEFAULT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `categoryID_UNIQUE` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorylist`
--

LOCK TABLES `categorylist` WRITE;
/*!40000 ALTER TABLE `categorylist` DISABLE KEYS */;
INSERT INTO `categorylist` VALUES ('2c26f176-429a-11ef-9a1f-e4a8dfb32c9c','Food & Drinks','expense'),('43ed17c2-42b4-11ef-9a1f-e4a8dfb32c9c','Shopping','expense'),('4ece8fe2-42b4-11ef-9a1f-e4a8dfb32c9c','Utilities','expense'),('596017ae-42b4-11ef-9a1f-e4a8dfb32c9c','Others','expense'),('60304bdb-42b4-11ef-9a1f-e4a8dfb32c9c','Job','income'),('6aafbc74-429a-11ef-9a1f-e4a8dfb32c9c','Transportation','expense'),('6b2af5b6-42b4-11ef-9a1f-e4a8dfb32c9c','Passive','income'),('837f4df8-42b4-11ef-9a1f-e4a8dfb32c9c','Savings','income'),('8a1342bb-42b4-11ef-9a1f-e4a8dfb32c9c','Investment','income'),('8f471977-42b4-11ef-9a1f-e4a8dfb32c9c','Commission','income'),('942e667d-42b4-11ef-9a1f-e4a8dfb32c9c','Stock','income'),('bb61665e-42aa-11ef-9a1f-e4a8dfb32c9c','Loans','expense');
/*!40000 ALTER TABLE `categorylist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenselogs`
--

DROP TABLE IF EXISTS `expenselogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenselogs` (
  `userID` varchar(36) NOT NULL,
  `expenseID` varchar(36) NOT NULL DEFAULT (uuid()),
  `expenseDate` datetime NOT NULL,
  `expenseItem` varchar(36) NOT NULL,
  `expenseAmt` decimal(10,2) NOT NULL,
  `expenseSource` varchar(36) NOT NULL,
  PRIMARY KEY (`userID`,`expenseID`),
  UNIQUE KEY `expenseID_UNIQUE` (`expenseID`),
  KEY `FK_categoryID_idx` (`expenseSource`),
  CONSTRAINT `FK_categoryID2` FOREIGN KEY (`expenseSource`) REFERENCES `categorylist` (`categoryID`),
  CONSTRAINT `FK_userID3` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenselogs`
--

LOCK TABLES `expenselogs` WRITE;
/*!40000 ALTER TABLE `expenselogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenselogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incomelogs`
--

DROP TABLE IF EXISTS `incomelogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incomelogs` (
  `userID` varchar(36) NOT NULL,
  `incomeID` varchar(36) NOT NULL DEFAULT (uuid()),
  `incomeDate` datetime NOT NULL,
  `incomeAmt` decimal(10,2) NOT NULL,
  `incomeSource` varchar(36) NOT NULL,
  PRIMARY KEY (`userID`,`incomeID`),
  UNIQUE KEY `incomeID_UNIQUE` (`incomeID`),
  KEY `FK_categoryID_idx` (`incomeSource`),
  CONSTRAINT `FK_categoryID` FOREIGN KEY (`incomeSource`) REFERENCES `categorylist` (`categoryID`),
  CONSTRAINT `FK_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incomelogs`
--

LOCK TABLES `incomelogs` WRITE;
/*!40000 ALTER TABLE `incomelogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `incomelogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwt_blacklist`
--

DROP TABLE IF EXISTS `jwt_blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwt_blacklist` (
  `jwt_token` varchar(500) NOT NULL,
  `expiration_time` datetime NOT NULL,
  PRIMARY KEY (`jwt_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwt_blacklist`
--

LOCK TABLES `jwt_blacklist` WRITE;
/*!40000 ALTER TABLE `jwt_blacklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwt_blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `photoFileName` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `refreshToken` char(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2efce224-2a65-11ef-9db2-e4a8dfb32c9c','usr','user@gmail.com','$2a$12$zy40f1fCmsrthC.DHgqr4OSk2OdoZhRUkcU88CYDfP9EprD8LkliO','09392313505','1718379953768.png',0,NULL),('a9c2a60e-2a63-11ef-86ca-00155dbbf668','Admin','admin@gmail.com','$2a$12$tK2.HUxmeImEuJdnmOzKA.AkaaTuPLyrzaE9ztcDODCJiGi6Y1GFK','09876543210','1718379300550.jpg',1,NULL);
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

-- Dump completed on 2024-07-16 22:58:31
