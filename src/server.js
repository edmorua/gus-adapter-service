const express = require('express');
const app = express();


app.use(express.json({extended:false}));

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => res.send('GUS ADAPTER SERVER RUNNING'));


app.use('/api/v1/pacient', require('./routes/api/pacient.js'));



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));