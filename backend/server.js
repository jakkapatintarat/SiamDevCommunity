const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(bodyParser.json()); // แปลง req ให้เป็น json
app.use(cors()); // ตัวแก้ไม่ให้ติด cors header เมื่อ req ส่งมา
const authenticateToken = (req, res, next) => { // สร้าง middle ware ในการตรวจสอบ token
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
    } else {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid token.' });
            req.use = decoded;
            next();
        });
    }
};

// เชื่อมต่อฐานข้อมูล
const databaseUrl = 'mongodb://127.0.0.1:27017/SiamDev';
try {
    mongoose.connect(databaseUrl);
    console.log('Connect DB success');
} catch (error) {
    console.log(error);
}

// Model
const BlogModel = require('./models/blogSchema');
const userModel = require('./models/userSchema');

// *****
// API Route
// *****
// Login 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username })
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const { password, ...result } = user._doc;
            // create token
            const token = jwt.sign({ result }, 'secret', { expiresIn: '1h' });
            res.send({ message: "login success", user: result, token });
        } else {
            res.status(401).send("user name or password is not valid")
        }
    } else {
        res.status(401).send("not register");
    }
});

// Register
app.post('/api/register', async (req, res) => {
    const { username, password, email, fname, lname, tel } = req.body;
    const user = await userModel.findOne({ username: username });
    if (!user) {
        // ใช้ bcrypt hash รหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10); // เอารหัสผ่านไปเข้ารหัส 10 รอบ
        const newUser = new userModel({ username, password: hashedPassword, email, fname, lname, tel });
        await newUser.save()

        const payloadToken = {
            username: newUser.username,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname,
            tel: newUser.tel,
        }
        const token = jwt.sign(payloadToken, 'secret', { expiresIn: '1h' });
        res.json({ newUser, token });
    } else {
        res.send({ message: "username already exist" });
    }
})

// *****
// Users
// API 
// *****
// get all users
app.get('/api/users', async (req, res) => {
    const users = await userModel.find();
    res.json(users).status(200);
});

app.post('/api/adduser', async (req, res) => {
    await userModel.create(req.body);
    res.status(201).json(req.body);
})

// *****
// Blogs
// API 
// *****
// All blogs
app.get('/api/blogs', async (req, res) => {
    const allModels = await BlogModel.find();
    res.json(allModels).status(200);
});

// find blog by id
app.get('/api/blog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blogResult = await BlogModel.findById(blogId);
        res.json(blogResult);
    } catch (error) {
        res.json({ message: 'no have this blog', error });
    }
});

// create blog
app.post('/api/createblog', async (req, res) => {
    const result = await BlogModel.create(req.body);
    res.status(201).json(result);
});

// update blog
app.patch('/api/update/:id', async (req, res) => {
    try {
        const blogId = req.params.id;   // get param
        const updateData = req.body;

        const updateBlog = await BlogModel.findByIdAndUpdate(blogId, updateData);
        res.json({message: `update ${blogId} success!`,updateBlog});
    } catch (error) {
        res.json({message: `No have blog!. Can't update`,error});
    }
});

// delete blog
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        res.json({ message: `delete ${blogId} success!`, deletedBlog });
    } catch (error) {
        res.json({ message: `Already no have blog!. Can't delete`, error });
    }
});






//start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});