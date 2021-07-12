# Full-Stack-JS-Challenge

Overview
Below is a Node.js function that a developer has written. It is an express middleware that processes users' invitations to use private shops.
    ●	req and res are the express request and response objects
    ●	superagent is a module that makes http requests and is on npm
    ●	"User" and "Shop" are mongoose models


Step 1
Analyse the function below and provide answers to the following questions:

●	Q: What do you think is wrong with the code, if anything?
●	Answer:
    ○	- The function violates the principle of single responsibility, it adresses both User and Shop models, handles requests for both of them;
    ○	- Maintainability of the code will be difficult as any new additions and features will affect the existing code because of the way the function is programmed (spaghetti coding);
    ○	- Entities must have its own models with controllers and services and thus, have its functions isolated from other entities; Controllers, separated for each entity, receive the call and return response to the client side and the services call the DB model to consume it and also can translate the data in case if it is needed.

●	Q: Can you see any potential problems that could lead to exceptions
●	Answer: - There are no try and catch so the server can be left hanging in case of a bad request for example

●	Q: How would you refactor this code to:
    ○	Make it easier to read
    ○	Increase code reusability
    ○	Improve the stability of the system
    ○	Improve the testability of the code
●	Answer:
    ○	In order to make code more readable the deep nesting of the conditionals should be avoided and different logic should be separated to dedicated layers;
    ○	In order to increase code reusability nested methods could be extracted;
    ○	The stability of the system could be improved by implementing layered structure, that way when changes or additional features need to be added it will be easier to implement them without affecting the rest of the functionality; 
    ○	Testability of the code will be improved if layered logic is implemented, that way we can test each controller and service separately;

●	Q: How might you use the latest JavaScript features to refactor the code?
●   Answer: We can try implementing promises, public and private classes, private getters and setters, logical assignment operators

Step 2
Provide a sample refactor with changes and improvements you might make. The refactored code does not have to be executable; it will only be used for discussion.

Note: /sapmple-refactor folder contains priliminary refactoring tries (function-initial-refactor.js) of the ptovided function and a folder with an example of what layers can be created in order to separate the logic futher (/structure-sample).