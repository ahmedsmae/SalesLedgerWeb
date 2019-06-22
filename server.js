const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to Sales Ledger 2'));
// Define Routes
app.use('/api/users', require('./routers/api/users/users'));
app.use('/api/users/profile', require('./routers/api/users/profile'));
app.use('/api/users/accounts', require('./routers/api/users/accounts'));
app.use('/api/users/customers', require('./routers/api/users/customers'));
app.use('/api/users/colleagues', require('./routers/api/users/colleagues'));
app.use('/api/users/tasktypes', require('./routers/api/users/tasktypes'));
app.use('/api/users/prices', require('./routers/api/users/prices'));
app.use('/api/users/items', require('./routers/api/users/items'));
app.use('/api/users/area', require('./routers/api/users/area'));
app.use('/api/users/targets', require('./routers/api/users/targets'));

app.use('/api/accounts', require('./routers/api/accounts'));
app.use('/api/persons', require('./routers/api/persons'));
app.use('/api/reports', require('./routers/api/reports'));
// app.use('/api/images', require('./routers/api/images'));
// app.use('/api/forecasts', require('./routers/api/forecasts'));
// app.use('/api/tasks', require('./routers/api/tasks'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
