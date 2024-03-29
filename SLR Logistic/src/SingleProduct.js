import React, { useEffect, useState } from 'react';
import "./style.css";
import { useCart } from './CartContext';
import {Link, useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';




function Doorlocks() {
    let { ProductName } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const { addToCart } = useCart();
  const [usertype, setUserType] = useState('');
  const [notification, setNotification] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    let ut = sessionStorage.getItem('usertype');
    setUserType(ut);
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () =>{
    fetch('http://localhost:8000/api/getProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ProductName: ProductName, 
      }),
    })
      .then((response) => response.json())
      // console.log(response)
      .then((data) => {
        console.log('data', data)
        setProductDetails(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const handleWriteReview = (product) => {
    setSelectedProduct(product);
    setShowReviewForm(true);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
  };

  const handleBuyNow = (product) => {
    addToCart({ ...product, quantity: 1 });
    setNotification(`"${product.productName}" added to cart!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleDelete = async ({...product}) =>{
    try{
      let prd = {...product}
      let productName = prd.productName;
      console.log(productName)
      const response = fetch('http://localhost:8000/api/deleteProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName
      }),
      
    }).then(getProducts());
    
    if (!response.ok) {
      // const errorMessage = await response.text();
      throw new Error('error');
    }

    setProductDetails((prevProducts) =>
      prevProducts.filter((p) => p.productName !== productName)
    );

  }catch(error){
    console.error('Error logging user:', error.message);
  }
  }
    
    

  return (
    <div className='prd-container' style={{textAlign:'center'}}>
      <h1>{ProductName}</h1>
      <ul className="single-prd-grid-container">
        {productDetails.map((product, index) => (
            // <Link to={`/${productDetails.name}`}>
          <li key={index} className="grid-item">
            <h2>{product.productName}</h2>
            <h3>{product.productManufacturer}</h3>
            <h4>{product.productDescription}</h4>
            <h4>Price: ${product.productPrice}</h4>
            <h4>Discount: ${product.productDiscount}</h4>
            <Link to={`/viewProduct/${product.productName}`}>
            <img
              src={`/images/${product.productImage}`}
              alt="Product Image"
              onError={() => console.log(`Error loading image for ${product.productName}`)}
            /></Link>
            <input
              type="submit"
              className="btn-buy"
              value="Buy Now"
              onClick={() => handleBuyNow(product)}
            />
            <Link to={`/ReviewForm/${product.productName}`}><input
              type="submit"
              className="btn-review"
              value="Write Review"
              onClick={() => handleWriteReview(product)}
            />
            </Link>
            {usertype === 'manager' && (
              <>
                <input
                  type="submit"
                  className="btn-danger"
                  value="Delete"
                  onClick={() => handleDelete(product)}
                />
                <input
                  type="submit"
                  className="btn-update"
                  value="Update"
                  onClick={() => handleBuyNow(product)}
                />
              </>
            )}
          </li>
        //   </Link>
        ))}
      </ul>
      {notification && (
        <div className="notification-container">
          <div className="notification">
            <p>{notification}</p>
          </div>
        </div>
      )}
            {showReviewForm && (
        <ReviewForm
          productModelName={selectedProduct.productName}
          onClose={closeReviewForm}
        />
      )}
    </div>
  );
}

export default Doorlocks;
