# LackBot 
![text](https://hackatime.hackclub.com/api/v1/badge/U0AE3R4FR3R/LackBot)   
A slackbot for my personal channel to <s>bully</s>, I mean a HackClub slackbot that lacks some necessary features....  
Based off the guide [Make a slackbot](https://stardance.hackclub.com/missions/slack-bot) but delves deeper into the topic of slackbots by utilizing events, commands, api fetches, automated responses and AI capabilities!

### Here, are the _list of commands_ LackBot supports -
1. _**/lackbot-help**_ > Lists all commands available by the Lackbot slackbot.  
2. _**/lackbot-roll**_ > Constantly rolls a number between 1 to 6.   
3. _**/lackbot-ping**_ > Checks the latency of the Lackbot.   
4. _**/lackbot-joke**_ > Fetches a random Joke from the official Jokes API.     
5. _**/lackbot-quote**_ > Fetches a random quote from ZEN api.   
6. _**/lackbot-brief**_ > Similar to App_Mentions but responds using AI in a brief and more private manner using **GPT-6 Luna**_(1st model)_, **Claude Haiku 5.5**_(Fallback-1)_ and **Gemini Flash Lite 3.5**_(Fallback-2)_ (only visible to user/op). 

### Event Subscriptions -
1. _I am so proud of_ _| proud |_ :_happy__ping__sock_: -> Responds with a message, in channel.
2. _b2b is love | b2b is goog_ -> Responds with a message, in channel.
3. _Insert b2b here | b2b here | b2b when_ -> Responds with the Idea canvas of B2B.   
4. **AI PING** _(< arguments > @LackBot < arguments >)_ -> Responds using AI with **Gemini 3.5 Flash/ 3.1 Flash-lite**

+ Note-  
Official Jokes API is apparently down at the moment. So `/lackbot-joke` might not work as intended :(

<img src="https://cdn.hackclub.com/01a1c892-dab2-73e0-8c35-f61512d7c6d6/image.png">

<img src="https://user-cdn.hackclub-assets.com/01a1c895-46a1-71f7-98df-32e4d8055d5a/image.png">

## Local Setup Instructions-
```
git clone https://github.com/Mk1A-Falcon/LackBot.git
cd ping-dinos
cp .env.example .env     # add your own tokens from slack-dev, hcai etc.
cp config.example.js config.js  # add your own config details and admin users.  
npm install
node index.js
```
#### Make sure that your instance of the bot also has the following permissions/bot-scopes via api.slack.com-   

![bot scopes](https://cdn.hackclub.com/01a1c8cb-74e3-7ea8-b944-546f1ed91f65/image.png)
#### And also event subscriptions-
![event susbscriptions](https://cdn.hackclub.com/01a1c8cc-bd2b-7808-9aff-f049c06601f2/image.png)

Anyways, I had a fun time building this bot and so did my 43 testers (they made me force feed a lot of, straight up complete threads in the name of "lore")  
Will probably work on adding memory via Postgresql but would like to call this the end for now :)
