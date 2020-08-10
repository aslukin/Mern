const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');



async function start () {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); 
    } catch (e) {
        console.log('Unable to connect to DB', e.message);
        process.exit(1);
    }
}

const PORT = config.get('port') || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));  
app.use('/t', require('./routes/redirect.routes'));  

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

start();
app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));