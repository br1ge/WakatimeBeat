# WakaTime Beat

## Using

Install deps

```
npm i
```

Start

```
npm start
```

## Config

**DEVICE** & **BROWSER** & **OS** - Parameters for creating a UserAgent (You can find the correct spelling of the parameters in the `user-agents.json` file)

**API_KEY** - WakaTime API key

**MACHINE** - The device you're using

**PLATFORM** - Which OS do you use (Uses the `sec-ch-ua-platform` request header, the parameters can be googled)

**PROJECT** - The project you're working on

**BRANCH** - The branch you're working on

**LANGUAGE** - The language you're working on

**FILE_PATH** - The file you're working on

**CURSOR** - Which line are you working on

**LINES** - How many lines are in the file

**PLUGIN** - Name and version of the IDE and plugin

**INTERVAL** - How often to send requests

**WORK_MIN** & **WORK_MAX** - A number will be selected in this interval. How many times will the request be sent before the pause

**PAUSE_MIN** & **PAUSE_MAX** - A number will be selected in this interval. How long will the pause be
