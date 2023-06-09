const User = require('../models/register');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Seller = require('../models/Seller');
const Inventory=require('../models/Inventory')


module.exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
      const { email, businessName, password, confirmPassword } = req.body;
      
      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password do not match' });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, businessName, password, confirmPassword });
      await newUser.save();
      res.redirect('/dashboard')
   
   console.log('user created succesfully')
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };






module.exports.loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body.email)
    // Check if the account exists
    const existingAccount = await User.findOne({ email });
    if (!existingAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Check if the password is correct
    if (existingAccount.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If the account and password are valid, you can proceed with your login logic
    // For example, you can generate a token and send it as a response
    // Here, we're simply sending a success message
    res.redirect('/homepage')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports.dashboard = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    res.render('dashboard', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports.dashboardSubmit = async (req, res) => {
  try {
      const { address, gst, logo, storeTimings, name } = req.body;
      console.log(req.body)
      // Create a new seller with store info
      const newSeller = new Seller({ address, gst, logo, storeTimings });
      await newSeller.save();

      // Create a new category
      const newCategory = new Category({ name: name });
      await newCategory.save();

      // Create a new subcategory with the selected category
      
    
      res.redirect('/inventory');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

module.exports.inventory = async (req, res) => {
  try {
    const { productName, mrp, sp, qty, images,} = req.body;
    
console.log(req.body)
    // Create a new instance of Inventory model
    const inventory = new Inventory({
      productName,
      mrp,
      sp,
      qty,
      images,
      
    });

    // Save the inventory to the database
    await inventory.save();

   res.redirect('/homepage')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports.homepage = async (req, res) => {
  try {
    // Fetch all the inventory items from the database
    const inventoryItems = await Inventory.find({});

    // Fetch the store info from the database
    const storeInfo = await Seller.findOne({});
    const userInfo = await User.findOne({});

    // Create a unique URL for the seller using their _id
    const sellerURL = `/seller/${storeInfo._id}`; // Replace '/seller' with the desired base URL for sellers
   
    // Pass the inventory items, store info, and seller URL to the homepage template for rendering
    res.render('homepage', { inventoryItems, storeInfo, sellerURL,userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



