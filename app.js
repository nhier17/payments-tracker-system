require('dotenv').config();
require('express-async-errors');
//express 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
//security packages
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
//db
const connectDB = require('./db/connect-db');

//routers
const paymentRoutes = require('./routes/Payments');
const driverRoutes = require('./routes/Driver');
const clientsRoutes = require('./routes/Clients');
const userRoutes = require('./routes/User');

//middleware
const notFoundMiddleware = require('./middleware/not-Found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req,res )=> {
    res.send('Welcome to payments tracker')
});
//routes
app.use('/api/payments',paymentRoutes);
app.use('/api/driver',driverRoutes);
app.use('/api/clients',clientsRoutes);
app.use('/api/user',userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    };
    };

    start();