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
INSERT INTO `audit_logs` VALUES ('027dce08-4335-11ef-9a1f-e4a8dfb32c9c','2024-07-16 13:34:02','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Added entry','N/A'),('2dc09c4f-432f-11ef-9a1f-e4a8dfb32c9c','2024-07-16 12:52:18','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','N/A'),('2edfd1ab-432c-11ef-9a1f-e4a8dfb32c9c','2024-07-16 12:30:51','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Updated entry','Date changed from 07-01-2024 to 07-16-2024. '),('605e6d83-4334-11ef-9a1f-e4a8dfb32c9c','2024-07-16 13:29:30','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','N/A'),('605e7980-4334-11ef-9a1f-e4a8dfb32c9c','2024-07-16 13:29:30','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','N/A'),('734a3a4b-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:53:12','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','Deleted amount 123.00 (Passive) '),('82cb4714-432b-11ef-9a1f-e4a8dfb32c9c','2024-07-16 12:26:02','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Updated entry','Date changed from 2024-07-30 00:00:00 to 2024-07-24 00:00:00. Amount changed from 10.00 to 10.02. Source changed from Investment to Job. '),('8d5cf9e3-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:53:56','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Added entry','N/A'),('8e238759-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:53:57','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','Deleted amount 11.00 (Job) '),('bd2b0b7c-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:55:16','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Added entry','N/A'),('bfe5b9fc-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:55:20','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Added entry','N/A'),('c0807bd9-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:55:21','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','Deleted amount 1.00 (Savings) '),('ec04dcf1-434a-11ef-9a1f-e4a8dfb32c9c','2024-07-16 16:10:53','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Added entry','Added amount 1.00 (Job) '),('f53b9110-4348-11ef-9a1f-e4a8dfb32c9c','2024-07-16 15:56:50','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Income','Deleted entry','Deleted amount 2.00 (Passive) ');
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
INSERT INTO `incomelogs` VALUES ('0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','ec04d18f-434a-11ef-9a1f-e4a8dfb32c9c','2024-07-11 00:00:00',1.00,'60304bdb-42b4-11ef-9a1f-e4a8dfb32c9c');
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
INSERT INTO `jwt_blacklist` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDk2NjIwMCwiZXhwIjoxNzIwOTY3MTAwfQ.MbylVIj28Uuo4-UKX0JZp_cbswEDtwq2Hn4Sa301_tY','2024-07-14 22:25:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDk2NzI1MywiZXhwIjoxNzIwOTY4MTUzfQ.TFUm4wS_cUSZ6N-IRqHrmoR7UWPwGvMAkxvuINLIHbc','2024-07-14 22:42:33'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDk2ODIzMCwiZXhwIjoxNzIwOTY5MTMwfQ.mYnHn-QND239tLmpJRZujgXKeDxT-SjyulZeKtRS2cM','2024-07-14 22:58:50'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDk3MTMxNCwiZXhwIjoxNzIwOTcyMjE0fQ.YulZ7VK6fz84mXm8jzQBwuWGSe2adBWjaxr56JjHwbs','2024-07-14 23:50:14'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDkzNDkzMCwiZXhwIjoxNzIwOTM1ODMwfQ.H7n4GAe4_mgVHg9wQAJSZOe1e_ExxAku2-51qpYYtJg','2024-07-14 13:43:50'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMDkzNzkzNSwiZXhwIjoxNzIwOTM4ODM1fQ.cQcCMU3_AcP9tK5CY3yqYTCpYo2bLVzjca88fVvbaTQ','2024-07-14 14:33:55'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMTA0OTE1MCwiZXhwIjoxNzIxMDUwMDUwfQ.m1suEzl8b4yGokRxdQ4j6bkhwsH-r7crT640HxF6gXM','2024-07-15 21:27:30'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMTEwMTg3OCwiZXhwIjoxNzIxMTAyNzc4fQ.kMQe87zCS_6eneISqTk6VfUiVY4kxuVxd9WeDuR_1ic','2024-07-16 12:06:18'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlhdCI6MTcyMTEwNzY1OSwiZXhwIjoxNzIxMTA4NTU5fQ.qq6dgYmsHG8iHs_ysHfdJ5h_0zPAedgPMDV0zhC1Q0s','2024-07-16 13:42:39'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk0NDM3MiwiZXhwIjoxNzIwOTQ1MjcyfQ.S1LcNLk_vJrdmRn3rA8YRZEa3TqdLN0WC2PQZ72xRc4','2024-07-14 16:21:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2NjIyMywiZXhwIjoxNzIwOTY3MTIzfQ.O43-9zzLNWpdtpm6jaL6CVoW2DvqDFQ3BLSAP7PloDw','2024-07-14 22:25:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2NTAyMCwiZXhwIjoxNzIwOTY1OTIwfQ.pcdPEdVHz6unY8LOqLeZiXM1JP-lzuQYk8pdb7zh3Gs','2024-07-14 22:05:20'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2ODg1MiwiZXhwIjoxNzIwOTY5NzUyfQ.zFeZb-vhbpRFvIXVv-MmUKkl3VUZTGl5EvjuudZwUWs','2024-07-14 23:09:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2OTc1MiwiZXhwIjoxNzIwOTcwNjUyfQ.WuaQX4eElTGDm4kZMxCNRcoddX_HRtcUHkUOLEZKrW8','2024-07-14 23:24:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2OTIwNCwiZXhwIjoxNzIwOTcwMTA0fQ.sbrhYP0L4StYjiziZcba-IFAdSBdYHqspM6uOhMg_jk','2024-07-14 23:15:04'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk2OTU4OSwiZXhwIjoxNzIwOTcwNDg5fQ.6BOsEhtrLqBBO7ZLmaK6fefVISEs5mE9UKbP6RH0Nkc','2024-07-14 23:21:29'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDk3MTM4NSwiZXhwIjoxNzIwOTcyMjg1fQ.gZs5jwFdR5JpNJuR0OtmPfojyQtcGcl8byMI2c21HQ4','2024-07-14 23:51:25'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDkzNTQ5MywiZXhwIjoxNzIwOTM2MzkzfQ.8oAubb2nxj_URQUc3PRqrdSUrLYZAqCsRvTmU331lhA','2024-07-14 13:53:13'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMDkzODA3NiwiZXhwIjoxNzIwOTM4OTc2fQ.lKNqZfVRDI8j0Oouxf8uzxikEajx2s4sxt5foRoCylU','2024-07-14 14:36:16'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTA0OTE2OCwiZXhwIjoxNzIxMDUwMDY4fQ.DewvoQQ_rVYkei7BK-nY_r2oGwpVUSSKCQ7rSibFiuo','2024-07-15 21:27:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTEwMjk3NywiZXhwIjoxNzIxMTAzODc3fQ.PaJ6a2CjGWlRA3-kA8yqf7oSJv-ALh2UrsxlJjVoBUk','2024-07-16 12:24:37'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTEwMTg5MCwiZXhwIjoxNzIxMTAyNzkwfQ.NpJo3js0T-F5Uhd95qB2h6p0BgjyRwr-A6ALewcowSs','2024-07-16 12:06:30'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTEwNTk0MywiZXhwIjoxNzIxMTA2ODQzfQ.-PBWXEZ-xVANfiRVRZ7FKKfnNVDsHdV7-oIGULITd84','2024-07-16 13:14:03'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTExNjcyMSwiZXhwIjoxNzIxMTE3NjIxfQ.BjI7zIDgzRSeL4TWzvyVE2n0VNML-J2c_uJTh5lxMK8','2024-07-16 16:13:41'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6ImE5YzJhNjBlLTJhNjMtMTFlZi04NmNhLTAwMTU1ZGJiZjY2OCIsImlzQWRtaW4iOjEsImlhdCI6MTcyMTExNTI5MSwiZXhwIjoxNzIxMTE2MTkxfQ.sz74RbqUC6NjiHvBNXGdy_b8okDTiee3-YLDo5Ozqhs','2024-07-16 15:49:51'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaWF0IjoxNzIwOTQzNTkzLCJleHAiOjE3MjA5NDQ0OTN9.X--ch2t2Bab-GD8NZfbHj9Wb_aYJZBmmM-tR52I4EBs','2024-07-14 16:08:13'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaWF0IjoxNzIwOTY0NTkwLCJleHAiOjE3MjA5NjU0OTB9.39DRag4c9yRsw-37fkE8BwAJeqz7FPiIlGnR9cEaDHo','2024-07-14 21:58:10'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaWF0IjoxNzIxMTA1NDgzLCJleHAiOjE3MjExMDYzODN9.mllaZm-Mj15iNzJGqtBo8baVJ-k-td9VwyJOP94Hkwc','2024-07-16 13:06:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaWF0IjoxNzIxMTAwNDU1LCJleHAiOjE3MjExMDEzNTV9.eauedxZI9MiEIyor5uASfIk-nfcxhSYBG6bPqapSqCY','2024-07-16 11:42:35'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTcxNzY2LCJleHAiOjE3MjA5NzI2NjZ9.GDcrXsUR_hWJ2lHUubEmbTf1kYhHKCSzR7N9o7Xotqs','2024-07-14 23:57:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTM1NDMzLCJleHAiOjE3MjA5MzYzMzN9.DCpl1SGbj2XIc93IdKldNOC6_wvUj6WUXjGWQRBLGBI','2024-07-14 13:52:13'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTM4MDg5LCJleHAiOjE3MjA5Mzg5ODl9.NAg9FqdId7bMuQSxyd2XEMlSlSLdGCS28P32lEexJe0','2024-07-14 14:36:29'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTQ0MzEyLCJleHAiOjE3MjA5NDUyMTJ9.JNKLrtMiz_n_Jdv5PxnBoxwOC-SACSSy_wO-ZNiWa6c','2024-07-14 16:20:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTY1MjQ4LCJleHAiOjE3MjA5NjYxNDh9.JCU32Zv86XraetSS38OSHHbWZ_YLVNlXYqmwhyvD5HU','2024-07-14 22:09:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTY2MjMxLCJleHAiOjE3MjA5NjcxMzF9.gU7JVKcvU2B39SOBdIalHjhhxBp8jLISK046nWn_Xug','2024-07-14 22:25:31'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIwOTY5OTk1LCJleHAiOjE3MjA5NzA4OTV9.sOMyHPi7r7prqtJya8DTIA7ghnTGZlE9c14jf8ShAAI','2024-07-14 23:28:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIxMTA1NTU5LCJleHAiOjE3MjExMDY0NTl9.cU_8H6MvVRkLpnt9T4bcjYsK3-xuOFtDpu78z4GBsPo','2024-07-16 13:07:39'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIxMTAwNzA3LCJleHAiOjE3MjExMDE2MDd9.sDynsIwJxtpniSw5ghcUljCAf8UseUNwrU1fvBo0-ps','2024-07-16 11:46:47'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIxMTAyNDg3LCJleHAiOjE3MjExMDMzODd9.jyzQYWqZiNtNyDrmSfjgEJaFeCA0XSN-pc7z3xks1MY','2024-07-16 12:16:27'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jemVza2Ffc2lsdmVzdHJlQGRsc3UuZWR1LnBoIiwidXNlcklkIjoiMGMwNDhiZTItNDFhMy0xMWVmLTlhMWYtZTRhOGRmYjMyYzljIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzIxMTE2MTk5LCJleHAiOjE3MjExMTcwOTl9.8yyXH99nPQdMIq5RYD_U8oCOgQwR38jHquvXtLsFX7U','2024-07-16 16:04:59');
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
INSERT INTO `users` VALUES ('0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c','Franczeska Margaux Jose Silvestre','franczeska_silvestre@dlsu.edu.ph','$2a$12$tK2.HUxmeImEuJdnmOzKA.AkaaTuPLyrzaE9ztcDODCJiGi6Y1GFK','09392313505','0c048be2-41a3-11ef-9a1f-e4a8dfb32c9c-1720935400887.jpg',0,'$2a$12$Llaexe5u61MGKnQgijyXAOnWKeEouIZljkPTKj7TJRjDtHnhGahZW'),('2efce224-2a65-11ef-9db2-e4a8dfb32c9c','usr','user@gmail.com','$2a$12$zy40f1fCmsrthC.DHgqr4OSk2OdoZhRUkcU88CYDfP9EprD8LkliO','09392313505','1718379953768.png',0,NULL),('a9c2a60e-2a63-11ef-86ca-00155dbbf668','Admin','admin@gmail.com','$2a$12$tK2.HUxmeImEuJdnmOzKA.AkaaTuPLyrzaE9ztcDODCJiGi6Y1GFK','09876543210','1718379300550.jpg',1,'$2a$12$.jqQ6rs5EotjaQC3PWM/ge93Pu9ZH.moIdsy9Rcd6nzr2lrJTpZ3q');
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

-- Dump completed on 2024-07-16 16:11:50
