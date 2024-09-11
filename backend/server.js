// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import path from 'path';
// import config from './config';
// import userRouter from './routers/userRouter';
// import orderRouter from './routers/orderRouter';
// import productRouter from './routers/productRouter';
// import uploadRouter from './routers/uploadRouter';

// mongoose
//   .connect(config.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('Connected to mongodb.');
//   })
//   .catch((error) => {
//     console.log(error.reason);
//   });
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/uploads', uploadRouter);
// app.use('/api/users', userRouter);
// app.use('/api/products', productRouter);
// app.use('/api/orders', orderRouter);
// app.get('/api/paypal/clientId', (req, res) => {
//   res.send({ clientId: config.PAYPAL_CLIENT_ID });
// });
// app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
// app.use(express.static(path.join(__dirname, '/../frontend')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../frontend/index.html'));
// });
// app.use((err, req, res, next) => {
//   const status = err.name && err.name === 'ValidationError' ? 400 : 500;
//   res.status(status).send({ message: err.message });
// });
// app.listen(config.PORT, () => {
//   console.log('serve at http://localhost:5000');
// });


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';

// Connect to MongoDB Atlas
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// PayPal client ID route
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
