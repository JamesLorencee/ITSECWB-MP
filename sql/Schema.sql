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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `expenselogs_AFTER_INSERT` AFTER INSERT ON `expenselogs` FOR EACH ROW BEGIN
DECLARE changes TEXT;
DECLARE newCategory VARCHAR(255);
SET newCategory = (SELECT categoryName FROM categorylist WHERE categoryID = NEW.expenseSource);

SET changes = CONCAT('Added amount ', NEW.expenseAmt, ' (', newCategory, ') ');

INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), NEW.userID, 'Expense', 'Added entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `expenselogs_AFTER_UPDATE` AFTER UPDATE ON `expenselogs` FOR EACH ROW BEGIN
 DECLARE changes TEXT;
  DECLARE oldCategory VARCHAR(255);
  DECLARE newCategory VARCHAR(255);

  SET changes = '';
  -- Get the old and new incomeSource names
  SET oldCategory = (SELECT categoryName FROM categorylist WHERE categoryID = OLD.expenseSource);
  SET newCategory = (SELECT categoryName FROM categorylist WHERE categoryID = NEW.expenseSource);
  
  IF OLD.expenseDate <> NEW.expenseDate THEN
    SET changes = CONCAT(changes, 'Date changed from ', DATE_FORMAT(OLD.expenseDate,"%m-%d-%Y"), ' to ', DATE_FORMAT(NEW.expenseDate,"%m-%d-%Y"), '. ');
  END IF;
  IF OLD.expenseAmt <> NEW.expenseAmt THEN
    SET changes = CONCAT(changes, 'Amount changed from ', OLD.expenseAmt, ' to ', NEW.expenseAmt, '. ');
  END IF;
  IF OLD.expenseSource <> NEW.expenseSource THEN
    SET changes = CONCAT(changes, 'Source changed from ', oldCategory, ' to ', newCategory, '. ');
  END IF;
  IF OLD.expenseItem <> NEW.expenseItem THEN
    SET changes = CONCAT(changes, 'Name changed from ', OLD.expenseItem, ' to ', NEW.expenseItem, '. ');
  END IF;

  INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), NEW.userID, 'Expense', 'Updated entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `expenselogs_AFTER_DELETE` AFTER DELETE ON `expenselogs` FOR EACH ROW BEGIN
DECLARE changes TEXT;
DECLARE oldCategory VARCHAR(255);
SET oldCategory = (SELECT categoryName FROM categorylist WHERE categoryID = OLD.expenseSource);

SET changes = CONCAT('Deleted amount ', OLD.expenseAmt, ' (', oldCategory, ') ');

INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), OLD.userID, 'Expense', 'Deleted entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `incomelogs_AFTER_INSERT` AFTER INSERT ON `incomelogs` FOR EACH ROW BEGIN
DECLARE changes TEXT;
DECLARE newCategory VARCHAR(255);
SET newCategory = (SELECT categoryName FROM categorylist WHERE categoryID = NEW.incomeSource);

SET changes = CONCAT('Added amount ', NEW.incomeAmt, ' (', newCategory, ') ');

INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), NEW.userID, 'Income', 'Added entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `incomelogs_AFTER_UPDATE` AFTER UPDATE ON `incomelogs` FOR EACH ROW BEGIN
  DECLARE changes TEXT;
  DECLARE oldCategory VARCHAR(255);
  DECLARE newCategory VARCHAR(255);

  SET changes = '';
  -- Get the old and new incomeSource names
  SET oldCategory = (SELECT categoryName FROM categorylist WHERE categoryID = OLD.incomeSource);
  SET newCategory = (SELECT categoryName FROM categorylist WHERE categoryID = NEW.incomeSource);
  
  IF OLD.incomeDate <> NEW.incomeDate THEN
    SET changes = CONCAT(changes, 'Date changed from ', DATE_FORMAT(OLD.incomeDate,"%m-%d-%Y"), ' to ', DATE_FORMAT(NEW.incomeDate,"%m-%d-%Y"), '. ');
  END IF;
  IF OLD.incomeAmt <> NEW.incomeAmt THEN
    SET changes = CONCAT(changes, 'Amount changed from ', OLD.incomeAmt, ' to ', NEW.incomeAmt, '. ');
  END IF;
  IF OLD.incomeSource <> NEW.incomeSource THEN
    SET changes = CONCAT(changes, 'Source changed from ', oldCategory, ' to ', newCategory, '. ');
  END IF;

  INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), NEW.userID, 'Income', 'Updated entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `incomelogs_AFTER_DELETE` AFTER DELETE ON `incomelogs` FOR EACH ROW BEGIN
DECLARE changes TEXT;
DECLARE oldCategory VARCHAR(255);
SET oldCategory = (SELECT categoryName FROM categorylist WHERE categoryID = OLD.incomeSource);

SET changes = CONCAT('Deleted amount ', OLD.incomeAmt, ' (', oldCategory, ') ');

INSERT INTO audit_logs (logID, timestamp, userID, eventType, action, details)
  VALUES (uuid(), NOW(), OLD.userID, 'Income', 'Deleted entry', changes);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `lastLogin` datetime DEFAULT NULL,
  `refreshToken` char(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2efce224-2a65-11ef-9db2-e4a8dfb32c9c','user','user@gmail.com','$2a$12$tK2.HUxmeImEuJdnmOzKA.AkaaTuPLyrzaE9ztcDODCJiGi6Y1GFK','09876543210','photo.png',0,1,NULL,NULL),('a9c2a60e-2a63-11ef-86ca-00155dbbf668','admin','admin@gmail.com','$2a$12$tK2.HUxmeImEuJdnmOzKA.AkaaTuPLyrzaE9ztcDODCJiGi6Y1GFK','09876543210','photoAdmin.png',1,1,NULL,NULL);
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

-- Dump completed on 2024-08-08 19:08:02
