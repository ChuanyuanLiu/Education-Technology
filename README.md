# SWEN90014 EdTech Evaluation --- Budgerigar
## About Project
EdTech Evaluation provides consulting services to education providers (schools, colleges and state departments of education) in Australia and worldwide. Part of the services offered is a product review of Education Technology products (e.g. digital learning software) so that education providers can determine the quality of the EdTech products they are considering purchasing. The product review involves using an evaluation framework that comprises a set of questions that are answered regarding different aspects of the EdTech product. For each question there is a ranking score based on a rubric that gets applied.

This project involves creating a web-based application that can be used by the consultant to apply the product review evaluation framework, input the scores for each question and store the data. The system needs to generate a final report for each product evaluation. The data also need to be stored in a database for possible future analysis across product categories. 

## Development Environment
* Front-end: React
* Back-end: Node.js
* Database: MySQL

## Teammates
* Chuanyuan Liu
* Samuel Tumewa
* Anuradha
* Yuyao Ma
* Zijian Ju

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
$ git add * #Add all changed files on your branch
$ git commit -m "comment" #Commit all changed files on your branch
$ git push #Push all changed files on your branch
$ git checkout dev #Switched to branch 'dev'
$ git merge feature/username/task_name #Updating ea1b82a..05e9557 (Summary of changes)
$ git branch -d feature/username/task_name #Deleted branch feature/username/task_name (was 05e9557).
Create a pull request on Bitbucket, add front/back end teammate and architecture lead as reviewer.
```

## Setup
Further details can be found on https://confluence.cis.unimelb.edu.au:8443/display/SWEN900142020EEBudgerigar/Deployment+Guide

### Files
- /react-app: Create a `.env` file containing the domain name, use `localhost` for local testing:
```
REACT_APP_DOMAIN=<Insert IP address or "localhost">
```
- /node-app: Create a self-signed certificate using OpenSSL:
``` bash
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
### Front-end
``` bash
$ cd react-app                              # Switch to front-end directory
$ npm install                               # Install dependencies
# Select one of the following three based on OS and shell:
$ set HTTPS=true&&npm start                 # Start React app on port 3000 (Windows (cmd))
$ ($env:HTTPS = "true") -and (npm start)    # Start React app on port 3000 (Windows (powershell))
$ HTTPS=true npm start                      # Start React app on port 3000 (Mac, Linux)
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
$ mysql -u root -p                                              # Login to MySQL server
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'edtech';    # Change password to 'edtech', if needed
mysql> source <edtech.sql directory>                            # Preload database with test data
```

### Testing

#### Overview
- Cypress is used as the engine for the front-end tests. 
- The front-end test requires the database to be reset, and all servers up and running!
- All tests need to be run sequentially due to dependency!
- Notice that login page in hosted in Auth0 and not local Server, and requires special configurations which weren't achieved, for more information visit https://auth0.com/blog/end-to-end-testing-with-cypress-and-auth0/.

#### Setup
- Position your terminal in root folder of the project.
- Reset the database
    - `mysql -u root -p`
    - Type "edtech" as the password
    - Type `source edtech.sql` to reset the database
    - Type `exit` to exit the program
- Start the react app
    - if you haven't install before run `npm install ./react-app` 
    - `npm start ./react-app`
- Start the node app
    - if you haven't install before run `npm install ./node-app` 
    - `npm start ./node-app/server.js`
- Point the "WEB_ADDRESS" value to the web address of the react server, which is found in `react-app/crypress/cypress.json`

### Execution
- position your terminal in `react-app` directory 
- run Cypress by typing `node_modules/.bin/cypress open`
    - You should now see the Cypress App.
- Login
    - Open a new tab
    - Visit `https://localhost:3000/`
    - Type in username: "gerald@edtechevaluation.com.au" password: "Gerald@Edtech"
- All test files are located inside `cypress/integration`
