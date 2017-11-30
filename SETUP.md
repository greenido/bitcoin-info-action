## What You'll Need

*   An [Amazon Developer Account](https://developer.amazon.com)

## Background

### How Alexa Apps Work

To get started, it's useful to know how Alexa apps work as there's some custom terminology that you need to know about. So Alexa is the name of the voice service that powers Amazon's Echo. Alexa provides capabilities, that Amazon terms Skills, which enable people to interact with devices using their voice. A skill could be the ability to play music, set an alarm or something else. Within each skill might be multiple actions - so the ability to play music might involve the actions of play, pause, skip etc.

Every action a skill can perform is called an [Intent](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference#intent-schema-syntax-json). It's a fitting name, because while there might be many ways a person could trigger that action - they might say “play X” or “I want to listen to X”, all of those requests have the same intent. So for all of the ways you can think of that someone might try to trigger the intent, you create what's known as an Utterance. The more utterances you define the better - it makes the interaction with Alexa seem more human. 

Utterances are flexible too - they have Slots, which are like variables, and you can use multiple slots in each utterance. There are a number of different slot types that are supported by Alexa by default, like dates, times and city names. But you can also [create your own](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference#slot-types). So you might say 'what will the horoscope for {Sign} be on {Date}', where Sign is a custom slot, and Date is a default slot.

### How The Code Works

This project uses [alexa-app](https://github.com/alexa-js/alexa-app), which does the dirty work of interpreting JSON requests from Amazon and building the JSON response. So all the code in this project does is tell Alexa what to say in different scenarios.

If a user requests the forecast and provides a day, then we get the weather from forecast.io, turn it into a friendly sounding comment, and then request Alexa say it. Otherwise, if they don't specify a day, then we let the user know one is needed.

## How To Set Up Your Alexa App

First, [remix this app](https://glitch.com/edit/#!/remix/alexa-skill) so you have your own copy of the code.

Then [register for an account](https://darksky.net/dev/register), and [get an API key from forecast.io](https://darksky.net/dev/account). Then copy and paste your API key into the `.env` file in your Glitch project.

We now need to make Alexa aware of your app, and make it accessible to it. So go to [Amazon's developer site](https://developer.amazon.com/edw/home.html#/skills/list) (and create an account if you don't have one). Then under the 'Alexa' section, select 'Alexa Skills Kit' and from there click on 'Add a new Skill'.

*   #### 1\. Skill Information

    Select the 'Custom Interaction Model' option for 'Skill Type'. Give your app a name, say 'Weather bot' and choose an invocation name - this is the name you say to Alexa to activate your skill, so 'Alexa ask InvocationName…'.
    
*   #### 2\. Interaction Model

    You want to specify your Intent Schema and Sample Utterances. Thankfully, this is made easy by alexa-app - if you click 'Show', you can copy and paste the text in the 'Utterances' and 'Schema' sections.

*   #### 3\. Configuration

    Under Endpoint, select 'HTTPS' and add your project's publish URL. This is the URL you get when clicking 'Show', and it'll have the format 'https://project-name.glitch.me'. So for our example app, it's 'https://alexa-skill.glitch.me/'. Select 'no' for account linking.
    
*   #### 4\. SSL Certificate

    Select the option 'My development endpoint is a subdomain of a domain that has a wildcard certificate from a certificate authority' as we sort this for you.
    
*   #### 5-7\. Test, Publishing Information and Privacy

    Make sure your skill has testing enabled under 'Test' and enter metadata about your app under 'Publishing Information'. For now, you can just enter basic info and come back and change it later when you're ready to properly publish your app. Say 'no' to the privacy questions and check your agreement to their terms. Then you can click 'Save' and your app should be ready to test (you don't want to submit it for certification at this stage - that's just for when your app is ready to go).

### Testing Your Alexa App

To get the real impression of using an Amazon Echo, you can use [Echosim](https://echosim.io/). If you log in with your Amazon developer account, it'll automatically know about your app. So you can go ahead and click and hold the mic button and give Alexa a test command. Say "Ask InvocationName what's the weather for today". In your project, with the logs open, you can see the request coming in, the response being generated and sent back.