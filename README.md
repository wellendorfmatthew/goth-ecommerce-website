# goth-ecommerce-website

The purpose of this project was to create a full stack ecommerce website focused on selling gothic related clothes/accessories.

*Most stable version of the project is in the section9 branch
*Most recent version is the recently added Add/ResponsiveDesign branch

# Changelog
# February 21, 2024
Changes committed to the Add/ResponsiveDesign branch
* Updated the UI of each web page by adding a hamburger menu for non signed in users and a dropdown menu with an icon for signed in users
* Added responsive design for each page to make viewing and interacting with the application accessible on any device
* Implemented login and sign up functionality to demonstrate the use of secure coding standards
* Note: In the future need to finish updating the website to include a profile page and the ability to sign out
# March 8, 2024
Changes committed to the Add/Userprofile branch
* Updated authentication to be implemented through http only cookies
* Implemented profile page which includes a profile picture, user info, orders, and wishlist.
* Implemented local storage storing of profile pictures(might adjust this later on)
* Requests for retrieving many of the user's profile information is done through getting the email inside a stored cookie rather than manually placing into a function parameter
* When updating or signing in, user cookie is refreshed, when signing out user cookie is deleted, user cookie is created on sign up then checked for existence in root page
* Note: In future need to implement adding a wish list and order history for a user, also UI adjustments to make the website more aesthetically pleasing
# March 10, 2024
Changes committed to the Add/Wishlist branch
* Adjusted backend controllers to add/delete items to the wishlist
* Added base UI for wishlist items in the profile page
* Implemented ability in the client to add/delete items in the wishlist
* Added new button in each clothing item's section to add that item to the wishlist
* Note: In future need to implement ability to add item to cart inside profile page, a remove feature in the clothing item page, and possibly a check to see if a user has already added an item to their wishlist
# March 12, 2024
Changes committed to the Add/OrderHistory branch
* Adjusted backend controllers to add items to orders
* Added UI for displaying customer orders in profile page
* Adjusted Mongoose schema to allow for adding orders and retrieving necessary information
* Note: In future need to implement ability to view order details for each order, possibly abilty to buy a product again
# March 15, 2024
Changes committed to the Add/ResponsiveProfile branch
* Adjusted the design of the sections page and profile page wishlist, personal info, and order history sections to be viewable on mobile devices
# Technologies
* React-Handles the client side code and connects webpages
* Express-Handles all the routing and controllers used to communicate between the front end and backend
* Node-Creates the back end server and houses the code needed for Express to communicate with MongoDB
* MondoDB-Contains the data for all the products

# Features
* Use of stripe api for users to pay for and handle purchases
* Shopping cart to hold user's items and adds/deletes/subtracts a selected amount of an item
* Ability to filter items by availability, price range, and product type
* Simple and intuitive UI to browse/select items
* Use of useContext and local storage to keep track of items in the shopping cart
* Use of react-router-dom to navigate through each webpage

# Demo
Youtube video demonstrating the main features of the app

[![Example Demo](https://img.youtube.com/vi/g4nGnEijp70/0.jpg)](https://www.youtube.com/watch?v=g4nGnEijp70)
