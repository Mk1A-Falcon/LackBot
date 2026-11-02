const axios = require.apply("axios");
require("dotenv").config();

const {App} = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/lackbot-help",async({command,ack,respond}) => {
  await ack();
  await respond({
    text: `Lackbot is a slackbot developed by <@U0AE3R4FR3R> which lacks a lot of important features :fah:
    Available Commands-
    1. /lackbot-help > Lists all commands available by the Lackbot slackbot.
    2. /lackbot-roll > Constantly rolls a number between 1 to 6.
    3. /lackbot-ping > Checks the latency of the Lackbot.
    4. /lackbot-joke > Fetches a random Joke from the official Jokes API.
    5. /lackbot-quote > Fetches a random quote from ZEN api.`
  })
});

app.command("/lackbot-ping", async({command,ack,respond}) => {
  const start = Date.now();
  await ack("Ping Initiated.");   // did not knew that you can pass something in the ack() block;
  const end = Date.now();
  const ping = end - start;
  await respond ({
    text: `lackbot is up! :black-hole:\nRecorded Latency:${ping}`,
    replace_original: true        // replaces the original message GONNA USE IT ON EVEYRTHING NOW FR
  })
});

app.command("/lackbot-roll", async({command,ack,respond}) => {
  await ack("Rolling... :pls-just-work");
  const aguments = command.text.split(' ');   // for some reason, it is .split(" ") in js whereas it's just .split() in py (defaults to space as cutting point)
  const first= parseInt(aguments[0]) || 1;  // Bruh parseInt is like the int() in python
  const second= parseInt(aguments[1]) || 6; // Or operator i.e. || defaults to second value if empty
  var defaultchecker;       // just used var because was not sure if let stays out of if block or not
  if (first === 1 && second === 6) {
    defaultchecker = `Note: Either no custom arguments were passed, or the user was classy (Range => 1 to 6). :tuff:`
  }
  else {
    defaultchecker = `Argument Range => ${first} to ${second} :dice-roll:`
  };  // basic stuff checks if user was lazy or nah (I am stupif I used square brackets for the if and else for sum reason)
  const roll= Math.floor(Math.random() * (second-first + 1)) + first;
  await respond({
    text: `Roll is complete :black-hole:\nThe Roll was : ${roll} :peak:\n${defaultchecker}`,
    replace_original: true
  })
});