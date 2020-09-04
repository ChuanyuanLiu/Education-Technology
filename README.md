# SWEN90014 EdTech Evaluation --- Budgerigar
## About Project
EdTech Evaluation provides consulting services to education providers (schools, colleges and state departments of education) in Australia and worldwide. Part of the services offered is a product review of Education Technology products (e.g. digital learning software) so that education providers can determine the quality of the EdTech products they are considering purchasing. The product review involves using an evaluation framework that comprises a set of questions that are answered regarding different aspects of the EdTech product. For each question there is a ranking score based on a rubric that gets applied.

This project involves creating a web-based application that can be used by the consultant to apply the product review evaluation framework, input the scores for each question and store the data. The system needs to generate a final report for each product evaluation. The data also need to be stored in a database for possible future analysis across product categories. 

## Development Environment
* Front-end: React
* Back-end: Node.js
* Database: MySQL

## Git Workflow
### Branch stategy
- `master` branch: Our main branch.
- `dev` branch: Development branch. This branch can be merged into master after testing.
- `feature/username/task_name` (new feature): This branch is used to implement new feature. It can be merged into `dev` branch after finishing the feature.
- `issue/username/issue_name` (fix issue): This branch is used to fix known issues or bugs. It can be merged in to `dev` branch after the issue is fixed.
- Creating a feature task_name
 ### Workflow
When starting work on a new feature, branch off from the develop branch.
``` bash
$ git checkout -b feature/username/task_name #Switched to a new branch "feature/username/task_name"
```
- Incorporating a finished feature on develop

Finished features may be merged into the develop branch to definitely add them to the upcoming release:
``` bash
$ git checkout dev #Switched to branch 'dev'
$ git merge feature/username/task_name #Updating ea1b82a..05e9557 (Summary of changes)
$ git branch -d feature/username/task_name #Deleted branch feature/username/task_name (was 05e9557).
$ git push origin dev
```

## Setup
### Front-end
``` bash
$ cd react-app  # Switch to front-end directory
$ npm install   # Install dependencies
$ yarn start    # Start React app on port 3000
```
### Back-end
``` bash
$ cd node-app   # Switch to back-end directory
$ npm install   # Install dependencies
$ npm start     # Start Node.js app on port 3001
```
### MySQL server
Ensure server is running via the MySQL notifier in the taskbar
``` bash
$ mysql -u root -p                              # Login to MySQL server, change password to 'edtech' if needed
mysql> source <edtech.sql directory>  # Preload database with test data
```