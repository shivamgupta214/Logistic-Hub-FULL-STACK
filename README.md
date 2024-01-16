Logistic and Shipping Hub - React Web Application
Group - 22 

1. How many total lines of code written?
-> 5500


2. What are the features (including required assignments features) implemented and functional in your project?

    2.1 User Account/Profile/Transaction management & MySQL

    -> This project features a multi-user system comprising three distinct user roles: Customer, Business, Manager, Delivery Agent and Warehouse Agent.

    -> 1. Customer : This user role can access various services such as Ship Package, Send Package Locally, and Store Inventory into warehouse.
    -> 2. Business : This user role can access various services such as Ship Package, Send Package Locally, and Store Inventory into warehouse.
    -> 3. Manager: This user role will have access to all customer, business and warehouse agent accounts where Manager can also edit their profile and change roles. Also user can perform data visualisation.
    -> 4. Delivery Agent : This user role can see what orders he need to be deliver that been created by business and customer account.
    -> 5. Warehouse Agent: This user role can add delivery agent and can see how many booking got for storage into warehouse. 

    Every type of user information is storing in MySQL database.

    2.2 Recommender

    -> By fetching the user's current location from the web application, the system identifies upcoming sports events in that vicinity.
    -> Location-Based Recommendations: The system leverages the Ticket Master API to retrieve information on sports events scheduled for the future, centered around the user's current location.

    2.4 Analytics & Visual Reports

    -> Manager can access data visualizations using Google Charts within the React Application:

    a. Bar chart illustrates the overall count of customers with respect to their zip codes.

    2.5 Reviews & Trending & MongoDB

    -> We have used MongoDB for storing Ship Package, Send Package Locally, and Store Inventory services information.

    2.6 Auto-Complete Search feature

    ->  We've implemented an autocomplete search feature in our main application. By entering initial address, the system suggests complete address using Google Map Place Autocomplete for convenient search experience.

    2.7 Google MAPS - Near ME search feature

    -> We utilize a Google API key to integrate Google Maps into our application.

    -> 1. Upon selecting the "NearBy" option on the header, the system retrieves the user's live location, displaying real-time nearby shipping stores.
    -> 2. Users can input a specific location and click "Locate" to view real-time available shipping stores in their specific location.

    2.8 Knowledge Graph Searches

    -> We have not implemented Knowledge Graph Search.
    -> We tried implementing OpenAI as a feature but then OpenAI API is paid and have to buy credits to fetch responses.


3. What are the Assignments features that are NOT implemented?

-> Since our web application do not have any products so we have not used any feature that ecommerce web application usses. We have not incorporated Twitter searches within the Logistic and Shipping Hub application as they are unrelated to our project.

4. What are the Assignments features that are attempted but NOT functional?

-> We tried to implement the Shipping and Logistic Stores recommendation and reviews using the Yelp API, we have tried ruunig that API on Yelp Fusion web portal and on Postman, but it was giving error during the fetching data. 








