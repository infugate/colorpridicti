const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./controller/adminController');
const colorPredictionRoutes = require('./routes/colorRoutes');

const app = express();

// ✅ Use environment variables correctly
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://test:test@cluster0.rwn2n.mongodb.net/";
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// ✅ Proper CORS configuration
app.use(cors({
  origin: "https://colorpridicti-front.vercel.app", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Handle Preflight Requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://colorpridicti-front.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ JSON Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api/color', colorPredictionRoutes);
app.use('/api', adminRoutes);

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
