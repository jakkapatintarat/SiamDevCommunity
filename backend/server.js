const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(bodyParser.json()); // แปลง req ให้เป็น json
app.use(cors()); // ตัวแก้ไม่ให้ติด cors header เมื่อ req ส่งมา
app.use(
    session({
        secret: 'ruewiropewdsadas',
        resave: false, // session จะไม่ถูกบันทึกลงในฐานข้อมูล
        saveUninitialized: false, // session จะไม่ถูกบันทึกหากไม่มีการเปลี่ยนแปลง.
        cookie: {
            secure: false,
            maxAge: 3600000 // 1 hour
        }
    })
);

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

// เข้าสู่ระบบ ตรวจสอบ user และสร้าง cookie
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const findUser = await userModel.findOne({ username: username })
    if (findUser) {
        if (password === findUser.password) {
            const { password, ...result } = findUser;
            req.session.user = result  // เก็บข้อมูลผู้ใช้ใน session
            res.send({ message: "login success", user: result })
        } else {
            res.send("user name or password is not valid")
        }
    } else {
        res.send("not register");
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password, } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
        const newUser = new userModel({ name, email, password });
        await newUser.save()
        res.status(201).json(newUser)
    } else {
        res.send({ message: "email already exist" });
    }
})

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