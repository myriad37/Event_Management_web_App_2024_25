# Event-Management_Web_App_2024_25

Planify is an event booking system - a club under formation. Students will use Planify to register for the monthly tech talks and other networking events that is planned to be organized by the club.

- Database: PostgreSQL - We will be using relational database to store user, event and booking details. Relational SQL Databases are well suited for this.

- Containerization: Docker, to make sure the web app works as expected both on our development environemnt, and instructor's working environment, we decided to use Docker for containerization.

## How to Run this Project?
There are three steps to run this project.
#### Requirements
- Node Installed Machine (https://nodejs.org/en)
- Docker  (https://www.docker.com/)
- yarn (`npm i -g yarn`)
- Install POSTGERSQL

### Step 1 - Clone this Repository
    `
    git clone https://github.com/myriad37/Event_Management_web_App_2024_25.git
    `
  Make sure yarn is installed


### Step 2 - Run the backend
    `
    cd taatee-backend
    yarn install  
    (make sure your docker engine is running)
    yarn db:restart  
    yarn start  
    `

### Step 3 - Run the frontend
    cd taatee-frontend
    yarn install
    (make sure your docker engine is running)
    yarn load
    
### Step 4 - Run the backend tests
    `
    (First don't forget to install jest)
    yarn add --dev jest

    (If not installed add this: )
    yarn add --dev jest @nestjs/testing

    (Then start checking by this)
    yarn jest bookings.spec
    yarn jest events.spec
    yarn test users.spec  ( these are the unit test)

    yarn jest integrations.spec (this is for the integration testing)

## Group Members

| Full Name         | ID               |
|-------------------|------------------|
| Blen Gebre        | UGR/0847/15      |
| Saba Habtamu      | UGR/7546/15      |
| Kalafat Tezazu    | UGR/6048/15      |
| Foyate Getachew   | UGR/9380/15      |

