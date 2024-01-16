const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
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
    constructor(username, password, usertype) {
      this.username = username;
      this.password = password;
      this.usertype = usertype;
    }
  }

//   const reviewSchema = new mongoose.Schema({
//     productModelName: String,
//     userId: String,
//     reviewRating: Number,
//     reviewText: String,
//     productCategory: String,
//     productPrice: Number,
//     storeId: Number,
//     storeCity: String,
//     storeState: String,
//     storeZip: Number,
//     productOnSale: String,
//     manufacturerName: String,
//     manufacturerRebate: String,
//     userAge: Number,
//     userGender: String,
//     userOccupation: String,
//     reviewRating: Number,
//     reviewDate: Date,
//     reviewText: String
//   });

// const ReviewModel = mongoose.model('reviews', reviewSchema);

//   app.post('/api/writeReview', async (req, res) => {
//     const {
//       productModelName,
//       userId,
//       reviewRating,
//       reviewText,
//       productCategory,
//       productPrice,
//       storeId,
//       storeCity,
//       storeState,
//       storeZip,
//       productOnSale,
//       manufacturerName,
//       manufacturerRebate,
//       userAge,
//       userGender,
//       userOccupation,
//       reviewDate,
//     } = req.body;
  
//     try {
//       const review = new ReviewModel({
//         productModelName,
//         userId,
//         reviewRating,
//         reviewText,
//         productCategory,
//         productPrice,
//         storeId,
//         storeCity,
//         storeState,
//         storeZip,
//         productOnSale,
//         manufacturerName,
//         manufacturerRebate,
//         userAge,
//         userGender,
//         userOccupation,
//         reviewDate,
//       });
  
