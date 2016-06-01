# GA Camping Store

This is a simple Camping Store app built with the *MEAN* stack via the Yeoman
*angular-fullstack* generator.

## Steps to Reproduce This Project

The steps below will demonstrate how to create this project from scratch:

* [Step 1 - Setup The Project](#step-1---setup-the-project)


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
      imageFile: 'inventory/1_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '2-person Tent',
      price: 169.99,
      qty: 1,
      rating: 4.4,
      description: 'Just right for 2 people.',
      imageFile: 'inventory/2_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '3-person Tent',
      price: 249.99,
      qty: 1,
      rating: 3.5,
      description: '3 is a crowd!',
      imageFile: 'inventory/3_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '4-person Tent',
      price: 319.99,
      qty: 1,
      rating: 4.7,
      description: 'Fit for a family.',
      imageFile: 'inventory/4_person_tent.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Small Flashlight',
      price:   6.99,
      qty: 1,
      rating: 4.0,
      description: 'A very small flashlight.',
      imageFile: 'inventory/small_flashlight.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Large Flashlight',
      price:  12.99,
      qty: 1,
      rating: 4.3,
      description: 'A big, powerful flashlight.',
      imageFile: 'inventory/large_flashlight.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Small Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 2.7,
      description: 'Holds 16 ounces.',
      imageFile: 'inventory/small_water_bottle.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Large Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 3.1,
      description: 'Holds 32 ounces.',
      imageFile: 'inventory/large_water_bottle.jpg'
    },
    {
      category: 'Stoves',
      name: 'Small Stove',
      price:  29.99,
      qty: 1,
      rating: 3.5,
      description: 'Has 1 burner.',
      imageFile: 'inventory/small_stove.jpg'
    },
    {
      category: 'Stoves',
      name: 'Large Stove',
      price:  39.99,
      qty: 1,
      rating: 4.7,
      description: 'Has 2 burners.',
      imageFile: 'inventory/large_stove.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Simple Sleeping Bag',
      price:  49.99,
      qty: 1,
      rating: 4.4,
      description: 'A simple mummy bag.',
      imageFile: 'inventory/simple_sleeping_bag.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Deluxe Sleeping Bag',
      price:  79.99,
      qty: 1,
      rating: 4.8,
      description: 'Will keep you warm in very cold weather!',
      imageFile: 'inventory/deluxe_sleeping_bag.png'
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



### Step 4 - Add RESTful endpoints and model for Shopping Cart

In this step we will be saving the user's shopping cart to the MongoDB database. Each time a user adds or removes an item from the shopping cart an update will occur to keep the cart up to date in the database.

We will begin by creating a set of RESTful endpoints along with a server controller, model, and schema. The RESTful endpoints will be:

```
GET    /api/users/:userid/cart/            # Get the cart
POST   /api/users/:userid/cart/            # Add an item to the cart
DELETE /api/users/:userid/cart/:itemid     # Remove an item from the cart
DELETE /api/users/:userid/cart/            # Remove all items from the cart
```

4a. Use the Yeoman generator to create the new RESTful endpoint for our cart:

```bash
yo angular-fullstack:endpoint cart
? What will the url of your endpoint be? /api/users/:userId/cart
```

4b. Edit `server/api/cart/index.js` and replace the routes with the following:

```javascript
router.get   ('/:userid/cart/',        controller.get);
router.post  ('/:userid/cart/:itemid', controller.addItem);
router.delete('/:userid/cart/:itemid', controller.removeItem);
router.delete('/:userid/cart/',        controller.removeAllItems);
```

4c. Rename `server/api/cart/cart.model.js` to `server/api/cart/cartitem.model.js`:

```bash
mv server/api/cart/cart.model.js server/api/cart/cartitem.model.js
```

and sets its contents to:

```javascript
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item : {
    type : Schema.Types.ObjectId,
    ref: 'Item'
  },
  qty : Number
});

module.exports = mongoose.model('CartItem', CartItemSchema);
```

4d. Edit `server/api/user/user.model.js` and add the lines:

```javascript
// add this near the top:
import CartItem from '../cart/cartitem.model';

...
  // add this to the UserSchema:
  cart: [CartItem.schema]
```

4e. Replace the contents of `server/api/cart/cart.controller.js` with:

```javascript
'use strict';

import _ from 'lodash';
import CartItem from './cartitem.model';
import Item from '../item/item.model';
import User from '../user/user.model';

function findItemInCart(user, id) {
  // _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
  return _.find(user.cart, function(cartItem) {
    // return cartItem.item === id;    // does not work!
    console.log('Comparing ' + cartItem.item + ' to ' + id);
    return cartItem.item.equals(id) || cartItem._id.equals(id);
  });
}

// Get the cart from the DB.
exports.get = function(req, res) {
  console.log('get, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);

  User.findById(userId)
  .populate('cart.item')
  .exec(function(err, user) {
    console.log('user: ' + user.name);
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    console.log('returning cart: ' + JSON.stringify(user.cart));
    res.json(200, user.cart);
  });
};

// Add a new item to the cart or update the qty and return the cart.
exports.addItem = function(req, res) {
  console.log('addItem, url = ' + req.url);
  var userId = req.params.userid.trim();
  var itemId = req.params.itemid.trim();
  console.log('userId: ' + userId + ', itemId: ' + itemId);

  Item.findById(itemId, function(err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.send(404); }
    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }

      // Check if item is already in cart
      var found = findItemInCart(user, item._id);
      if (found) {
        console.log('Found item ' + item.name + ' in cart, therefore incrementing qty');
        found.qty = found.qty + 1;
      }
      else {
        console.log('Adding item to cart: ' + item.name);
        user.cart.push( new CartItem( { item: item, qty: 1 } ) );
      }
      user.save(function() {
        user.populate('cart.item', function(err, user) {
          return res.json(201, user.cart );
        });
      });
    });
  });
};

// Remove an item from the cart and return the cart.
exports.removeItem = function(req, res) {
  console.log('removeItem, url = ' + req.url);
  var userId = req.params.userid;
  var cartItemId = req.params.itemid;
  console.log('userId: ' + userId + ', cartItemId: ' + cartItemId);

  // Remove the item, get the updated cart, and return the cart
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    // Check if item is already in cart
    var found = findItemInCart(user, cartItemId);
    if (found) {
      console.log('Removing item from cart');
      user.cart.pull(found._id);               // pull is a feature of MongooseArray!
    }
    else {
      return res.send(404);
    }
    user.save(function() {
      user.populate('cart.item', function(err, user) {
        return res.json(201, user.cart );
      });
    });
  });
};

// Remove all items from the cart in the DB.
exports.removeAllItems = function(req, res) {
  console.log('removeAllItems, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);

  // remove all items from cart and return the cart
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    user.cart = [];
    user.save(function() {
      user.populate('cart.item', function(err, user) {
        return res.send(204, user.cart);
      });
    });
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
```

4f. Edit `/server/api/cart/cart.events.js` and replace `Item` with `CartItem`:

```javascript
import CartItem from './cartitem.model';      // was import Cart from

CartItem.schema.post(e, emitEvent(event));    // was Cart.schema
```

4g. Edit `server/routes.js` and replace the line:

`app.use('/api/users/:userId/cart', require('./api/cart'));`

with:

`app.use('/api/users',  require('./api/cart'));`

4h. Commit your work:

```bash
git add -A
git commit -m "Added RESTful endpoints and model for Shopping Cart."
git tag step4
```

4i. Summary

In this step we added a Shopping Cart to our User model and we added the cart RESTful endpoints as nested URLs under the user URL.

---

### Step 5 - Create a New Client Route for Items

In this step we will create a new _client-side_ route for our items. Note that in the _MEAN Stack_ we have both _server-side_ and _client-side_ routes:

* _server-side_ routes - consist of the RESTful endpoints that our client code can call via HTTP GET/PUT/POST/DELETE requests.
* _client-side_ routes - consist of the views that we can navigate to inside our _AngularJS_ application.

5a. Use the Yeoman generator to create a new client route for our items view:

```bash
yo angular-fullstack:route items
```

Accept the default values for the module name, source location, and url of the route.

5b. Edit the file `client/components/navbar/navbar.html` and remove the `ng-controller` attribute. We don't need it as it is specified in the `navbar.directive.js` file (this is a bug in the generator).

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

5c. Test out your NavBar and new _Client-Side_ route:

You may need to restart your server (using `gulp serve`). Then login and see if the NavBar contains the _Items_ link. Click on it and see if your _Items_ view appears.

5d. Commit your work

```bash
git add -A
git commit -m "Created a new Client Route for Items."
git tag step5
```

5e. Summary

We added a _Client-Side_ route for our items view.

---

### Step 6 - Create ItemService and CartService

6a. Use the Yeoman generator to create two new client services:

```bash
yo angular-fullstack:service itemService
yo angular-fullstack:service cartService
```

When prompted, accept the default values except change the module name for each service to `gaCampingStoreApp` instead of `gaCampingStoreApp.itemService` and `gaCampingStoreApp.cartService`.

6b. Edit `client/app/items/itemService/itemService.service.js` and set its contents to:

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

6c. Edit `client/app/cartService/cartService.service.js` and set its contents to:

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

6d. Commit your work

```bash
git add -A
git commit -m "Created ItemService and CartService."
git tag step6
```

6e. Summary

In this step we created the _Client-Side_ services `ItemService` and `CartService`. These services have the responsibility of communicating with the server to manage the Inventory and the current user's Shopping Cart.

---

### Step 7 - Implement the Items Controller and Items Filter

7a. Edit `client/app/items/items.controller.js` and set its content to:

```javascript
'use strict';
(function(){

class ItemsComponent {
  constructor($state, itemService, cartService) {
    this.$state = $state;
    this.itemService = itemService;
    this.cartService = cartService;
    this.searchText = '';
    this.cart = [];

    // Load cart data from server
    this.cartService.getCart().then((json) => {
      this.updateCartFromServer(json.data);
    });

    // load inventory items from server
    this.getInventory();
  }

  find(cart, item) {
    var len = cart.length;
    for (var i = 0; i < len; i++) {
      if (cart[i]._id === item._id) {
        return cart[i];
      }
    }
    return null;
  }

  // diff the cartFromServer with our current cart and make the incremental modifications
  // doing it this way makes our animation work.
  updateCartFromServer(cartFromServer) {
    // add cartItems in cartFromServer not found in this.cart
    var len = cartFromServer.length;
    var cartItem;
    for (var i = 0; i < len; i++) {
      cartItem = cartFromServer[i];
      if (!this.find(this.cart, cartItem)) {
        this.cart.splice(i, 0, cartItem);
      }
    }

    // check for remove or update
    i = this.cart.length;
    while (i--) {
      cartItem = this.cart[i];
      // remove cartItems in this.cart not found in cartFromServer
      var found = this.find(cartFromServer, cartItem);
      if (!found) {
        this.cart.splice(i, 1);
      }
      // update cartItems in this.cart this have a different qty in cartFromServer
      else if (cartItem.qty !== found.qty) {
        cartItem.qty = found.qty;
      }
    }
  }

  getInventory() {
    this.itemService.getItems().then((json) => {
      this.inventory = json.data;
    });
  }

  addItem(item) {
    this.cartService.addItem(item).then((json) => {
      this.updateCartFromServer(json.data);
    }, function(err) {
      console.log('ERROR: addItem: ' + JSON.stringify(err));
    });
  }

  removeItem(item) {
    this.cartService.removeItem(item).then((json) => {
      this.updateCartFromServer(json.data);
    }, function(err) {
      console.log('ERROR: removeItem: ' + JSON.stringify(err));
    });
  }

  getCost(item) {
    return this.cartService.getCost(item);
  }

  clearCart() {
    return this.cartService.clearCart().then((json) => {
      this.updateCartFromServer(json.data);
    }, function(err) {
      console.log('clearCart delete ERROR: ' + JSON.stringify(err));
    });
  }

  goItem(item) {
    this.$state.go('itemDetail', {
      itemId: item._id
    });
  }

  getTotal() {
    return this.cartService.getTotal(this.cart);
  }
}

angular.module('gaCampingStoreApp')
  .component('items', {
    templateUrl: 'app/items/items.html',
    controller: ItemsComponent
  });

})();
```

7b. Use the Yeoman generator to create a new AngularJS filter for our Item Search feature.

```bash
yo angular-fullstack:filter itemFilter
? What module name would you like to use? gaCampingStoreApp
? Where would you like to create this filter? client/app/items
```

7c. Put the following code into `client/app/items/itemFilter/itemFilter.filter.js`:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
  .filter('itemFilter', function() {
    function isMatch(str, pattern) {
      return str.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
    }

    return function(inventory, searchText) {
      var items = {
        searchText: searchText,
        out: []
      };
      angular.forEach(inventory, function (item) {
        if (isMatch(item.category   , this.searchText) ||
            isMatch(item.name       , this.searchText) ||
            isMatch(item.description, this.searchText) ) {
          this.out.push(item);
        }
      }, items);
      return items.out;
    };
  });
```

7d. Commit your work

```bash
git add -A
git commit -m "Implemented the Items Controller and Items Filter."
git tag step7
```

7e. Summary

In this step we implemented the Items Controller logic and added a custom _Angular_ filter for our Items.

---

### Step 8 - Implement the Items View

8a. Edit `client/app/items/items.html` and replace its contents with:

```html
<section class="container search">
  <form class="navbar-form" role="search">
    <div class="form-group">
      <input type="text" class="form-control" name="search" ng-model="$ctrl.searchText" placeholder="Search">
    </div>
    <button type="clear" class="btn btn-warning"
            ng-click="$ctrl.searchText = ''">Reset</button>
  </form>
</section>

<section class="container items">
  <div class="list-group">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 animate-inventory"
           ng-repeat="item in filteredItems = ( $ctrl.inventory | itemFilter : $ctrl.searchText | orderBy: ['category', 'price'] )">
        <a ng-click="$ctrl.goItem(item)" class="list-group-item">
          <h3>{{ item.name }}</h3>
          <article class="row">
            <div class="col-xs-5">
              <img class="middle" width=96px ng-src="/assets/images/{{item.imageFile}}"/>
            </div>
            <div class="col-xs-7">
              <dl class="dl-horizontal">
                <dt>Category:</dt>
                <dd>{{ item.category }}</dd>
                <dt>Price:</dt>
                <dd>{{ item.price | currency }}</dd>
                <dt>Rating:</dt>
                <dd>{{ item.rating }} / 5</dd>
              </dl>
            </div>
          </article>
        </a>
        <div class="text-center">
          <button class="btn btn-sm btn-success" ng-click="$ctrl.addItem(item)">Add to Cart</button>
        </div>
      </div>
      <div class="animate-inventory text-center" ng-hide="filteredItems.length">
        <h3>No items match your search.</h3>
      </div>
    </div>
  </div>
</section>

<section class="cart text-center">
  <h2>Your Cart:</h2>
  <ul>
    <li class="cart animate-cart" ng-repeat="item in $ctrl.cart">
      <span>{{ item.qty + ' x ' + item.item.name + ' = ' + ($ctrl.getCost(item) | currency) }}</span>
      <button class="btn btn-danger btn-xs" ng-click="$ctrl.removeItem(item)">Remove Item</button>
    </li>
  </ul>
  <h3>Total: {{ $ctrl.getTotal() | currency }}</h3>
  <br>
  <button class="btn btn-danger" ng-click="$ctrl.clearCart()">Clear Cart</button>
</section>
```

8b. Edit `client/app/app.scss` and add the following after the `browsehappy` rule:

```css
.thumbnail {
  height: 200px;

  img.pull-right {
    width: 50px;
  }
}

/* Space out content a bit */
body {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-left: 15px;
  padding-right: 15px;
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;

  /* Make the masthead heading the same height as the navigation */
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 40px;
    padding-bottom: 19px;
  }
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;

  .btn {
    font-size: 21px;
    padding: 14px 24px;
  }
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;

  p + h4 {
    margin-top: 28px;
  }
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  .container {
    max-width: 900px;
  }

  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-left: 0;
    padding-right: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
```

8c. Edit `client/app/items/items.scss` and add the following content:

```css
.cart {
  padding: 10px;

  ul {
    list-style-type: none;
  }
}

.on-sale {
  color: red;
}

.qty {
  width: 60px;
}

$animation-duration: 0.25s;

.animate-inventory {
  &.ng-enter {
    animation: zoomInUp 0.5s;
  }
  &.ng-leave {
    animation: zoomOutDown 0.5s;
  }
}

.animate-cart {
  &.ng-enter {
    animation: fadeInRight 1s;
  }
  &.ng-leave {
    animation: fadeOutLeft 1s;
  }
}

/* =========================== */
/* Twitter Bootstrap Overrides */
/* =========================== */
.jumbotron {
  text-align: center;
  padding: 2px 0;
  margin-bottom: 0;
}

.list-group-item {
  border: none;
}

.dl-horizontal dt {
    text-align: left;
    /*margin-bottom: 1em;*/
    /*width: auto;*/
    padding-right: 1em;
}

.dl-horizontal dd {
    margin-left: 0;
    margin-bottom: 1em;
}
/* ================================== */
/* End of Twitter Bootstrap Overrides */
/* ================================== */

.items {
  padding-left: 0;
  padding-right: 30px;
}

.items p {
  font-size: 2.0rem;
  margin-left: 20px;
}

.items h3 {
  color: #337ab7;
}

.item {
  margin-top: 30px;
}

.item h2 {
  margin-bottom: 20px;
}

.item-image {
  margin-top: 0px;
  margin-left: 20px;
}

.item-image img {
}

.back {
  margin-top: 40px;
}

.search {
  text-align: center;
}
```

8d. Copy the camping store images for our items into this project:

Run the following command to copy the camping store item images from GitHub into this project:

```bash
cd client/assets/images
svn export https://github.com/drmikeh/ga_camping_store_angular/trunk/src/assets/images/inventory
cd ../../..
```

8e. Commit your work

```bash
git add -A
git commit -m "Implemented the Items Views and CSS."
git tag step8
```

### Step 9 - Create a New Route for the Items Detail View

Coming Soon!!!


