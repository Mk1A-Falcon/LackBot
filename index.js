const axios = require("axios");   // got changed to require.apply automatically so caused 4 errors btw
require("dotenv").config();

const {App, ExpressReceiver} = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/lackbot-help",async({command,ack,respond}) => {
  await ack();      // I made the zen-quotes emoji just for this lol :)
  await respond({
    text: `Lackbot is a *slackbot* developed by <@U0AE3R4FR3R> which lacks a lot of *important features* :fah:
    *Available Commands-*
    1. /lackbot-help > Lists all commands available by the Lackbot slackbot. :hc-help:
    2. /lackbot-roll > Constantly rolls a number between 1 to 6. :let-it-cook: 
    3. /lackbot-ping > Checks the latency of the Lackbot. :happy_ping_sock:
    4. /lackbot-joke > Fetches a random Joke from the official Jokes API. :cat_laugh:
    5. /lackbot-quote > Fetches a random quote from ZEN api. :zen-quotes:
    *Events-* :feels-the-aura:
    1. "_I am so proud of|proud|:happy_ping_sock:_" > Responds with a message, in channel*`
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


app.command("/lackbot-joke",async({command,ack,respond}) => {
  await ack("_they see me rolling, they hating :sparkles:_"); // read the documentation here http://www.official-joke-api.appspot.com/random_joke (main website is unsafe igb)
  try {                                                       // in case the api is down or something
    const response = await axios.get("http://www.official-joke-api.appspot.com/random_joke");
    await respond ({
      text: `_${response.data.setup}_\n\n${response.data.punchline}`, // so one thing about axios which is diff than fetch() is that it gives all the return data in the .data property mhm
      response_type: "in_channel",
    })
  }                 // response type here is used to send it to the channel and not just "oNLY Visible by you"
  catch(err) {
    console.log(err);
    await respond({           // look at albert over here ig
      text: `_Looks like the Joke API had to make a joke... :think:_\n\n*But it was on you instead* :cat_laugh::3d-sad-emoji:\n(Caught error => Logging :black-hole:)`
    })   
  }
});

app.command("/lackbot-quote", async({command,ack,respond}) => {
  await ack();
  await respond ({
    text: `_*"Monday left me broken"*_\n\n_By_ <@U0AE3R4FR3R> (Loading quote... :pls-just-work:) `
  });
  try{
    const response = await axios.get("https://zenquotes.io/api/random");
    const quote = response.data[0].q;   // It gives a list which has a dict. inside it
    const author = response.data[0].a;    
    await respond({
      text: `*_"${quote}_"*\n\n _by_ ${author}`,
      response_type : "in_channel"
    });
  }
  catch (err) {
    console.log(err);
    await respond ({
      text: `_Monday apparently left you broken too_:cat_laugh::3d-sad-emoji:\n\n_*Logging Error*_ :pls-just-work:`
    });
  };
});


// bunch of pre-formatted replies similar to the hack club slackbot one


app.message(/(I am so proud of|proud|:happy_ping_sock:)/i, async ({message,say}) => {
  try {
    if (message.subtype === 'bot_message') {return};
    await say ({        // aah Idk what to explain here tbh, new attributes =>  message say instead of the usual command, ack, respond 
      text: "_*Aww So cute*_ :blahaj-heart::aww:"
    });
  }
  catch(err) {
    console.log(err);
    await say ({
      text: "_the bot had a error while responding :( :black-hole:_\n\n_logging error_ :pls-just-work:"
    });
  };
});


app.message(/Insert b2b here|b2b here|b2b when/i, async ({message,say}) => { 
  try {
    if (message.subtype === `bot_message`) {return};
    await say ({
      text: `What did the baguette do this time : https://hackclub.enterprise.slack.com/docs/T0266FRGM/F0BNZ7QGEUQ`
    });
  }
  catch(boo) {
    console.log(boo);
    await say ({
      text: `_Unable to Insert b2b at this time_ :pf:`
    });
  };
});


app.message(/b2b is goog|b2b is love/i, async ({message,say}) => {
  try {
    if (message.subtype === "bot_message") {return};
    await say ({
      text: "*_b2b is life_* :sparkles:"
    });
  }
  catch (boo) {
    console.log(boo)
    await say ({
      text: `Unable to say smth :(\n\n_logging error_`
    })
  };
});


(async () => {  // copied directly from the stardance guide
  await app.start();
  console.log("Bot is running!");
})();