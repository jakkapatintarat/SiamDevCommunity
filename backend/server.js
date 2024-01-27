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

// mockup data
// const mockupBlog = [
//     { title: 'Article 1', content: 'Content for Article 1' },
//     { title: 'Article 2', content: 'Content for Article 2' },
//     { title: 'Article 3', content: 'Content for Article 3' },
//   ];

// BlogModel.insertMany(mockupBlog);

// API Route

// เข้าสู่ระบบ ตรวจสอบ user และสร้าง token
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
        res.status(201).json(newUser)
    } else {
        res.send({ message: "username already exist" });
    }
})

// get all users
app.get('/api/users', async (req, res) => {
    const users = await userModel.find();
    res.json(users).status(200);
});

app.post('/api/adduser', async (req, res) => {
    await userModel.create(req.body);
    res.status(201).json(req.body);
})

// get all blogs
app.get('/api/blogs', async (req, res) => {
    const allModels = await BlogModel.find();
    res.json(allModels).status(200);
});

app.post('/api/addblog', async (req, res) => {
    await BlogModel.create(req.body);
    res.status(201).json(req.body);
})


//start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});