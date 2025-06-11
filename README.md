# Shop Visualizer

**Shop Visualizer** is a full-stack application that dynamically renders an online shop based on a `.json` file uploaded by the user.  
The project is built using **Node.js**, **Express.js**, **HTML**, **CSS**, and vanilla **JavaScript**.

## 🔍 Description

The application allows users to upload an inventory in `.json` format via a form on the `index.html` page.  
Once uploaded, the file is sent to the back-end server, where it is validated. If there are no errors, the file is stored in the `/uploads` folder, and the user is redirected to `shop-main.html` where the shop is displayed.

To make testing easier, a sample file named `inventory.json` is already included in the project directory. You can use it immediately to test the app without creating a new file.

## 🛒 Features

- **Upload a JSON inventory file**
- **Dynamic product rendering**
- **Filter menu by category, color, and size**
- **Shopping cart to add and remove items**
- **Send order to the back-end**
- **Save orders as `.json` files in the `/orders` directory**

## 🛠️ Technologies Used

- Node.js  
- Express.js  
- HTML5  
- CSS3  
- JavaScript

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jusepeeee/shop-visualizer.git
   cd shop-visualizer
2. Install dependencies:
   ```bash
   npm install
3. Start the server:
   ```bash
   node express.js
4. Open your browser and go to:
   ```bash
   http://localhost:4000
5. Test the app:
   On the homepage (index.html), upload the included inventory.json file to immediately test the shop functionality.

## 👨‍💻 Author

**Giuseppe Cocice**  
GitHub: [@jusepeeee](https://github.com/jusepeeee)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
