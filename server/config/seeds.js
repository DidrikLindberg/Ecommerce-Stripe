const db = require('./connection');
const { User, Product, Category } = require('../models');
const dotenv = require('dotenv');
dotenv.config();




db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Smart Lighting' },
    { name: 'Energy Management' },
    { name: 'Home Security' },
    { name: 'Environmental Sensors' },
  ]);


  console.log('categories seeded');

  await Product.deleteMany();
  const s3BaseUrl = 'https://smartproducts.s3.us-west-1.amazonaws.com/';


  const products = await Product.insertMany([
    {
        name: 'Smart LED Bulb',
        description:
          'Energy-efficient LED bulb with remote control and color-changing capabilities.',
        image: s3BaseUrl + 'Smart LED Bulb.jpg',
        category: categories[0]._id,
        price: 19.99,
        quantity: 200,
      },
      {
        name: 'Smart Thermostat',
        description:
          'Programmable thermostat that helps you save energy by optimizing heating and cooling.',
        image: s3BaseUrl + 'smart-thermostat.jpg',
        category: categories[1]._id,
        price: 149.99,
        quantity: 100,
      },
      {
        name: 'Smart Doorbell',
        description:
          'Video doorbell with motion detection and smartphone integration for enhanced security.',
        image: s3BaseUrl + 'smart-doorbell.jpg',
        category: categories[2]._id,
        price: 199.99,
        quantity: 50,
      },
      {
        name: 'Environmental Monitoring System',
        description:
          'A set of sensors that track indoor air quality, temperature, and humidity for a healthier home.',
        image: s3BaseUrl + 'environmental-monitor.jpg',
        category: categories[3]._id,
        price: 89.99,
        quantity: 75,
      },
      {
        name: 'Smart Power Strip',
        description:
          'Energy-efficient power strip with individual outlets and remote control.',
        image: s3BaseUrl + 'smart-power-strip.jpg',
        category: categories[1]._id,
        price: 29.99,
        quantity: 150,
      },
      {
        name: 'Smart Lock',
        description:
          'Keyless entry system with smartphone access for improved home security.',
        image: s3BaseUrl + 'smart-lock.jpg',
        category: categories[2]._id,
        price: 249.99,
        quantity: 40,
      },
      {
        name: 'Solar-Powered Smart Blinds',
        description:
          'Automated blinds that adjust to natural light and can be controlled remotely.',
        image: s3BaseUrl + 'smart-blinds.jpg',
        category: categories[0]._id,
        price: 149.99,
        quantity: 60,
      },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Demo',
    lastName: 'User1',
    email: 'demo@user.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
  
});
