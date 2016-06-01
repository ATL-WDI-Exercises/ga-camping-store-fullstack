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

---

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

---

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

2c. Run a `gulp` build

Let's do a full `gulp` build to update any files that depend on the new client-side dependencies:

```bash
gulp build
```

2d. Commit changes:

```bash
git add -A
git commit -m "Added some bower components."
git tag step2
```

2e. Summary

We used `bower` to install two new client-side dependencies. We added one of them (`ng-animate`) to our `angular.module` declaration so that it would get properly bootstrapped by angular. We did *not* need to add `animate.css` to our `angular.module` declaration because it is not an _Angular_ module (`animate.css` is a simple CSS library).

---

### Step 3 - Create a RESTful API Endpoint and Seed Data for Items

In this step we will use a _sub-generator_ of the _angular-fullstack_ generator to create a new RESTful API endpoint for our Camping Store inventory items. Then we will define a proper Schema for our `Item` _Mongoose_ model. Finally we will add some seed data for our inventory items.

3a. Use the Yeoman `angular-fullstack` generator to create a new RESTful endpoint:

```bash
yo angular-fullstack:endpoint item
```

Accept the default value for the url.

The following files have just been added or modified for you:

```
new file:   server/api/item/index.js
new file:   server/api/item/index.spec.js
new file:   server/api/item/item.controller.js
new file:   server/api/item/item.events.js
new file:   server/api/item/item.integration.js
new file:   server/api/item/item.model.js
new file:   server/api/item/item.socket.js
modified:   server/config/socketio.js
modified:   server/routes.js
```

3b. Observations:

* The generator created the directory `server/api/item` and placed into that directory the controller, events, model, socketio, and unit testing code for our items RESTful endpoint.
* The main `socketio.js` config file was updated.
* the main `routes.js` file was updated.

3c. Edit the file `server/api/item/item.model.js` and set the schema to:

```javascript
var ItemSchema = new mongoose.Schema({
  name:        String,
  category:    String,
  price:       { type: Number, min: 0, max: 9999.99 },
  qty:         { type: Number, min: 0, max: 999 },
  rating:      { type: Number, min: 0, max: 5.0 },
  description: String,
  imageFile:   String
});
```

Add the following to the `server/config/seed.js` file:

```javascript
import Item from '../api/item/item.model';   // add this near the top of the file


// add the following at the bottom of the file
Item.find({}).remove()
.then(() => {
  return Item.create(
    {
      category: 'Tents',
      name: '1-person Tent',
      price: 119.99,
      qty: 1,
      rating: 3.8,
      description: 'A very small tent.',
      imageFile: '1_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '2-person Tent',
      price: 169.99,
      qty: 1,
      rating: 4.4,
      description: 'Just right for 2 people.',
      imageFile: '2_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '3-person Tent',
      price: 249.99,
      qty: 1,
      rating: 3.5,
      description: '3 is a crowd!',
      imageFile: '3_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '4-person Tent',
      price: 319.99,
      qty: 1,
      rating: 4.7,
      description: 'Fit for a family.',
      imageFile: '4_person_tent.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Small Flashlight',
      price:   6.99,
      qty: 1,
      rating: 4.0,
      description: 'A very small flashlight.',
      imageFile: 'small_flashlight.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Large Flashlight',
      price:  12.99,
      qty: 1,
      rating: 4.3,
      description: 'A big, powerful flashlight.',
      imageFile: 'large_flashlight.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Small Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 2.7,
      description: 'Holds 16 ounces.',
      imageFile: 'small_water_bottle.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Large Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 3.1,
      description: 'Holds 32 ounces.',
      imageFile: 'large_water_bottle.jpg'
    },
    {
      category: 'Stoves',
      name: 'Small Stove',
      price:  29.99,
      qty: 1,
      rating: 3.5,
      description: 'Has 1 burner.',
      imageFile: 'small_stove.jpg'
    },
    {
      category: 'Stoves',
      name: 'Large Stove',
      price:  39.99,
      qty: 1,
      rating: 4.7,
      description: 'Has 2 burners.',
      imageFile: 'large_stove.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Simple Sleeping Bag',
      price:  49.99,
      qty: 1,
      rating: 4.4,
      description: 'A simple mummy bag.',
      imageFile: 'simple_sleeping_bag.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Deluxe Sleeping Bag',
      price:  79.99,
      qty: 1,
      rating: 4.8,
      description: 'Will keep you warm in very cold weather!',
      imageFile: 'deluxe_sleeping_bag.png'
    }
  )
})
.then(() => {
  return Item.find({});
})
.then((items) => {
  console.log('Finished populating ' + items.length + ' items.');
})
.catch((err) => {
  console.log('ERROR:', err);
});
```

