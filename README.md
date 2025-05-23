# E-Commerce Website

This is a simple e-commerce website built with **Node.js**, **EJS**, and **MongoDB**. It allows users to view products, add them to a cart, and make purchases. The site also features an **admin panel** for managing products and users.

## Features
- Product listing
- Shopping cart functionality
- Admin panel for managing products and users
- User authentication (login & registration)
- Persistent cart using MongoDB

## Technologies Used
- **Node.js** for the backend
- **Express** for routing
- **EJS** for rendering HTML templates
- **MongoDB** for the database (via Mongoose)
- **Express-session** for managing sessions
- **MongoDB Atlas** for hosting the database in the cloud

## Installation Instructions

Follow these steps to set up the project locally:

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)

### Steps to Run Locally
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ecommerce-site.git
    ```
2. **Navigate to the project folder**:
    ```bash
    cd ecommerce-site
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```
4. **Create a `.env` file** in the root folder with the following content:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```
    Replace `your_mongodb_connection_string` with your actual MongoDB URI.

5. **Run the project**:
    ```bash
    npm start
    ```
6. **Access the app** in your browser at:
    ```bash
    http://localhost:3001
    ```


## Deployment

🔗 **Live Site**: [https://ecommerce-6wc2.onrender.com/](https://ecommerce-6wc2.onrender.com/)

> ⚠️ Please note: Since this project is hosted on [Render](https://render.com/), it may take **20–30 seconds to load** after a period of inactivity. Render puts free services to sleep to save resources, but once it wakes up, the site works smoothly!

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
