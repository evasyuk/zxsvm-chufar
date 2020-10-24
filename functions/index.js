const functions = require('firebase-functions');

process.env.BABEL_DISABLE_CACHE = '1'
require("@babel/register")({
  extends: './.babelrc',
  ignore: [/node_modules/],
  extensions: [".js"],
})
require('@babel/polyfill')
const app = require('./src/App').default

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.bot = functions.https.onRequest(app);

exports.info = functions.https.onRequest((req, res) => {
  res.send("/info");
});
