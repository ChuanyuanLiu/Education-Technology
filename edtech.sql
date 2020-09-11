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
  `evaluation_creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluation_modified_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `question_id` int NOT NULL,
  `rate_chosen` int NOT NULL,
  `response_comment` varchar(2000) DEFAULT '',
  `evaluation_id` int NOT NULL,
  PRIMARY KEY (`question_id`, `evaluation_id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `framework_section_question` (`question_id`),
  KEY `evaluation_id_in_evaluation_response_idx` (`question_id`),
  CONSTRAINT `evaluation_id_in_evaluation_response` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluation` (`evaluation_id`)
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
  `framework_creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `framework_section` VALUES (1,'Educational Theory',1),(2,'Implementation Approach',1),(3,'Evidence',1),(4,'Usability',1),(5,'Teacher Role',1),(6,'F.A.T.E',1),(7,'Infomartion Security',1),(8,'Educational Theory',2),(9,'Implementation Approach',2),(10,'Evidence',2),(11,'Usability',2),(12,'Teacher Role',2),(13,'F.A.T.E',2),(14,'Infomartion Security',2);
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
  `rate_1_criteria` varchar(2000) NOT NULL DEFAULT 'New Criteria 1',
  `rate_2_criteria` varchar(2000) NOT NULL DEFAULT 'New Criteria 2',
  `rate_3_criteria` varchar(2000) NOT NULL DEFAULT 'New Criteria 3',
  `rate_4_criteria` varchar(2000) NOT NULL DEFAULT 'New Criteria 4',
  `rate_5_criteria` varchar(2000) NOT NULL DEFAULT 'New Criteria 5',
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
INSERT INTO `framework_section_question` VALUES (1,'Content Model',1,'Not Applicable','There is no evidence of the content model used','States the main topics of the domain area covered. Lacks detail.','States the main topics and sub-topics of the domain area covered. Shows links to existing curricula.','Detailed statement of topics and subtopics covered. Shows links to existing curricula. Shows pre-requisite content required.'),(2,'Learner Model',1,'Not Applicable','There is no evidence of the learner model used.','The learner model relies only on raw scores from selected response questions and reports progress in a summative way.','The learner model uses a mix of raw scores from selected response questions and other questions, and reports progress in a summative way.','The learner model uses a mix of raw scores from selected response questions and other questions, as well as measures derived from log data. Formative use is made of the learner model to provide feedback during and after learning'),(3,'Pedagogical Model',1,'Not Applicable','There is no evidence of the pedagogicalmodel used.','The pedagogical model is based on behaviourist methods. The system is the source of knowledge. There is little or no use of interactivity.','The pedagogical model is based on constructivist methods. Learners have the opportunity to construct knowledge. There is much use of interactivity with the system.','The pedagogical model is based on constructivist or social constructivist methods. Learners have the opportunity to work together and to construct knowledge. There is much use of interactivity with the system and with other learners.'),(4,'Fit to Educational Ecosystem',2,'Not Applicable','Does not fit with existing education systems.','Can be used alongside existing education systems but with little or no import/export to them.','Can be partially integrated with existing education systems and can import/export data to them.','Can be fully integrated with existing education systems and can easily import/export data to them'),(5,'Fit to Learners',2,'Not Applicable','Does not fit to Learners' 'needs','It is unlike other existing education systems in use. Learners will have to learn new skills to use it.  Is not fully appropriate for the age and ability of the learners.','It is similar to other existing education systems in use. Learners will not have to learn new skills to use it.  It is mostly appropriate for the age and ability of the learners','It is very similar to other existing education systems in use. Learners will not have to learn new skills to use it.  It is fully appropriate for the age and ability of the learners'),(6,'Fit to Teachers',2,'Not Applicable','Does not fit to Teachers' 'needs','Teachers will have to spend considerable time learning how to use it.  It does not  assist their work very much.','Teachers will have to spend a moderate amount of time to learn how to use it.  It  moderately assists their work','Teachers may have to spend some time to learn how to use it.  It assists their work significantly.'),(7,'Fit to System Administrators',2,'Not Applicable','Does not fit to Administrators' 'needs','Administrators will have to spend considerable time learning how to use it.  It does not provide any significant efficiency or effectiveness gains','Administrators will have to spend a moderate amount of time learning how to use it.  It provides moderateefficiency or effectiveness gains.','Administrators may have to spend a moderate amount of time learning how to use it.  It  provides significant efficiency or effectiveness gains.'),(8,'Fit to Parents and Other Stakeholders',2,'Not Applicable','Does not fit to Parents' 'and other stakeholders' 'needs','Parents/other stakeholders have limited access to the product. It does not provide any actionable information. ','Parents/other stakeholders have good access to the product. It provides some actionable information.','Parents/other stakeholders have excellent access to the product. It provides much actionable information. '),(9,'Evidence of effectiveness',3,'Not Applicable','No evidence the product is supported by research','Product has a well-defined logic model or theory of action supported by research. There may be some effort underway to determine effectiveness.','Product has a well-defined logic model or theory of action supported by research. Supported by one or more well-designed and well-implemented correlational or quasi-experimental studies that demonstrate effectiveness.','Product has a well-defined logic model or theory of action supported by research. Supported by one or more well-designed and well-implemented randomized control experimental studies that demonstrate effectiveness.'),(10,'Usability Standards',4,'Not Applicable','Attention to usability is not evident','Use is not intuitive. Users need to learn how to use the system. Functions are not efficient. It is easy to make errors','Use is generally intuitive. Users can fairly easily learn how to use the system. Functions are generally efficient. Users don''t make many errors.','Use is intuitive. Users can easily understand how to use the system. Functions are efficient.  Users seldom make errors. The system may meet formal  accepted Usability Standards such as ISO 9241'),(11,'Technical Requirements',4,'Not Applicable','Technical requirements are unclear','The product requires hardware or connectivity specifications that cannot be met for many learners or users. The system may not work on all operating systems or devices','The product requires hardware or connectivity specifications that can be met for most, but not all learners or users. The system may not work on all operating systems or devices.','The product requires hardware or connectivity specifications that can be met for all learners or users. The system  works on all operating systems or devices'),(12,'Classroom Role',5,'Not Applicable','Teacher is not involved.','Primarily the productworks solely with the learner. The teacher cannot monitor learners during learning or intervene. Teacher only receives reports after learning sessions','The productallows the teacher to monitor learners during learning but not intervene. Teacher only receives reports after learning sessions.','The productprovides multiple ways that the teacher can monitor learners during learning and intervene for individuals and the whole class. Teacher receives live, ongoing reports during learning sessions'),(13,'Teacher load',5,'Not Applicable','Teacher load is increased','The teacher workload is not affected by the use of the product.','The teacher workload is moderately decreased by use of the product','The teacher workload is substantially decreased by use of the product'),(14,'Reporting',5,'Not Applicable','There is no reporting','Reporting is only to learners, not teachers or administrators. Reporting is based on simplistic, correct/incorrect reporting. Reporting is not related to learning objectives. Reporting does not help to differentiateinstruction.','Reporting is tolearners and teachers and may include administrators. Reporting is based on a range of student responses and teacher input. Reporting is related to learning objectives. Reporting helps a little to differentiateinstruction.','Reporting is to learners, teachers and  administrators. Reporting is based on a range of student responses, logged actions during learning and teacher input. Reporting is related to learning objectives. Reporting helps a lot to differentiateinstruction'),(15,'Professional development',5,'Not Applicable','There is no professional development.','Professional development is simplistic and only covers basics like how to set up the learning sessions. Professional development requires face-to-face sessions with no online options','Professional development covers all aspects of how to use the product. Professional development can be done online with face-to-face options.','Professional developmentcovers all aspects of how to use the product. PD includes how to integrate use into the broader learning landscape and howit links to curricula. Professional development can be done onlinewith face-to-face options.'),(16,'Fairness',6,'Not Applicable','There is no evidence that learners have equal access to the product and its features.','Not all learners have equal access to the product and its features. There is little evidence that there is no difference in learning outcomes for minority or under-served populations. ','All  learners have equal access to the product and its features. There is some evidence that there is no difference in learning outcomes for minority or under-served populations','All  learners have equal access to the product and its features. There is strong evidence that there is no difference in learning outcomes for minority or under-served populations.'),(17,'Accessibility',6,'Not Applicable','Attention to accessibility is not evident.','Accessibility is basic, with a few features that allow the productto accommodate the special needs of users.','Accessibility is good with severalfeatures that allow the productto accommodate the special needs of users. If web-based it meets the latest WebContent AccessibilityGuidelines (WCAG). The productis operable with external accessibility devices.','Accessibility is excellent with many features that allow the productto accommodate the special needs of users. If web-based it meets the latest Web Content AccessibilityGuidelines (WCAG). The productis fully operable with external accessibility devices.'),(18,'Trust',6,'Not Applicable','The vendor has no evidence of effectiveness from trusted independent sources','The Vendor provides little evidence of effectiveness from trusted independent sources.','The Vendor provides moderateevidence of effectiveness from trusted independent sources.','The product provides comprehensiveevidence of effectiveness from trusted independent sources'),(19,'Ethics',6,'Not Applicable','It is not possible to establish if the product has been designed in an ethical way.','t is not very clear if the product has been designed in an ethical way. It is hard to establishthat data are only used for appropriate purposes. The Vendor provides no explanation of how learning decisions are made and how they are fair. It is impossibleto determine if algorithms used were derived from/trained on unbiased data sets. ','The product has been designed in an ethical way. Data seem to be used for appropriate purposes. The Vendor provides some explanation of how learning decisions are made and how they are fair. It is not clear if algorithms used were derived from/trained on unbiased data sets.  ','The product has been designed in an ethical way. Data are clearly used for appropriate purposes. The Vendor clearly explains how learning decisions aremade and how they are fair. Algorithms used were derived from/trained on unbiased data sets'),(20,'Compliance',7,'Not Applicable','No evidence the Vendor has an information security risk management program.','There is evidence of a basic level information security risk management program. There are some protections in place.','There is evidence of a moderate level information security risk management program. There are good protections in place. ','There is evidence of a solid performing information security risk management program. There are strong protections in place. '),(21,'Personal Information',7,'Not Applicable','There is no evidence of what PI is collected.','It is unclear what PI is collected. It is  unclear how PI is processed, transmitted and stored. ','It is clear what PI is collected. Itis not clear how PI is processed, transmitted and stored.','It is very clear what PI is collected.It is clear how PI is processed, transmitted and stored.'),(22,'Personal Identifiable Information',7,'Not Applicable','There is no evidence of what PII is collected.','It is unclear what PII is collected. It is unclear how PII is processed, transmitted and stored.','It is clear what PII is collected.It is not clear how PII is processed, transmitted and stored.','It is very clear what PII is collected.It is clear how PII is processed, transmitted and stored.'),(23,'Data Breaches',7,'Not Applicable','Vendor has had previous data breaches','Unsure if the vendor has had previous data breaches.','It seems likely that the vendor has nothad previous data breaches.','The vendor definitely hasnothad previous data breaches.');
/*!40000 ALTER TABLE `framework_section_question` ENABLE KEYS */;
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
  `report_creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `report_modified_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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