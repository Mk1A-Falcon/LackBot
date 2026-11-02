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

app.command("/lackbot-ping", async({command.ack,respond}) => {
  const start = Date.now();
  await ack("Ping Initiated.");   // did not knew that you can pass something in the ack() block;
  const end = Date.now();
  const ping = end - start;
  await respond ({
    text: `lackbot is up! :black-hole:\nRecorded Latency:${ping}`,
    replace_original: true
  })
});

