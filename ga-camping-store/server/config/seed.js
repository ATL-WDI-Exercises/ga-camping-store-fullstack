/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Item from '../api/item/item.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

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
