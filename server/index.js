import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  console.error('\n💡 Please create a .env file based on .env.example');
  process.exit(1);
}

const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'KindLink API is running' });
});

// MongoDB Connection with retry logic
const PORT = process.env.PORT || 5000;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const connectWithRetry = async (retryCount = 0) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);

    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error(`❌ MongoDB connection error (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);

    if (retryCount < MAX_RETRIES - 1) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => connectWithRetry(retryCount + 1), RETRY_DELAY);
    } else {
      console.error('💥 Failed to connect to MongoDB after maximum retries');
      console.error('Please check:');
      console.error('1. MongoDB connection string in .env file');
      console.error('2. Network connectivity');
      console.error('3. MongoDB Atlas whitelist settings (if using Atlas)');
      process.exit(1);
    }
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('👋 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start connection
connectWithRetry();
