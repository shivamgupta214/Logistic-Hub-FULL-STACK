const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'slrdatabase',
});

mongoose.connect('mongodb://localhost:27017/slrdatabase', { useNewUrlParser: true, useUnifiedTopology: true });


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

class User {
    constructor(username, password, usertype, address, zipCode, city, state, country) {
      this.username = username;
      this.password = password;
      this.usertype = usertype;
      this.address = address;
      this.zipCode = zipCode;
      this.city = city;
      this.state = state;
      this.country = country;
    }
  }
  const shippingSchema = new mongoose.Schema({
    // userId: String,
    whereGoing: String,
    whatItem: String,
    trackingNumber: Number,
    shippingDate: Date,
  });


  const AddShippingInfo = mongoose.model('shippackages', shippingSchema);

  app.post('/api/shipPackage', async (req, res) => {
    const {
      userId,
      whereGoing,
      whatItem,
      trackingNumber,
      shippingDate
    } = req.body;
  
    try {
      const review = new AddShippingInfo({
        userId, 
        whereGoing,
        whatItem,
        trackingNumber,
        shippingDate
      });
  
      await review.save();
      console.log(review)
      res.status(201).send('Shipment added successfully');
    } catch (error) {
      console.error('Error adding shipment:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/api/getShipment', async (req, res) => {
  try {
    const { trackingNumber } = req.body; // Assuming trackingNumber is sent in the request body
    console.log('trackingNumber:', trackingNumber);

    const filter = trackingNumber ? { trackingNumber } : {};
    console.log('filter:', filter);

    const shipments = await AddShippingInfo.findOne(filter);
    console.log('shipments:', shipments);

    res.status(200).json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.post('/api/getLocalDelivery', async (req, res) => {
//   try {
//     const { orderNumber, deliveryStatus } = req.body; // Assuming trackingNumber is sent in the request body
//     console.log('trackingNumber:', orderNumber);

//     const filter = orderNumber ? { orderNumber } : {};
//     console.log('filter:', filter);

//     const shipments = await AddLocalPackage.findOne(filter);
//     console.log('shipments:', shipments);

//     res.status(200).json(shipments);
//   } catch (error) {
//     console.error('Error fetching shipments:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post('/api/getLocalDelivery', async (req, res) => {
  try {
    const { orderNumber } = req.body;

    const filter = { orderNumber : orderNumber };
    const update = { $set: { deliveryStatus: true } };
    console.log('this is filter', filter)
    console.log('this is update', update)
    const result = await AddLocalPackage.updateOne(filter, update);
    console.log('this is result', result)
    if (result.nModified > 0) {
      console.log('Document updated successfully');
      res.status(200).json({ success: true });
    } else {
      console.log('No document found with the specified order number');
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/api/getAllLocalOrders', async (req, res) => {
  try {


    const shipments = await AddLocalPackage.find();
    console.log('shipments:', shipments);

    res.status(200).json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send('Internal Server Error');
  }
});

const storeInventory = new mongoose.Schema({
  username: String,
  whatItem: String,
  location: String,
  orderNumber: Number,
  Date: Date,
  totalCost: Number,
  numberofItems: Number,
  typeofStorage: String
});

const AddInventory = mongoose.model('storeinventory', storeInventory);

app.get('/api/getAllInventoryOrders', async (req, res) => {
  try {
    // const { trackingNumber } = req.body; // Assuming trackingNumber is sent in the request body
    // console.log('trackingNumber:', trackingNumber);

    // const filter = trackingNumber ? { trackingNumber } : {};
    // console.log('filter:', filter);

    const shipments = await AddInventory.find();
    console.log('shipments:', shipments);

    res.status(200).json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/api/getAllInventoryOrders', async (req, res) => {
//   try {


//     const shipments = await storeInventory.find();
//     console.log('shipments:', shipments);

//     res.status(200).json(shipments);
//   } catch (error) {
//     console.error('Error fetching shipments:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });



app.post('/api/getShipmentByUserID', async (req, res) => {
  try {
    const { trackingNumber } = req.body; // Assuming trackingNumber is sent in the request body
    console.log('trackingNumber:', trackingNumber);

    const filter = trackingNumber ? { trackingNumber } : {};
    console.log('filter:', filter);

    const shipments = await AddShippingInfo.findOne(filter);
    console.log('shipments:', shipments);

    res.status(200).json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send('Internal Server Error');
  }
});


const localPackage = new mongoose.Schema({
  // userId: String,
  packageFrom: String,
  packageTo: String,
  orderNumber: Number,
  deliveryStatus: Boolean,
  Date: Date,
});


const AddLocalPackage = mongoose.model('localPackages', localPackage);

app.post('/api/localPackage', async (req, res) => {
  const {
    // userId,
    packageFrom,
    packageTo,
    orderNumber,
    deliveryStatus,
    Date
  } = req.body;

  try {
    const packageInfo = new AddLocalPackage({
      // userId,
      packageFrom,
      packageTo,
      orderNumber,
      deliveryStatus,
      Date
    });
    console.log("before", packageInfo)
    await packageInfo.save();
    console.log("after", packageInfo)
    res.status(201).send('Order added successfully');
  } catch (error) {
    console.error('Error adding shipment:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/findUser', (req, res) => {
  const { user } = req.body;

  const selectUserQuery = 'SELECT * FROM registration WHERE username = ?';

  db.query(selectUserQuery, [user], (err, results) => {
    if (err) {
      console.error('Error selecting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(results)
      if (results.length > 0) {
        const user = new User(
          results[0].username,
          results[0].password,
          results[0].usertype,
          results[0].address,
          results[0].zipCode,
          results[0].city,
          results[0].state,
          results[0].country,
        );
        console.log("THis is user data from find", user);
        res.send({
          status:200,
          message:"Found Successfully",
          data:{user}
        });
      //   res.status(200).json({ user });
      } else {
        res.status(401).send('Invalid username');
      }
    }
  });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const selectUserQuery = 'SELECT * FROM registration WHERE username = ? AND password = ?';
  
    db.query(selectUserQuery, [username, password], (err, results) => {
      if (err) {
        console.error('Error selecting user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results)
        if (results.length > 0) {
          const user = new User(
            results[0].username,
            results[0].password,
            results[0].usertype
          );
          console.log(user);
          res.send({
            status:200,
            message:"Login Successful",
            data:{user}
          });
        //   res.status(200).json({ user });
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    });
  });

app.get('/api/getAllProducts', (req, res) => {
    const query = 'SELECT * FROM ProductDetails';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  });

app.post('/api/getProducts', (req, res) => {
  const { ProductType } = req.body;

  const getProductQuery =
    'SELECT * FROM ProductDetails WHERE ProductType = ?';

  db.query(getProductQuery, [ProductType], (err, result) => {
    if (err) {
      console.error('Error getting products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Assuming 'result' is an array of product objects
      res.status(200).json({ products: result });
    }
  });
});

app.post('/api/getProduct', (req, res) => {
  const { ProductName } = req.body;

  const getProductQuery =
    'SELECT * FROM ProductDetails WHERE ProductName = ?';

  db.query(getProductQuery, [ProductName], (err, result) => {
    if (err) {
      console.error('Error getting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Assuming 'result' is an array of product objects
      res.status(200).json({ products: result });
    }
  });
});

app.post('/api/registerUser', (req, res) => {

  const { username, password, repassword, usertype, address, zipCode, city, state, country} = req.body;

  const registerUserQuery =
    'INSERT INTO registration (username, password, repassword, usertype, address, zipCode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(registerUserQuery, [username, password, repassword, usertype, address, zipCode, city, state, country], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(req.body)

      res.status(200).send('User registered successfully');
    }
  });
});

  app.post('/api/addProduct', (req, res) => {
    const { productName, productType, productPrice, productImage, productManufacturer, 
      productCondition, productDiscount, productDescription} = req.body;
  
    const addProductQuery =
      'INSERT INTO ProductDetails (productName, productType, productPrice, productImage, productManufacturer, productCondition, productDiscount, productDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(addProductQuery, [productName, productType, productPrice, productImage, productManufacturer, 
      productCondition, productDiscount, productDescription], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Product Added successfully');
      }
    });
  });
  
  app.post('/api/addOrder', (req, res) => {
    const { orderId, userName, productName, productPrice, street, creditCard, deliveryMethod, storeLocation} = req.body;
  
    const addOrderQuery =
      'INSERT INTO CustomerOrders (OrderId, userName, orderName, orderPrice, userAddress, creditCardNo, deliveryMethod, storeLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(addOrderQuery, [orderId, userName, productName,productPrice, street, creditCard, deliveryMethod, storeLocation], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Order Added successfully');
      }
    });
  });
  app.post('/api/deleteProduct', (req, res) => {
    const { productName } = req.body;
  
    const deleteProductQuery =
      'DELETE FROM ProductDetails WHERE productName= ?';
  
    db.query(deleteProductQuery, [productName], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Product Deleted successfully');
      }
    });
  });
 
  app.post('/api/updateUser', (req, res) => {

    const { user, password, repassword, usertype, address, zipCode, city, state, country} = req.body;
  
    const updateUserQuery =
      'UPDATE registration SET password = ?, repassword = ?, usertype = ?, address = ?, zipCode = ?, city = ?, state = ?, country = ? WHERE username = ?';
    
    db.query(updateUserQuery, [password, repassword, usertype, address, zipCode, city, state, country, user], (err, result) => {
      if (err) {
        
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log("This data is passing in updateuser", req.body)
        
        res.status(200).send('User updated successfully');
      }
    });
  });
  

  app.post('/api/addUser', (req, res) => {

    const { username, password, repassword, usertype, address, zipCode, city, state, country} = req.body;

    const registerUserQuery =
      'INSERT INTO registration (username, password, repassword, usertype, address, zipCode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(registerUserQuery, [username, password, repassword, usertype, address, zipCode, city, state, country], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(req.body)

        res.status(200).send('User registered successfully');
      }
    });
  });


  app.post('/api/addCustomer', (req, res) => {
    const { name, password, usertype } = req.body;
  
    const addCustomerQuery = `
      INSERT INTO Registration (username, password, repassword, usertype)
      VALUES (?, ?, ?, ?)
    `;
  
    db.query(
      addCustomerQuery,
      [name, password, password, usertype],
      (err, result) => {
        if (err) {
          console.error('Error adding customer:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Customer added successfully');
        }
      }
    );
  });
  
  

  app.get('/api/getStores', (req,res) =>{
    let sql = "SELECT * from store";
    db.query(sql,(err,result)=>{
      if (err) {
        console.error('Error getting stores:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
      }
    })
  })

  app.get('/api/getOrders', (req,res) =>{
    let sql = "SELECT * from CustomerOrders";
    db.query(sql,(err,result)=>{
      if (err) {
        console.error('Error getting orders:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
      }
    })
  })

  app.get('/api/getAllUsers', (req,res) =>{
    let mn = 'manager'
    let sql = "SELECT * from registration WHERE usertype != ?";
    console.log("Request coming form frontend", sql)
    db.query(sql,[mn],(err,result)=>{
      if (err) {
        console.error('Error getting orders:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
      }
    })
  })

  app.get('/api/usersInfo', (req,res) =>{
    let ut = 'customer'
    let sql = "SELECT zipCode, COUNT(*) as userCount FROM registration WHERE usertype = ? GROUP BY zipCode";
    db.query(sql,[ut],(err,result)=>{
      if (err) {
        console.error('Error getting stores:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
        console.log(res);
      }
    })
  })


  app.post('/api/getOrder', (req, res) => {
    const { userName } = req.body;
  
    const getOrderQuery =
      'SELECT * FROM CustomerOrders WHERE userName= ?';
  
    db.query(getOrderQuery, [userName], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
      }
    });
  });

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
