# Descrption
This project is the back-end server implementation of EdTech Evaluation.
## Development Environment
- Node.js Version: 12.18.3 (includes npm 6.14.6)
- Express
- MySQL Version: Community-8.0.21.0
### Set up handbook
1. Install Node.js via the link: https://nodejs.org/en/download/
2. Redirect to the '/node-app' directory
3. Run `npm install` to install dependencies
## How to compile
Use 'node server.js' or 'npm start' to compile
Then you can enter http://localhost:3001/ to see the result.
## Running sql scripts
Having downloaded the sql scripts (EdtechEvaluation.sql) save them under MySql server\bin folder
1. Download and Install MySql workbench via link: https://dev.mysql.com/downloads/windows/installer/8.0.html
2. Redirect to MySql server\bin directory
3. Run the following commands
- `mysql -u root -p` followed by MySql password (for MySql connection)
- `source Edtech.sql`

Mysql configuration: 
- user: 'root',
- password: 'edtech',
- database: 'edtech'
