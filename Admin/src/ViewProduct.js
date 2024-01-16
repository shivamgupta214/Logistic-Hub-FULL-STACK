import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import './ViewProduct.css'

function ViewProduct({ match }){
    // const { productName } = match.params;
    let { productName } = useParams();
    const [reviews, setReviews] = useState([])
    const [productDetails, setProductDetails] = useState([])
    useEffect(()=>{


       getProduct()
        fetch(`http://localhost:8001/api/getReviews?productModelName=${productName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productModelName: productName, 
            }),
          })
            .then((response) => response.json())
            // console.log(response)
            .then((data) => {
              console.log('data', data)
              setReviews(data);
            })
            .catch((error) => {
              console.error(error);
            });

    },[])

    const getProduct = async () => {
        fetch('http://localhost:8001/api/getProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ProductName: productName, 
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
    
      };

return(
    <div className="view-product-container">
      <h1>{productName}</h1>

      {productDetails[0] ? <div className="product-details">
        <img src={`/images/${productDetails[0].productImage}`} alt={productName} />
        <h3>{productDetails[0].productDescription}</h3>
        <h3>Price: ${productDetails[0].productPrice}</h3>
      </div>
    : ''}
      {reviews.length > 0 ? (
    <div className="reviews">
        <h1 style={{ textAlign: 'left' }}>Customer Reviews</h1>
        {reviews.map((review) => (
            <div key={review._id} className="review-item">
                <h3>{review.reviewText}</h3>
                <h3>Rating: {review.reviewRating}</h3>
            </div>
        ))}
    </div>
) : (
    <div className="no-reviews-message">
        <h1>No Reviews for this product</h1>
    </div>
)}

     
    </div>
)
}

export default ViewProduct;