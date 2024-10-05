# StayVista

StayVista is a hotel booking web application built using modern web technologies. This project follows the MVC (Model-View-Controller) framework and includes CRUD operations for managing hotels and reviews.

## Why did I choose the name StayVista ?

1. Stay: Refers to the act of lodging or residing in a place temporarily, which is central to the concept of vacation rentals and accommodations.

2. Vista: This word means a pleasing view, often used to describe a scenic landscape or a broad perspective.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Templating Engine**: EJS (Embedded JavaScript)
- **Database**: MongoDB (using Mongoose)
- **Authentication**: Passport.js (with passport-local and passport-local-mongoose)
- **File Uploads**: Multer and Cloudinary
- **Environment Variables**: dotenv
- **Session Management**: express-session
- **Form Validation**: Joi
- **Flash Messages**: connect-flash
- **Method Override**: method-override

## Features

- **Add New Hotel**: Users can add new hotels with details such as name, location, price, and images.
- **Review Hotel**: Users can leave reviews for hotels, including ratings and comments.
- **Delete Review**: Users can delete their own reviews, and admins can manage and delete inappropriate reviews.
- **Delete Hotels**: Admins can delete hotels from the database, which also removes all associated reviews.

## Project Structure

- **Models**: Define schemas for hotels, reviews, and users using Mongoose.
- **Views**: EJS templates for rendering dynamic content.
- **Controllers**: Handle the logic for CRUD operations and user authentication.
- **Routes**: Define endpoints for various functionalities (e.g., `/hotels`, `/reviews`, `/users`).

## Installation

4. Set up environment variables:
   - Create a `.env` file in the root directory.

   - Add the following variables:
     
     <!-- for images -->
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_cloud_key
     CLOUDINARY_API_SECRET=your_cloud_secret
     
     <!-- for database -->
     DATABASE_URL=your_mongodb_url

     <!-- session secrect -->
     SESSION_SECRET=your_session_secret
     
     <!-- mongo session store -->
     MONGO_SECRET=your_mongo_secret
     

## Usage

1. Start the server:

>   nodemon app.js OR node app.js
   
2. Open your browser and navigate to `http://localhost:8080`.


# Note: User.plugin ->

> automatic Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
