-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: EdtechEvaluation
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `evaluation`
--
DROP DATABASE IF EXISTS edtech;
CREATE DATABASE edtech;
USE edtech;

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `evaluation` (
  `evaluation_id` int NOT NULL AUTO_INCREMENT,
  `evaluation_author` varchar(50) NOT NULL DEFAULT 'Author',
  `evaluation_title` varchar(200) NOT NULL DEFAULT 'New Evaluation',
  `evaluation_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluation_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluation_summary` varchar(10000) NOT NULL DEFAULT '',
  `evaluation_completed` tinyint NOT NULL DEFAULT 0,
  `framework_id` int NOT NULL,
  PRIMARY KEY (`evaluation_id`),
  KEY `framework_id_idx` (`framework_id`),
  CONSTRAINT `evaluation_framework_id` FOREIGN KEY (`framework_id`) REFERENCES `framework` (`framework_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
INSERT INTO `evaluation` VALUES (1,'Gerald','St.Arthur Evaluation','2020-08-28 10:00:45','2020-08-28 10:00:45','This evaluation is good.',1,1);
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_response`
--

DROP TABLE IF EXISTS `evaluation_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `evaluation_response` (
  `response_id` int NOT NULL AUTO_INCREMENT,
  `rate_chosen` int NOT NULL,
  `response_comment` varchar(2000) DEFAULT '',
  `question_id` int NOT NULL,
  PRIMARY KEY (`response_id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `framework_section_question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_response`
--

LOCK TABLES `evaluation_response` WRITE;
/*!40000 ALTER TABLE `evaluation_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework`
--

DROP TABLE IF EXISTS `framework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `framework` (
  `framework_id` int NOT NULL AUTO_INCREMENT,
  `framework_title` varchar(200) NOT NULL DEFAULT 'New Framework',
  `framework_author` varchar(50) NOT NULL DEFAULT 'Author',
  `framework_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `framework_active_status` tinyint NOT NULL DEFAULT 1,
  `previous_framework_id` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`framework_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework`
--

LOCK TABLES `framework` WRITE;
/*!40000 ALTER TABLE `framework` DISABLE KEYS */;
INSERT INTO `framework` VALUES (1,'Primary EdTech Framework','Gerald','2020-08-28 10:00:45',1,0),(2,'Secondary EdTech Framework','Gerald','2020-08-28 10:02:02',1,0);
/*!40000 ALTER TABLE `framework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_section`
--

DROP TABLE IF EXISTS `framework_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `framework_section` (
  `section_id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(200) NOT NULL DEFAULT 'New Section',
  `framework_id` int NOT NULL,
  PRIMARY KEY (`section_id`),
  KEY `framework_id_idx` (`framework_id`),
  CONSTRAINT `framework_id` FOREIGN KEY (`framework_id`) REFERENCES `framework` (`framework_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_section`
--

LOCK TABLES `framework_section` WRITE;
/*!40000 ALTER TABLE `framework_section` DISABLE KEYS */;
INSERT INTO `framework_section` VALUES (1,'Educational Theory',1),(2,'Implementation Approach',1),(3,'Evidence',1),(4,'Usability',1),(5,'Teacher Role',1),(6,'F.A.T.E',1),(7,'Infomartion Security',1);
/*!40000 ALTER TABLE `framework_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_section_question`
--

DROP TABLE IF EXISTS `framework_section_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `framework_section_question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_title` varchar(200) NOT NULL DEFAULT 'New Question',
  `section_id` int NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `framework_question_id_idx` (`section_id`),
  CONSTRAINT `framework_section_id` FOREIGN KEY (`section_id`) REFERENCES `framework_section` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_section_question`
--

LOCK TABLES `framework_section_question` WRITE;
/*!40000 ALTER TABLE `framework_section_question` DISABLE KEYS */;
INSERT INTO `framework_section_question` VALUES (1,'Content Model',1),(2,'Learner Model',1),(3,'Pedagogical Model',1),(4,'Fit to Educational Ecosystem',2),(5,'Fit to Learners',2),(6,'Fit to Teachers',2),(7,'Fit to System Administrators',2),(8,'Fit to Parents and Other Stakeholders',2),(9,'Basic Rationale',3),(10,'Emerging evidence',3),(11,'Moderate Evidence',3),(12,'Strong Evidence',3),(13,'Usability Standards',4),(14,'Accessibility',4),(15,'Technical Requirements',4),(16,'Classroom Role',5),(17,'Teacher load',5),(18,'Reporting',5),(19,'Professional development',5),(20,'Fairness',6),(21,'Accessibility',6),(22,'Trust',6),(23,'Ethics',6),(24,'Compliance',7),(25,'Personal Information',7),(26,'Personal Identifiable Information',7),(27,'Data Breaches',7);
/*!40000 ALTER TABLE `framework_section_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_section_questions_rate`
--

DROP TABLE IF EXISTS `framework_section_question_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `framework_section_question_rate` (
  `rate_id` int NOT NULL AUTO_INCREMENT,
  `rate_title` varchar(200) NOT NULL DEFAULT 'New Rate',
  `rate_criterion` varchar(2000) NOT NULL DEFAULT 'New criterion',
  `question_id` int NOT NULL,
  PRIMARY KEY (`rate_id`),
  KEY `framewrok_section_question_id_idx` (`question_id`),
  CONSTRAINT `framewrok_section_question_id` FOREIGN KEY (`question_id`) REFERENCES `framework_section_question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_section_question_rate`
--

LOCK TABLES `framework_section_question_rate` WRITE;
/*!40000 ALTER TABLE `framework_section_question_rate` DISABLE KEYS */;
INSERT INTO `framework_section_question_rate` VALUES (1,'Not Applicable',NULL,1),(2,'Below Basic',NULL,1),(3,'Basic',NULL,1),(4,'Adequate',NULL,1),(5,'Exceptional',NULL,1),(6,'Not Applicable',NULL,2),(7,'Below Basic',NULL,2),(8,'Basic',NULL,2),(9,'Adequate',NULL,2),(10,'Exceptional',NULL,2),(11,'Not Applicable',NULL,3),(12,'Below Basic',NULL,3),(13,'Basic',NULL,3),(14,'Adequate',NULL,3),(15,'Exceptional',NULL,3),(16,'Not Applicable',NULL,4),(17,'Below Basic',NULL,4),(18,'Basic',NULL,4),(19,'Adequate',NULL,4),(20,'Exceptional',NULL,4),(21,'Not Applicable',NULL,5),(22,'Below Basic',NULL,5),(23,'Basic',NULL,5),(24,'Adequate',NULL,5),(25,'Exceptional',NULL,5);
/*!40000 ALTER TABLE `framework_section_question_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_author` varchar(50) NOT NULL DEFAULT 'Author',
  `report_title` varchar(200) NOT NULL DEFAULT 'New Report',
  `report_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `report_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `report_recommendation` varchar(10000) NOT NULL DEFAULT '',
  `report_published` tinyint NOT NULL DEFAULT 0,
  `evaluation_id` int NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `evaluation_id_idx` (`evaluation_id`),
  CONSTRAINT `evaluation_id` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluation` (`evaluation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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