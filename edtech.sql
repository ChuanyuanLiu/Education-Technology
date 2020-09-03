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
DROP DATABASE IF EXISTS edtech;
CREATE DATABASE edtech;
USE edtech;

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
INSERT INTO `framework_sections_questions_rate` VALUES (1,'Not Applicable','Not Applicable',1),(2,'Below Basic','There is no evidence of content model used',1),(3,'Basic','States the main topics of the domain area covered. Lacks details',1),(4,'Adequate','States the main topics and sub-topics of the domain area covered.Show links to existing curricula',1),(5,'Exceptional','Detailed statement of topics and subtopics covered. Shows links to existing curricula. Shows pre-requisite content required.',1),(6,'Not Applicable','Not Applicable',2),(7,'Below Basic','There is no evidence of the learner model used',2),(8,'Basic','The learner model relies only on raw scores from selected response questions and reports progress in a summative way.',2),(9,'Adequate','The learner model uses a mix of raw scores from selected response questions and other questions, and reports progress in a summative way',2),(10,'Exceptional','The learner model uses a mix of raw scores from selected response questions and other questions, as well as measures derived from log data. Formative use is made of the learner model to provide feedback during and after learning.',2),(11,'Not Applicable','Not Applicable',3),(12,'Below Basic','There is no evidence of the pedagogical model used',3),(13,'Basic','The pedagogical model is based on behaviourist methods. The system is the source of knowledge. There is little or no use of interactivity.',3),(14,'Adequate','The pedagogical model is based on constructivist methods. Learners have the opportunity to construct knowledge. There is much use of interactivity with the system',3),(15,'Exceptional','The pedagogical model is based on constructivist or social constructivist methods. Learners have the opportunity to work together and to construct knowledge. There is much use of interactivity with the system and with other learners.',3),(16,'Not Applicable','Not Applicable',4),(17,'Below Basic','Does not fit with existing education systems',4),(18,'Basic','Can be used alongside existing education systems but with little or no import/export to them.',4),(19,'Adequate','Can be partially integrated with existing education systems and can import/export data to them.',4),(20,'Exceptional','Can be fully integrated with existing education systems and can easily import/export data to them.',4),(21,'Not Applicable','Not Applicable',5),(22,'Below Basic','Does not fit to Learners\' needs',5),(23,'Basic','It is unlike other existing education systems in use. Learners will have to learn new skills to use it.  Is not fully appropriate for the age and ability of the learners.',5),(24,'Adequate','It is similar to other existing education systems in use. Learners will not have to learn new skills to use it.  It is mostly appropriate for the age and ability of the learners.',5),(25,'Exceptional','It is very similar to other existing education systems in use. Learners will not have to learn new skills to use it.  It is fully appropriate for the age and ability of the learners.',5),(26,'Not Applicable','Not Applicable',6),(27,'Below Basic','Does not fit to Teachers\' needs',6),(28,'Basic','Teachers will have to spend considerable time learning how to use it.  It does not  assist their work very much.',6),(29,'Adequate','Teachers will have to spend a moderate amount of time learning how to use it.  It moderately assists their work ',6),(30,'Exceptional','Teachers may have to spend some time to learn how to use it.  It assists their work significantly ',6),(31,'Not Applicable','Not Applicable',7),(32,'Below Basic','Does not fit to Administrators\' needs',7),(33,'Basic','Administrators will have to spend considerable time learning how to use it.  It does not provide any significant efficiency or effectiveness gains',7),(34,'Adequate','Administrators will have to spend a moderate amount of time learning how to use it.  It provides moderateefficiency or effectiveness gains',7),(35,'Exceptional','Administrators will have to spend a moderate amount of time learning how to use it.  It provides significant efficiency or effectiveness gains',7),(36,'Not Applicable','Not Applicable',8),(37,'Below Basic','Does not fit to Parents\' and other stakeholders\' needs',8),(38,'Basic','Parents/other stakeholders have limited access to the product. It does not provide any actionable information. ',8),(39,'Adequate','Parents/other stakeholders have good access to the product. It provides some actionable information.',8),(40,'Exceptional','Parents/other stakeholders have excellent access to the product. It provides some actionable information.',8),(41,'Not Applicable','Not Applicable',13),(42,'Below Basic','Attention to usability is not evident',13),(43,'Basic','Use is not intuitive. Users need to learn how to use the system. Functions are not efficient. It is easy to make errors.',13),(44,'Adequate','Use is generally intuitive. Users can fairly easily learn how to use the system. Functions are generally efficient. Users don\'t make many errors',13),(45,'Exceptional','Use is intuitive. Users can easily understand how to use the system. Functions are efficient.  Users seldom make errors. The system may meet formal  accepted Usability Standards such as ISO 9241',13),(46,'Not Applicable','Not Applicable',15),(47,'Below Basic','Technical requirements are unclear',15),(48,'Basic','The product requires hardware or connectivity specifications that cannot be met for many learners or users. The system may not work on all operating systems or devices.',15),(49,'Adequate','The product requires hardware or connectivity specifications that can be met for many learners or users. The system may not work on all operating systems or devices.',15),(50,'Exceptional','The product requires hardware or connectivity specifications that can be met for all learners or users. The system works on all operating systems or devices.',15),(51,'Not Applicable','Not Applicable',16),(52,'Below Basic','Teacher is not involved',16),(53,'Basic','Primarily the productworks solely with the learner. The teacher cannot monitor learners during learning or intervene. Teacher only receives reports after learning sessions',16),(54,'Adequate','The productallows the teacher to monitor learners during learning but not intervene. Teacher only receives reports after learning sessions',16),(55,'Exceptional','The productprovides multiple ways that the teacher can monitor learners during learning and intervene for individuals and the whole class. Teacher receives live, ongoing reports during learning sessions.',16),(56,'Not Applicable','Not Applicable',17),(57,'Below Basic','Teacher load is increased',17),(58,'Basic','The teacher workload is not affected by the use of the product.',17),(59,'Adequate ','The teacher workload is moderately decraesed by the use of the product.',17),(60,'Exceptional ','The teacher workload is substantially decraesed by the use of the product.',17),(61,'Not Applicable','Not Applicable',18),(62,'Below Basic','There is no reporting',18),(63,'Basic','Reporting is only to learners, not teachers or administrators. Reporting is based on simplistic, correct/incorrect reporting. Reporting is not related to learning objectives. Reporting does not help to differentiateinstruction.',18),(64,'Adequate','Reporting is tolearners and teachers and may include administrators. Reporting is based on a range of student responses and teacher input. Reporting is related to learning objectives. Reporting helps a little to differentiateinstruction',18),(65,'Exceptional','Reporting is to learners, teachers and  administrators. Reporting is based on a range of student responses, logged actions during learning and teacher input. Reporting is related to learning objectives. Reporting helps a lot to differentiateinstruction.',18),(66,'Not Applicable','Not Applicable',19),(67,'Below Basic','There is no professional development',19),(68,'Basic','Professional development is simplistic and only covers basics like how to set up the learning sessions. Professional development requires face-to-face sessions with no online options',19),(69,'Adequate','Professional developmentcoverds all aspects of how to use the product. Professional development can be done online with face-to-face options.',19),(70,'Exceptional','Professional developmentcovers all aspects of how to use the product. PD includes how to integrate use into the broader learning landscape and howit links to curricula. Professional development can be done onlinewith face-to-face options.',19),(71,'Not Applicable','Not Applicable',20),(72,'Below Basic','There is no evidence that learners have equal access to the product and its features',20),(73,'Basic','Not all learners have equal access to the product and its features. There is little evidence that there is no difference in learning outcomes for minority or under-served populations. ',20),(74,'Adequate','All  learners have equal access to the product and its features. There is some evidence that there is no difference in learning outcomes for minority or under-served populations.',20),(75,'Exceptional','All  learners have equal access to the product and its features. There is strong evidence that there is no difference in learning outcomes for minority or under-served populations. ',20),(76,'Not Applicable','Not Applicable',21),(77,'Below Basic','Attention to accessibility is not evident',21),(78,'Basic','Accessibility is basic, with a few features that allow the productto accommodate the special needs of users.',21),(79,'Adequate','Accessibility is good with severalfeatures that allow the productto accommodate the special needs of users. If web-based it meets the latest WebContent AccessibilityGuidelines (WCAG). The productis operable with external accessibility devices.',21),(80,'Exceptional','Accessibility is excellent with many features that allow the productto accommodate the special needs of users. If web-based it meets the latest Web Content AccessibilityGuidelines (WCAG). The productis fully operable with external accessibility devices',21),(81,'Not Applicable','Not Applicable',22),(82,'Below Basic','The vendor has no evidence of effectiveness from trusted independent sources',22),(83,'Basic','The vendor provides little evidence of effectiveness from trusted independent sources',22),(84,'Adequate','The vendor provides Moderate evidence of effectiveness from trusted independent sources',22),(85,'Exceptional','The vendor provides comprehensive evidence of effectiveness from trusted independent sources',22),(86,'Not Applicable','Not Applicable',23),(87,'Below Basic','It is not possible to establish if the product has been designed in an ethical way.',23),(88,'Basic','It is not very clear if the product has been designed in an ethical way. It is hard to establishthat data are only used for appropriate purposes. The Vendor provides no explanation of how learning decisions are made and how they are fair. It is impossibleto determine if algorithms used were derived from/trained on unbiased data sets.',23),(89,'Adequate','The product has been designed in an ethical way. Data seem to be used for appropriate purposes. The Vendor provides some explanation of how learning decisions are made and how they are fair. It is not clear if algorithms used were derived from/trained on unbiased data sets. ',23),(90,'Exceptional','The product has been designed in an ethical way. Data are clearly used for appropriate purposes. The Vendor clearly explains how learning decisions aremade and how they are fair. Algorithms used were derived from/trained on unbiased data sets. ',23),(91,'Not Applicable','Not Applicable',24),(92,'Below Basic','No evidence the vendor has information security risk management program',24),(93,'Basic','There is evidence of a basic level information security risk management program. There are some protections in place.',24),(94,'Adequate','There is evidence of a moderate level information security risk management program. There are good protections in place.',24),(95,'Exceptional','There is evidence of a solid performing information security risk management program. There are Strong protections in place.',24),(96,'Not Applicable','Not Applicable',25),(97,'Below Basic','There is no evidence of what PI is collected',25),(98,'Basic','It is unclear what PI is collected. It is  unclear how PI is processed, transmitted and stored',25),(99,'Adequate','It is clear what PI is collected. It is  unclear how PI is processed, transmitted and stored',25),(100,'Exceptional','It is clear what PI is collected. It is  clear how PI is processed, transmitted and stored',25),(101,'Not Applicable','Not Applicable',26),(102,'Below Basic','There is no evidence of what PII is collected',26),(103,'Basic','It is unclear what PII is collected. It is  unclear how PII is processed, transmitted and stored',26),(104,'Adequate','It is clear what PII is collected. It is  unclear how PII is processed, transmitted and stored',26),(105,'Exceptional','It is clear what PII is collected. It is  clear how PII is processed, transmitted and stored',26),(106,'Not Applicable','Not Applicable',27),(107,'Below Basic','Vendor has had previous data breaches',27),(108,'Basic','Unsure if the Vendor has had previous data breaches',27),(109,'Adequate','It seems likely the Vendor has not had previous data breaches',27),(110,'Exceptional','The Vendor definitely has not had previous data breaches',27),(111,'Not Applicable',NULL,9),(112,'Below Basic',NULL,9),(113,'Basic',NULL,9),(114,'Adequate',NULL,9),(115,'Exceptional',NULL,9),(116,'Not Applicable',NULL,10),(117,'Below Basic',NULL,10),(118,'Basic',NULL,10),(119,'Adequate',NULL,10),(120,'Exceptional',NULL,10),(121,'Not Applicable',NULL,11),(122,'Below Basic',NULL,11),(123,'Basic',NULL,11),(124,'Adequate',NULL,11),(125,'Exceptional',NULL,11),(126,'Not Applicable',NULL,12),(127,'Below Basic',NULL,12),(128,'Basic',NULL,12),(129,'Adequate',NULL,12),(130,'Exceptional',NULL,12),(131,'Not Applicable',NULL,14),(132,'Below Basic',NULL,14),(133,'Basic',NULL,14),(134,'Adequate',NULL,14),(135,'Exceptional',NULL,14);
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
