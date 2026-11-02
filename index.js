const axios = require("axios");   // got changed to require.apply automatically so caused 4 errors btw
require("dotenv").config();

const {App} = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/lackbot-help",async({command,ack,respond}) => {
  await ack();      // I made the zen-quotes emoji just for this lol :)
  await respond({
    text: `Lackbot is a *slackbot* developed by <@U0AE3R4FR3R> which lacks a lot of *important features* :fah:
    Available Commands-
    1. /lackbot-help > Lists all commands available by the Lackbot slackbot. :hc-help:
    2. /lackbot-roll > Constantly rolls a number between 1 to 6. :let-it-cook: 
    3. /lackbot-ping > Checks the latency of the Lackbot. :happy_ping_sock:
    4. /lackbot-joke > Fetches a random Joke from the official Jokes API. :cat_laugh:
    5. /lackbot-quote > Fetches a random quote from ZEN api. :zen-quotes:`
  })
});

app.command("/lackbot-ping", async({command,ack,respond}) => {
  const start = Date.now();
  await ack();                    // did not knew that you can pass something in the ack("pass text here ig") block;
  await respond ({                 // update: It only changes text of another respond block 🥀
    text: `Initializing Ping :pls-just-work:`    // update: IT DOESNT WORK AT ALL
  });  
  const end = Date.now();        
  let reply_for_ping;
  const ping = end - start;
  if (ping <= 100) {
    reply_for_ping = `_Dam is *bro sitting* ON the server? Pretty fast :shrug3d:_`
  }
  else if (ping >= 1000) {
    reply_for_ping = `_OH GOD, is this guy in *Antartica* or smth :sob-pray:_`
  }
  else {
    reply_for_ping = `_Maybe try getting out of your room cause I heard wifi is faster there :3c: but :idk:_`
  };
  await respond ({
    text: `*lackbot is up!* :black-hole:\nRecorded Latency : :shard: ${ping}ms\n\n${reply_for_ping}`, // Added mx since the unit is not attached in .date
    replace_original: true        // replaces the original message GONNA USE IT ON EVEYRTHING NOW FR( DOESNT WORK FOR SUM REASON )
  })
});

app.command("/lackbot-roll", async({command,ack,respond}) => {
  await ack();
  await respond ({
    text: `Rolling... :pls-just-work:`
  });
  const aguments = command.text.split(' ');   // for some reason, it is .split(" ") in js whereas it's just .split() in py (defaults to space as cutting point)
  const first= parseInt(aguments[0]) || 1;  // Bruh parseInt is like the int() in python
  const second= parseInt(aguments[1]) || 6; // Or operator i.e. || defaults to second value if empty
  var defaultchecker;       // just used var because was not sure if let stays out of if block or not
  if (first === 1 && second === 6) {
    defaultchecker = `_Note: Either no custom arguments were passed, or the user was :sparkles:*classy*:sparkles: (Range => 1 to 6). :tuff:_`
  }
  else {
    defaultchecker = `_Argument Range => ${first} to ${second} :dice-roll:_`
  };  // basic stuff checks if user was lazy or nah (I am stupif I used square brackets for the if and else for sum reason)
  const roll= Math.floor(Math.random() * (second-first + 1)) + first; // copied from the week 4 guides + understood using AI
  await respond({
    text: `Roll is complete :black-hole:\nThe Roll was : ${roll} :peak:\n\n${defaultchecker}`,
    replace_original: true            // learnt this argumnet just 2 commands ago lmao
  })
});

(async () => {  // copied directly from the stardance guide
  await app.start();
  console.log("Bot is running!");
})();