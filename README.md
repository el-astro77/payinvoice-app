# PayIn - Invoice Workflow Application

PayIn is a versatile web application built with Next.js and the MERN stack (MongoDB, Express.js, React, Node.js). It offers a seamless solution for managing invoices, supporting operations like CREATE, READ, UPDATE, and DELETE. Furthermore, PayIn integrates the Instamojo payment gateway, allowing users to securely process invoice payments.

[Live Demo](https://invoice-app-im-unique-swaraj77.vercel.app/)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Adding Instamojo Payment Gateway](#adding-instamojo-payment-gateway)
  - [1. Sign Up for an Instamojo Account](#1-sign-up-for-an-instamojo-account)
  - [2. Create an API Key](#2-create-an-api-key)
  - [3. Integrate Instamojo in Your Project](#3-integrate-instamojo-in-your-project)
  - [4. Payment Handling](#4-payment-handling)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Invoice Management**: Easily manage invoices with CRUD operations.
- **Payment Processing**: Securely process payments using Instamojo.
- **User-Friendly Interface**: Intuitive design for a seamless workflow.
- **Next.js Application**: Built with Next.js, MongoDB, Express.js, React, and Node.js.

## Technologies Used
- **Frontend**:
  - Next.js
  - React.js
  - HTML, CSS, JavaScript
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Payment Gateway**:
  - Instamojo
- **Deployment**:
  - Vercel
## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager) installed.
- MongoDB installed and running.
- An Instamojo account.

## Adding Instamojo Payment Gateway

1. Sign Up for an Instamojo Account
Visit Instamojo and sign up for an account if you don't have one already.

2. Create an API Key
Once logged in, create an API Key by following Instamojo's documentation or developer resources.

3. Integrate Instamojo in Your Project
Add the Instamojo Node.js library to your project:
shell
Copy code
npm install instamojo-nodejs --save
Import and configure the Instamojo library in your code:
javascript
Copy code
const Instamojo = require('instamojo-nodejs');
const instamojo = new Instamojo({
  apiKey: 'YOUR_API_KEY',
  authToken: 'YOUR_AUTH_TOKEN',
  endpoint: 'https://api.instamojo.com/v2/',
});
Use the library to initiate payments.
4. Payment Handling
Implement payment handling logic in your project based on the Instamojo documentation. Ensure that your application listens for payment status updates and updates the invoice accordingly.

Usage
To create a new invoice, click on the "New Invoice" button and fill in the required information.
To view and manage existing invoices, navigate to the "Invoices" section.
To process a payment, select an invoice and click the "Pay Now" button.

![image](https://github.com/el-astro77/payinvoice-app/assets/67543214/3eba05a2-1a9d-4e02-a7b7-6c7d01ef6282)

![image](https://github.com/el-astro77/payinvoice-app/assets/67543214/369b686e-c07f-4bdf-adcc-9f78af3e2186)

![image](https://github.com/el-astro77/payinvoice-app/assets/67543214/b0b8e0b2-053a-4af6-9910-6fe031d178f5)


