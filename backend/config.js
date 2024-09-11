// import dotenv from 'dotenv';

// dotenv.config();

// export default {
//   PORT: process.env.PORT || 5000,
//   MONGODB_URL: process.env.MONGODB_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
//   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
// };

// config.js

import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/yourlocaldb',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',  // Add this line for unthentication
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb', // Replace 'sb' with your PayPal client ID
};

