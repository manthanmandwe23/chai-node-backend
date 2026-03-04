// chai aur node js backend

difference between dev dependancies and dependancies is
dev dependancies is dependancies which we will use during development not during production
and main dependancies we use during both during production and development

chatgpt version:
dependencies → Packages required for the application to run in both development and production.
devDependencies → Packages required only during development, not needed to run the application in production.

nodemon: what it do when ever we save the file it automatically restart the server
npm i nodemon if we run this command it will install it as main dependencies therefore we use
npm i -D nodemon

another thing we use is prettier see what happen more than one people write the project so some use 3 tab spaces some 2 and some 4 sone use 1 inverted comma some 2 and many things so when we combine this codes it creates problem so to solve this problem we use prettier
npm i -D prettier
we can go to npmjs.com search prettier there we can see github link too which we can visit to read documentation


manthanmadwe_db_user
Z1lPCQuJUPQwBrVW
mongodb+srv://manthanmadwe_db_user:Z1lPCQuJUPQwBrVW@nodecluster.f390ulc.mongodb.net/
mongodb+srv://manthanmadwe_db_user:<db_password>@nodecluster.f390ulc.mongodb.net/
mongodb+srv://manthanmadwe_db_user:<db_password>@nodecluster.f390ulc.mongodb.net/

===========================================================================================

What is Express.js

Express.js is a web framework for Node.js used to build web servers and APIs easily.
Express helps you:
Create server
Handle routes (URLs)
Handle requests and responses
Build APIs
Add middleware (like CORS, authentication, etc.)

Why we store express() inside app variable
const app = express();
Because:
express is a function
calling express() creates an Express application instance
this instance controls your server

Think of a class as a blueprint and an instance as the real object created from that blueprint.
Example:
Blueprint = Car design
Instance = Actual car created using that design
You can create many cars from same blueprint.

express is a function which we store inside app we can use this app variable to access all the features express provides

-r dotenv/config --experimental-json-modules


// "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  // "typescript.format.placeOpenBraceOnNewLineForControlBlocks": true,
  // "typescript.format.placeOpenBraceOnNewLineForFunctions": true,
  // // "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  // "typescript.format.insertSpaceAfterTypeAssertion": true,
  // "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": true,
  // "typescript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
  // "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": true,
  // "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  // "typescript.format.insertSpaceAfterConstructor": true,
  // // "javascript.format.placeOpenBraceOnNewLineForFunctions": true,
  // "javascript.format.placeOpenBraceOnNewLineForControlBlocks": true,
  // "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
  // "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": true,
