# Project name: ZXSVM-chufar
(backend: NodeJS app)

# Description
ZXSVM-chufar is the pet-project, created to hit several aims:
1. For fun (to spend free time)
2. Proof of concept for "google sheets as CMS"
3. Pretty useful info with chat bots

"chufar" - goes from "Church Fathers"

Further idea transformed from one particular topic "orthodox celebration this day" to several topics 
as a subscription for particular user(daylight info, moon phase, celebrations today etc)

# Dependencies
0. OS
    - OS X 10.14.6
1. node -v
    - v14.6.0
2. npm -v:
    - 6.14.6
3. firebase --version
    - 8.10.0

# Setup Firebase services
ref: https://firebase.google.com/docs/cli

0. install cli tools

1. login to Google account

2. init project

3. Generate new service key at "Firebase console, settings, Firebase Admin SDK"

4. Add service key to project and CI/CD(if necessary)

5. Upgrade project to paid plan(setup billing info) in order to use networking feature(and some other)
    - you can use Firebase console
    - you can use GCP console

6. Enable Google Sheets API in Google account
- setup service account
- create Google sheet and save doc ID
- add email of service account to Google sheet as editor

- steps: https://blog.stephsmith.io/tutorial-google-sheets-api-node-js/

# Installation (dev)
0. Get copy of sourcess
    - git clone "this repo"

1. Install dependencies
    - npm install
    - cd functions && npm install

2. Setup local Firebase project
	- firebase init
	- verify
		- functions/firebase-adminsdk.json
		- fucntions/credentials-sheet.json (need to double-check)
		- .firebaserc

3. Setup .env files
	- take a look at .env.example
	- produce ".env.dev" and ".env.production" files
	
	- hint: use 2 different bots to support production and debug versions

4. Run development server
    - npm run serve

5. Test application manually
    - npm run debug


# Features
1. CI/CD
    - (..Pending..)

2. Hosting
    - Firebase Functions

3. Testing
    - (..Pending..)

4. Tech stack
    - NodeJS environment
    - Koa
    - Firebase Functions
    - Google Sheets API

5. Backend app features
    - dev mode for functions(emulate webhooks with )
    - debug mode for telegram bot
    - custom "action" system

# API documentation
1. Postman docs
	- (..Pending..)

# Examples
1. Live
    - (..Pending..)

2. Screenshots
    - (..Pending..)

# License
MIT

