//
// Alexa skill bitcoin Info
// @author Ido Green | @greenido
// @date 11/2017
// @see https://greenido.wordpress.com/2017/06/14/a-bitcoiner-info-action/
//
//
var express = require("express");
var alexa = require("alexa-app");
var request = require("request");

var BASE_URL = 'https://blockchain.info/q/';
// the actions we are supporting (get them from api.ai)
const ACTION_PRICE = 'price';
const ACTION_TOTAL = 'total';
const ACTION_MARKET = 'marketcap';
const EXT_PRICE = "24hrprice";
const EXT_TOTAL = "totalbc";
const EXT_MARKET_CAP = "marketcap";

var PORT = process.env.PORT || 3000;
var app = express();

// Setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("");
console.log("** Starting with building the bitcoin info skill");

// POST calls to / in express will be handled by the app.request() function
alexaApp.express({
  expressApp: app,
  checkCert: true,
  // sets up a GET route when set to true. This is handy for testing in development, but not recommended for production.
  debug: true
});

app.set("view engine", "ejs");

alexaApp.launch(function(request, response) {
  console.log("Bitcoin Info skill launched !");
  response.say('Hey! I can tell you the current bitcoin price or the market cap. What would you like to know?');
});

//
// The price intent
//
alexaApp.intent("Price", {
    "slots": {},
    "utterances": [
    ]
  },
  function(req, response) {
    console.log("* In price intent *");
    return getData(EXT_PRICE)
      .then(function (price) {
        console.log('the current bitcoin price: ' + price);
        response.say("The bitcoin price is " + price + " USD. Whould you like to know that market cap or total amount of bitcoins?");
      })
      .catch(function(err){
        console.log('ERR: ' + err);
        response.say(err);
      });
  }
);

//
// The market cap intent
//
alexaApp.intent("Market_cap", {
    "slots": {},
    "utterances": [
    ]
  },
  function(req, response) {
    console.log("* In Market cap intent *");
    return getData(EXT_MARKET_CAP)
      .then(function (marketCap) {
        const market = Math.round((marketCap / 1000000000) * 100) / 100
        console.log('the current bitcoin market cap is ' + market);
        response.say("The bitcoin market cap is " + market + " billions. Whould you like to know what is the price or total amount of bitcoins?");
      })
      .catch(function(err){
        console.log('ERR: ' + err);
        response.say(err);
      });
  }
);


//
// The total intent
//
alexaApp.intent("Total", {
    "slots": {},
    "utterances": [
    ]
  },
  function(req, response) {
    console.log("* In Total intent *");
    return getData(EXT_TOTAL)
      .then(function (total) {
        total = total / 1000000000;  
        console.log('the current total amount of bitcoins: ' + total);
        response.say("The current total amount of bitcoins is " + total +
                     ". Would you like to know the market cap or price?");
      })
      .catch(function(err){
        console.log('ERR: ' + err);
        response.say(err);
      });
  }
);

//
//
//
function getData(endpoint) {
  return new Promise(function(resolve, reject) {
    request({
      url: BASE_URL + endpoint,
      json: true
    }, function(err, res, body) {
      if (err || res.statusCode >= 400) {
        console.error(res.statusCode, err);
        return reject('Unable to get bitcoin data at the moment. Sorry!');
      }
      if (!body) {
       return reject('Unable to get bitcoin data at the moment. Sorry!');
      }
      resolve(body);
    });
  }); 
}

//
//
//
alexaApp.intent("AMAZON.CancelIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    console.log("Sent cancel response");
  	response.say("Ok, sure thing");
  	return;
  }
);

alexaApp.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    console.log("Sent stop response");
  	response.say("Alright, I'll stop. See you later!");
  	return;
  }
);

alexaApp.sessionEnded(function(request, response) {
  console.log("In sessionEnded");
  console.error('Alexa ended the session due to an error');
  // no response required
});

//
// helper function to check for numbers
//
function isNumeric(n) { 
  return !isNaN(parseFloat(n)) && isFinite(n); 
}

//
// Start the party
//
app.listen(PORT, () => console.log("Our Alexa skill is Listening on port " + PORT + "."));
