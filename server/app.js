require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const carbonEmissionRoutes = require('./src/routes/carbonEmissionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);

app.use('/api/posts', postRoutes);

app.use('/api/notifications', notificationRoutes);

app.use('/api/ceo2', carbonEmissionRoutes);

mongoose.connect(process.env.MONGODB_URI.toString(), { dbName: 'AKM' })
    .then(() => app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)))
    .catch((err) => console.log(err.message));


