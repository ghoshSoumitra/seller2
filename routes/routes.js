const express = require('express');
const router = express.Router();
const User=require('../models/register')
const Category=require('../models/Category');
const Seller=require('../models/Seller');
const Subcategory=require('../models/Subcategory');
const Inventory=require('../models/Inventory');
const userController = require('../controllers/userController');
router.post('/',userController.loginAccount)
router.post('/login', userController.loginAccount);
router.post('/register', userController.createUser);
router.get('/dash-info', userController.dashboard);

// Route for handling the dashboard form submission
router.post('/dash-info', userController.dashboardSubmit);


// Route: POST /inventory
router.post('/inventory', userController.inventory);
router.get('/homepage', userController.homepage);
router.get('/seller/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the inventory items associated with the sellerId
    const inventoryItems = await Inventory.find({ sellerId: id });
    const userInfo = await User.findOne({});
    // Fetch the store info from the database
    const storeInfo = await Seller.findOne({ _id: id });
    const sellerURL = `/seller/${storeInfo._id}`;
    // Render the inventory template with the inventoryItems and storeInfo
    res.render('Homepage', { inventoryItems, storeInfo,sellerURL,userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;