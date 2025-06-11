const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const upload = multer({dest: 'uploads/'});
let lastUploadedFile = null;

const uploadsDir = path.join(__dirname, 'uploads');
const ordersDir = path.join(__dirname, 'orders');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

if (!fs.existsSync(ordersDir)) {
  fs.mkdirSync(ordersDir);
}

/*
function basicAuth(req, res, next){
    let auth = req.headers.authorization;
    if(!auth){
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if(username === 'giuseppe' && password === "1234"){
        return next();
    }
    else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Access denied.');
    }

}

app.get('/admin', basicAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'index.html'));
})*/

app.post('/inventory', upload.single('inventoryFile'), (req, res) => {
    if(!req.file){
        return res.status(400).json({error: 'No file uploaded'});
    }
    lastUploadedFile = req.file.filename;
    const filePath = path.join(__dirname, 'uploads', lastUploadedFile);
    try{
        const file = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(file);
        res.redirect('/shop-main.html');
    }
    catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to read or parse the file' });
    }
})

app.get('/inventory', (req, res) => {
    if(!lastUploadedFile){
        return res.status(404).json({error: "No inventory uploaded yet"})
    }
    try{
        const filePath = path.join(__dirname, 'uploads', lastUploadedFile);
        const file = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(file);
        res.json(jsonData)   
    }
    catch(e){
        console.log(e);
        res.status(500).json({ error: 'Failed to read or parse the file' });
    }
});

app.post('/order', async(req, res) => {
    const timeStamp = Date.now();
    const fileName = `order-${timeStamp}.json`;
    const filePath = path.join(__dirname, 'orders', fileName);
    try{
        await fsPromises.writeFile(filePath, JSON.stringify(req.body, null, 2));
        console.log('File saved');
        res.status(200).send('Order received!');
    }
    catch(e){
        console.log(e);
        res.status(500).send('Your order has encoutered some problems');
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})