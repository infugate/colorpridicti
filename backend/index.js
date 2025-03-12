const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const adminRoutes = require('./controller/adminController');
const app = express();
app.use(
  cors({
    origin: ["https://colorpridicti-front.vercel.app"], // Replace '*' with the specific origin(s) you want to allow, e.g., 'https://yourdomain.com'
    methods: ['POST', 'GET', 'PUT', 'DELETE'], // Define allowed HTTP methods
    credentials: true, // Allow credentials like cookies to be sent
  })
);
// app.use(cors());
app.use(express.json());
const colorPredictionRoutes = require('./routes/colorRoutes');
mongoose.connect(`mongodb+srv://infusionpvtltd:vcLkKLKcKZgez7ur@cluster0.ta8g3.mongodb.net/bunnybet9?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', authRoutes);
// app.use('/api', userRoutes);
app.use('/api/color', colorPredictionRoutes);
app.use('/api',adminRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
