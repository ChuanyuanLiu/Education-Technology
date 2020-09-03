-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: EdtechEvaluation
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `Evaluation_ID` int NOT NULL AUTO_INCREMENT,
  `Evaluation_Author` varchar(50) NOT NULL,
  `Evaluation_Title` varchar(200) NOT NULL DEFAULT 'New Evaluation',
  `Evaluation_CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Evaluation_ModifiedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Evaluation_Summary` varchar(10000) DEFAULT NULL,
  `Evaluation_Completed` tinyint NOT NULL DEFAULT '0',
  `Framework_ID` int NOT NULL,
  PRIMARY KEY (`Evaluation_ID`),
  KEY `Framework_ID_idx` (`Framework_ID`),
  CONSTRAINT `Framework_ID` FOREIGN KEY (`Framework_ID`) REFERENCES `framework` (`Framework_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_responses`
--

DROP TABLE IF EXISTS `evaluation_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_responses` (
  `Response_ID` int NOT NULL AUTO_INCREMENT,
  `Rate_Chosen` int NOT NULL,
  `Response_Comment` varchar(2000) DEFAULT NULL,
  `Question_ID` int NOT NULL,
  PRIMARY KEY (`Response_ID`),
  KEY `Question_ID_idx` (`Question_ID`),
  CONSTRAINT `Question_ID` FOREIGN KEY (`Question_ID`) REFERENCES `framework_sections_questions` (`Question_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_responses`
--

LOCK TABLES `evaluation_responses` WRITE;
/*!40000 ALTER TABLE `evaluation_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework`
--

DROP TABLE IF EXISTS `framework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework` (
  `Framework_ID` int NOT NULL AUTO_INCREMENT,
  `Framework_Title` varchar(200) NOT NULL DEFAULT 'New Framework',
  `Framework_Author` varchar(50) NOT NULL,
  `Framework_CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Framework_ActiveStatus` tinyint NOT NULL DEFAULT '1',
  `Previous_FrameworkID` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Framework_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework`
--

LOCK TABLES `framework` WRITE;
/*!40000 ALTER TABLE `framework` DISABLE KEYS */;
INSERT INTO `framework` VALUES (1,'Primary EdTech Evaluation','William','2020-08-28 10:00:45',1,0),(2,'Secondary EdTech Evaluation','George','2020-08-28 10:02:02',1,0);
/*!40000 ALTER TABLE `framework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_sections`
--

DROP TABLE IF EXISTS `framework_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework_sections` (
  `Section_ID` int NOT NULL AUTO_INCREMENT,
  `Section_Title` varchar(200) NOT NULL DEFAULT 'New Section',
  `Framework_ID` int NOT NULL,
  PRIMARY KEY (`Section_ID`),
  KEY `Framework_id_idx` (`Framework_ID`),
  CONSTRAINT `FrameworkID` FOREIGN KEY (`Framework_ID`) REFERENCES `framework` (`Framework_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_sections`
--

LOCK TABLES `framework_sections` WRITE;
/*!40000 ALTER TABLE `framework_sections` DISABLE KEYS */;
INSERT INTO `framework_sections` VALUES (1,'Educational Theory',1),(2,'Implementation Approach',1),(3,'Evidence',1),(4,'Usability',1),(5,'Teacher Role',1),(6,'F.A.T.E',1),(7,'Infomartion Security',1);
/*!40000 ALTER TABLE `framework_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_sections_questions`
--

DROP TABLE IF EXISTS `framework_sections_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework_sections_questions` (
  `Question_ID` int NOT NULL AUTO_INCREMENT,
  `Question_Title` varchar(200) NOT NULL DEFAULT 'New Question',
  `Section_ID` int NOT NULL,
  PRIMARY KEY (`Question_ID`),
  KEY `FrameworkQuestionID_idx` (`Section_ID`),
  CONSTRAINT `FrameworkSectionID` FOREIGN KEY (`Section_ID`) REFERENCES `framework_sections` (`Section_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_sections_questions`
--

LOCK TABLES `framework_sections_questions` WRITE;
/*!40000 ALTER TABLE `framework_sections_questions` DISABLE KEYS */;
INSERT INTO `framework_sections_questions` VALUES (1,'Content Model',1),(2,'Learner Model',1),(3,'Pedagogical Model',1),(4,'Fit to Educational Ecosystem',2),(5,'Fit to Learners',2),(6,'Fit to Teachers',2),(7,'Fit to System Administrators',2),(8,'Fit to Parents and Other Stakeholders',2),(9,'Basic Rationale',3),(10,'Emerging evidence',3),(11,'Moderate Evidence',3),(12,'Strong Evidence',3),(13,'Usability Standards',4),(14,'Accessibility',4),(15,'Technical Requirements',4),(16,'Classroom Role',5),(17,'Teacher load',5),(18,'Reporting',5),(19,'Professional development',5),(20,'Fairness',6),(21,'Accessibility',6),(22,'Trust',6),(23,'Ethics',6),(24,'Compliance',7),(25,'Personal Information',7),(26,'Personal Identifiable Information',7),(27,'Data Breaches',7);
/*!40000 ALTER TABLE `framework_sections_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_sections_questions_rate`
--

DROP TABLE IF EXISTS `framework_sections_questions_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework_sections_questions_rate` (
  `Rate_ID` int NOT NULL AUTO_INCREMENT,
  `Rate_Title` varchar(200) NOT NULL DEFAULT 'New Rate',
  `Rate_Criterion` varchar(2000) DEFAULT NULL,
  `Question_ID` int NOT NULL,
  PRIMARY KEY (`Rate_ID`),
  KEY `FramewrokSectionQuestionID_idx` (`Question_ID`),
  CONSTRAINT `FramewrokSectionQuestionID` FOREIGN KEY (`Question_ID`) REFERENCES `framework_sections_questions` (`Question_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_sections_questions_rate`
--

LOCK TABLES `framework_sections_questions_rate` WRITE;
/*!40000 ALTER TABLE `framework_sections_questions_rate` DISABLE KEYS */;
INSERT INTO `framework_sections_questions_rate` VALUES (1,'Not Applicable',NULL,1),(2,'Below Basic',NULL,1),(3,'Basic',NULL,1),(4,'Adequate',NULL,1),(5,'Exceptional',NULL,1),(6,'Not Applicable',NULL,2),(7,'Below Basic',NULL,2),(8,'Basic',NULL,2),(9,'Adequate',NULL,2),(10,'Exceptional',NULL,2),(11,'Not Applicable',NULL,3),(12,'Below Basic',NULL,3),(13,'Basic',NULL,3),(14,'Adequate',NULL,3),(15,'Exceptional',NULL,3),(16,'Not Applicable',NULL,4),(17,'Below Basic',NULL,4),(18,'Basic',NULL,4),(19,'Adequate',NULL,4),(20,'Exceptional',NULL,4),(21,'Not Applicable',NULL,5),(22,'Below Basic',NULL,5),(23,'Basic',NULL,5),(24,'Adequate',NULL,5),(25,'Exceptional',NULL,5);
/*!40000 ALTER TABLE `framework_sections_questions_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `Report_ID` int NOT NULL AUTO_INCREMENT,
  `Report_Author` varchar(50) NOT NULL,
  `Report_Title` varchar(200) NOT NULL DEFAULT 'New Report',
  `Report_CreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Report_ModifiedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Report_Recommendations` varchar(10000) DEFAULT NULL,
  `Report_Published` tinyint NOT NULL DEFAULT '0',
  `Evaluation_ID` int NOT NULL,
  PRIMARY KEY (`Report_ID`),
  KEY `EvaluationID_idx` (`Evaluation_ID`),
  CONSTRAINT `EvaluationID` FOREIGN KEY (`Evaluation_ID`) REFERENCES `evaluation` (`Evaluation_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-29  0:08:43