//       await review.save();
//       res.status(201).send('Review added successfully');
//     } catch (error) {
//       console.error('Error adding review:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

  const shippingSchema = new mongoose.Schema({
    username: String,
    usertype: String,
    shippingFrom: String,
    whereGoing: String,
    whatItem: String,
    trackingNumber: Number,
    shippingDate: Date,
  });


  const AddShippingInfo = mongoose.model('shippackages', shippingSchema);

  app.post('/api/shipPackage', async (req, res) => {
    const {
      username,
      usertype,
      shippingFrom,
      whereGoing,
      whatItem,
      trackingNumber,
      shippingDate
    } = req.body;
  
    try {
      const review = new AddShippingInfo({
        username,
        usertype,
        shippingFrom,
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




// app.post('/api/getReviews', async (req, res) => {
//   try {
//       const { productModelName } = req.query;
//       console.log(productModelName)

//       const filter = productModelName ? { productModelName } : {};
//       console.log('filter', filter)
//       const reviews = await ReviewModel.find(filter);
//       console.log('reviews', reviews)
//       res.status(200).json(reviews);
//   } catch (error) {
//       console.error('Error fetching reviews:', error);
//       res.status(500).send('Internal Server Error');
//   }
// });

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


const localPackage = new mongoose.Schema({
  username: String,
  packageFrom: String,
  packageTo: String,
  orderNumber: Number,
  deliveryStatus: Boolean,
  Date: Date,
});


const AddLocalPackage = mongoose.model('localPackages', localPackage);

app.post('/api/localPackage', async (req, res) => {
  const {
    username,
    packageFrom,
    packageTo,
    orderNumber,
    deliveryStatus,
    Date
  } = req.body;

  try {
    const packageInfo = new AddLocalPackage({
      username,
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

app.post('/api/storeInventory', async (req, res) => {
  const {
    username,
    whatItem,
    location,
    orderNumber,
    Date,
    totalCost,
    numberofItems,
    typeofStorage
  } = req.body;

  try {
    const packageInfo = new AddInventory({
      username,
      whatItem,
      location,
      orderNumber,
      Date,
      totalCost,
      numberofItems,
      typeofStorage
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



// app.get('/retrieveShippingInfo/:trackingNumber', async (req, res) => {
//   const trackingNumberParam = req.params.trackingNumber;

//   try {
//     // Find the shipping info based on the trackingNumber
//     const shippingInfo = await AddShippingInfo.findOne({ trackingNumber: trackingNumberParam });

//     if (shippingInfo) {
//       // If a matching record is found, send it in the response
//       res.status(200).json({ success: true, data: shippingInfo });
//       console.log(shippingInfo)
//     } else {
//       // If no matching record is found, send a 404 status
//       res.status(404).json({ success: false, message: 'Shipping info not found' });
//     }
//   } catch (error) {
//     // Handle any errors that may occur during the database query
//     console.error('Error retrieving shipping info:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

  

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

// app.get('/api/getAllProducts', (req, res) => {
//     const query = 'SELECT * FROM ProductDetails';
//     db.query(query, (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.json(result);
//       }
//     });
//   });

// app.post('/api/getProducts', (req, res) => {
//   const { ProductType } = req.body;

//   const getProductQuery =
//     'SELECT * FROM ProductDetails WHERE ProductType = ?';

//   db.query(getProductQuery, [ProductType], (err, result) => {
//     if (err) {
//       console.error('Error getting products:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       // Assuming 'result' is an array of product objects
//       res.status(200).json({ products: result });
//     }
//   });
// });

// app.post('/api/getProduct', (req, res) => {
//   const { ProductName } = req.body;

//   const getProductQuery =
//     'SELECT * FROM ProductDetails WHERE ProductName = ?';

//   db.query(getProductQuery, [ProductName], (err, result) => {
//     if (err) {
//       console.error('Error getting product:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       // Assuming 'result' is an array of product objects
//       res.status(200).json({ products: result });
//     }
//   });
// });

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

  // app.post('/api/updateProduct', (req, res) => {
  //   const { productName, productPrice,productDescription ,productManufacturer,productDiscount, productCondition } = req.body;
  
  //   const deleteProductQuery =
  //     'UPDATE ProductDetails WHERE productName= ? VALUES';
  
  //   db.query(deleteProductQuery, [productName], (err, result) => {
  //     if (err) {
  //       console.error('Error registering user:', err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       res.status(200).send('Product Deleted successfully');
  //     }
  //   });
  // });

  // app.post('/api/updateProduct', (req, res) => {
  //   const {
  //     productName,
  //     productPrice,
  //     productDescription,
  //     productManufacturer,
  //     productDiscount,
  //     productCondition,
  //   } = req.body;
  
  //   const updateProductQuery = `
  //     UPDATE ProductDetails
  //     SET productPrice = ?,
  //         productDescription = ?,
  //         productManufacturer = ?,
  //         productDiscount = ?,
  //         productCondition = ?
  //     WHERE productName = ?
  //   `;
  
  //   db.query(
  //     updateProductQuery,
  //     [
  //       productPrice,
  //       productDescription,
  //       productManufacturer,
  //       productDiscount,
  //       productCondition,
  //       productName,
  //     ],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error updating product:', err);
  //         res.status(500).send('Internal Server Error');
  //       } else {
  //         res.status(200).send('Product updated successfully');
  //       }
  //     }
  //   );
  // });

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

  app.get('/api/getWarehouseLocation', (req,res) =>{
    let sql = "SELECT * from warehouselocations";
    db.query(sql,(err,result)=>{
      if (err) {
        console.error('Error getting stores:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send(result);
      }
    })
  })

  // app.get('/api/getOrders', (req,res) =>{
  //   let sql = "SELECT * from CustomerOrders";
  //   db.query(sql,(err,result)=>{
  //     if (err) {
  //       console.error('Error getting orders:', err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // })

  // app.post('/api/getOrder', (req, res) => {
  //   const { userName } = req.body;
  
  //   const getOrderQuery =
  //     'SELECT * FROM CustomerOrders WHERE userName= ?';
  
  //   db.query(getOrderQuery, [userName], (err, result) => {
  //     if (err) {
  //       console.error('Error registering user:', err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   });
  // });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
