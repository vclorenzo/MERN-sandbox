const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const openaiRoutes = require('./routes/openAIRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

connectDB();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/chat', openaiRoutes);
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server stated on port ${port}`));