If you have `grunt serve` running and you save the `seed.js` file you should see the message "Finished populating 12 items." You can also verify that the seed data was saved to `mongodb` using `mongo` or a tool like [mongo-express](http://andzdroid.github.io/mongo-express/).

3c. Test out your new RESTful endpoint:

A simple test is to load the _index_ route for the items via your browser. Simply load the following URL in your browser:

    http://localhost:9000/api/items

You should see the seed data in `JSON` format returned from the Express server!

3d. Commit your work

```bash
git add -A
git commit -m "Created a RESTful API Endpoint, Schema, and Seed Data for Items."
git tag step3
```

3e. Summary

In this step we used a _sub-generator_ of the _angular-fullstack_ generator to create a new RESTful API endpoint for our camping store items. Then we updated the generated _Mongoose_ model to define the _schema_ for an `item`. Finally we added some seed data for our camping store items.

---

### Step 4 - Create a New Client Route for Items

In this step we will create a new _client-side_ route for our items. Note that in the _MEAN Stack_ we have both _server-side_ and _client-side_ routes:

* _server-side_ routes - consist of the RESTful endpoints that our client code can call via HTTP GET/PUT/POST/DELETE requests.
* _client-side_ routes - consist of the views that we can navigate to inside our _AngularJS_ application.

4a. Use the Yeoman generator to create a new client route for our items view:

```bash
yo angular-fullstack:route items
```

Accept the default values for the module name, source location, and url of the route.

4b. Edit the file `client/components/navbar/navbar.html` and remove the `ng-controller` attribute. We don't need it as it is specified in the `navbar.directive.js` file (this is a bug in the generator).

change this:

```html
<div class="navbar navbar-default navbar-static-top" ng-controller="NavbarController">
```

to this:

```html
<div class="navbar navbar-default navbar-static-top">
```

Also change the following line:

```html
<a href="/" class="navbar-brand">ga-camping-store</a>
```

to this:

```html
<a href="/" class="navbar-brand">Home</a>
```

and add this line after the `Admin` link:

```html
<li ng-show="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="items">Items</a></li>
```

4c. Test out your NavBar and new _Client-Side_ route:

You may need to restart your server (using `gulp serve`). Then login and see if the NavBar contains the _Items_ link. Click on it and see if your _Items_ view appears.

4d. Commit your work

```bash
git add -A
git commit -m "Created a new Client Route for Items."
git tag step4
```

### Step 5 - Create ItemService and CartService

5a. Use the Yeoman generator to create two new client services:

```bash
yo angular-fullstack:service itemService
yo angular-fullstack:service cartService
```

When prompted, accept the default values except change the module name for each service to `gaCampingStoreApp` instead of `gaCampingStoreApp.itemService` and `gaCampingStoreApp.cartService`.

5b. Edit `client/app/items/itemService/itemService.service.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp.itemService')
  .service('itemService', function($http) {

    var svc = this;

    svc.findItemById = function(id) {
      return $http.get('/api/items/' + id);
    };

    svc.getItems = function() {
      return $http.get('/api/items');
   };
  });
```

5c. Edit `client/app/cartService/cartService.service.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
  .service('cartService', function ($http, Auth) {

    var that = this;

    that.getCart = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/cart/');
    };

    that.addItem = function(item) {
      var userId = Auth.getCurrentUser()._id;
      return $http.post('/api/users/' + userId + '/cart/' + item._id);
    };

    that.removeItem = function(cartItem) {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/cart/' + cartItem._id);
    };

    that.getCost = function(cartItem) {
      return cartItem.qty * cartItem.item.price;
    };

    that.getTotal = function(cart) {
      var total = _.reduce(cart, function(sum, cartItem) {
        return sum + that.getCost(cartItem);
      }, 0);
      return total;
    };

    that.clearCart = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/cart/');
    };
  });
```

5d. Commit your work

```bash
git add -A
git commit -m "Created ItemService and CartService."
git tag step5
```

5e. Summary

In this step we created the _Client-Side_ services `ItemService` and `CartService`. These services have the responsibility of communicating with the server to manage the Inventory and the current user's Shopping Cart.
