# WORKING WITH ENVIRONMENT VARIABLES
Since Firebase FireFunctions has perverted environment variable set/get system that requires deep code implementation, I decided to hack the way how environment variables appears in the app.

In order to deploy application successfully, I created "generateConfig.js" script that transforms .enc to _AppConfigGenerated.js source file.

It uses every time project is going to be served to deployed
