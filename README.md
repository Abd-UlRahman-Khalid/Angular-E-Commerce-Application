ECOM - E-Commerce Application

📌 Project Overview

This is an Angular-based e-commerce application that provides a structured and modular approach to managing products, orders, authentication, and layouts. The project is organized into core modules for services, layouts, pages, and shared utilities, ensuring scalability and maintainability.

📂 Project Structure

ECOM/
├── public/
│ ├── favicon.ico
│
├── src/
│ ├── app/
│ │ ├── core/
│ │ │ ├── environments/
│ │ │ ├── guards/
│ │ │ ├── interceptors/
│ │ │ ├── services/
│ │ │ │ ├── auth/
│ │ │ │ ├── brands/
│ │ │ │ ├── cart/
│ │ │ │ ├── categories/
│ │ │ │ ├── flowbite/
│ │ │ │ ├── orders/
│ │ │ │ ├── products/
│ │ │ │ ├── whishing/
│ │ │
│ │ ├── layout/
│ │ │ ├── auth-layout/
│ │ │ ├── blank-layout/
│ │ │ ├── footer/
│ │ │ ├── navbar/
│ │ │
│ │ ├── pages/
│ │ │ ├── allorders/
│ │ │ ├── brands/
│ │ │ ├── cart/
│ │ │ ├── categories/
│ │ │ ├── checkout/
│ │ │ ├── details/
│ │ │ ├── forgetpassword/
│ │ │ ├── home/
│ │ │ ├── login/
│ │ │ ├── notfound/
│ │ │ ├── product/
│ │ │ ├── register/
│ │ │ ├── whishlist/
│ │ │
│ │ ├── shared/
│ │ │ ├── components/
│ │ │ ├── directives/
│ │ │ ├── interfaces/
│ │ │ │ ├── ibrands.ts
│ │ │ │ ├── icart.ts
│ │ │ │ ├── icategories.ts
│ │ │ │ ├── iproduct.ts
│ │ │ │ ├── iwhish.ts
│ │ │ ├── pipes/
│ │ │
│ │ ├── app.component.ts
│ │ ├── app.config.ts
│ │ ├── app.config.server.ts
│ │ ├── app.routes.ts
│ │ ├── app.routes.server.ts
│
├── server.ts
├── main.ts
├── main.server.ts
├── styles.scss
├── tailwind.config.js
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .editorconfig
├── .gitignore
├── README.md

🚀 Features

Authentication: Secure user authentication with guards and interceptors.

Product Management: Categories, brands, and product listings.

Cart Functionality: Add to cart, update cart, and checkout process.

Order Management: View all orders and order details.

User Management: Login, registration, and password recovery.

Layouts: Multiple layout components for authentication, navigation, and blank pages.

Flowbite Integration: UI components for enhanced user experience.

Shared Utilities: Interfaces, components, directives, and pipes for reusability.

404 Handling: A dedicated notfound page for better user experience.

🔧 Installation

Clone the repository:

git clone https://github.com/your-repo/ecom.git
cd ecom

Install dependencies:

npm install

Run the development server:

ng serve

Open in browser: http://localhost:4200

📜 Scripts

ng serve - Runs the application in development mode.

ng build - Builds the application for production.

ng test - Runs unit tests.

ng lint - Lints the project files.

📌 Technologies Used

Angular - Frontend framework

TypeScript - Primary programming language

RxJS - Reactive programming

Bootstrap/Flowbite - UI Components

Tailwind CSS - Styling framework

🛠️ Contribution

Contributions are welcome! To contribute:

Fork the repository

Create a new branch (feature/your-feature)

Commit your changes

Push to the branch

Create a pull request

📞 Contact

For any inquiries, feel free to reach out to a.khalid5322@gmail.com .
