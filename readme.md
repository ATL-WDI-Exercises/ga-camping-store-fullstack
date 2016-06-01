# GA Camping Store

This is a simple Camping Store app built with the *MEAN* stack via the Yeoman
*angular-fullstack* generator.

## Steps to Reproduce This Project

The steps below will demonstrate how to create this project from scratch:

* [Step 1 - Setup The Project](#step-1---setup-the-project)
* [Step 2 - Install Additional Bower Components](#step-2---install-additional-bower-components)
* [Step 3 - Create a RESTful API Endpoint and Seed Data for Items](#step-3---create-a-restful-api-endpoint-and-seed-data-for-items)
* [Step 4 - Create a New Client Route for Items](#step-4---create-a-new-client-route-for-items)
* [Step 5 - Create ItemService and CartService](#step-5---create-itemservice-and-cartservice)
* [Step 6 - Implement the Items Controller and Items Filter](#step-6---implement-the-items-controller-and-items-filter)
* [Step 7 - Implement the Items View](#step-7---implement-the-items-view)
* [Step 8 - Create a New Route for the Items Detail View](#step-8---create-a-new-route-for-the-items-detail-view)
* [Step 9 - Call the Server to get the Items](#step-9---call-the-server-to-get-the-items)
* [Step 10 - Add RESTful endpoints and model for Shopping Cart](#step-10---add-restful-endpoints-and-model-for-shopping-cart)
* [Step 11 - Integrate the Client Cart with the Server Cart](#step-11---integrate-the-client-cart-with-the-server-cart)
* [Step 12 - Deploying to Heroku](#step-12---deploying-to-heroku)
* [Notes on Deploying to Heroku](#notes-on-deploying-to-heroku)

### Step 1 - Setup The Project

1a. Install the [Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack) Yeoman generator.

```bash
npm install -g generator-angular-fullstack
```

1b. Create a new directory for this project and run the Yeoman Generator.

```bash
mkdir ga-camping-store
cd ga-camping-store
yo angular-fullstack
```

When prompted, you can choose all of the default values.

1c. Browse the new project:

Use `sublime` to look at the newly scaffolded _MEAN Stack_ project.

Notice that we have the following files in our project's home directory:

* `bower.json` - our _bower_ managed (client-side) dependencies
* `package.json` - our _npm_ managed (server-side) dependencies
* `gulpfile.babel.js` - configuration for the _gulp_ builds
* `.gitignore` - a nice git ignore file pre-filled with most of what we will need to ignore.
* `client` - directory containing all of our client code (HTML/CSS/AngularJS)
* `server` - directory containing all of our server code (Express)

1d. Initialize Git repo and commit all changes:

```bash
git init
git add -A
git commit -m "Created the project."
git tag step1
```

1e. Summary

In this step we used the `angular-fullstack` _Yeoman_ generator to scaffold a new _MEAN Stack_ app. The generator created all of our gulp, bower, npm, and git configuration files as well as starter code for both our client and our server.

### Step 2 - Install Additional Bower Components

2a. Install the `angular-animate` and `animate.css` components:

```bash
bower install --save angular-animate
bower install --save animate.css
```

2b. Edit `client/app/app.js` and add the 'ngAnimate' module to our app module's dependencies:

```javascript
'use strict';

angular.module('gaCampingStoreApp', [
                 'gaCampingStoreApp.auth',
                 'gaCampingStoreApp.admin',
                 'gaCampingStoreApp.constants',
                 'ngCookies',
                 'ngResource',
                 'ngSanitize',
                 'btford.socket-io',
                 'ui.router',
                 'ui.bootstrap',
                 'validation.match',
                 'ngAnimate'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
```

2c. Commit changes:

```bash
git add -A
git commit -m "Added some bower components."
git tag step2
```
