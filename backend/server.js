const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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

// file path / storage
// ตั้งค่า Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imgs/'); // กำหนดโฟลเดอร์ที่จะบันทึกไฟล์
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, Date.now() + '-' + req.body.author + '.jpg'); // กำหนดชื่อไฟล์
    }
});


// MiddleWare
const upload = multer({ storage: storage });
app.use(bodyParser.json()); // แปลง req ให้เป็น json
app.use(cors()); // ตัวแก้ไม่ให้ติด cors header เมื่อ req ส่งมา


// *****
// API Route
// *****
// Auth
// app.get('/auth-route', async (req, res) => {
//     console.log(req.headers);
//     const token = 
//     res.send(req.headers)
// });

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

// Login 
app.post('/login/admin', async (req, res) => {
    console.log(req);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email })
    // console.log(user);

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // const isPasswordValid = 'TqfuEtjcpmxHpmP'
        if (isPasswordValid) {
            const { password, ...result } = user._doc;
            // console.log(result.role);
            if (result.role === 'admin') {
                // console.log('u r admin');
                //create token
                const token = jwt.sign({ result }, 'secret', { expiresIn: '1h' });
                res.send({ message: "login success", user: result, token });
            } else {
                // console.log('u r not admin');
                res.status(401).send("you are not admin")
            }

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
        const newUser = new userModel({ username, password: hashedPassword, email, fname, lname, tel, role: 'user' });
        await newUser.save()

        const payloadToken = {
            username: newUser.username,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname,
            tel: newUser.tel,
            role: newUser.role,
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

// find user by id
app.get('/api/blog/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userResult = await userModel.findById(userId);
        res.json(userResult);
    } catch (error) {
        res.json({ message: 'no have this user', error });
    }
});

// create
app.post('/api/adduser', async (req, res) => {
    await userModel.create(req.body);
    res.status(201).json(req.body);
});

// update user
app.patch('/api/user/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;   // get param
        const updateData = req.body;
        console.log(updateData);

        const updateUser = await userModel.findByIdAndUpdate(userId, updateData);
        if (updateUser) {
            res.json({ message: `update ${userId} success!`, updateUser });
        } else (err) => {
            console.log(err);
        }
    } catch (error) {
        res.json({ message: `No have user!. Can't update`, error });
    }
});

// delete user
app.delete('/api/delete/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId);
        res.json({ message: `delete ${userId} success!`, deletedUser });
    } catch (error) {
        res.json({ message: `Already no have user!. Can't delete`, error });
    }
});

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
app.post('/api/createblog', upload.single('img'), async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const img = 'http://localhost:5000/' + req.file.path;
    const newBlogData = {
        title,
        content,
        author,
        img,
    }
    const newBlog = new BlogModel(newBlogData);
    try {
        newBlog.save()
        res.json('Blog Added')
    } catch (error) {
        res.json('Error: ' + error)
    }
});

// update blog
app.patch('/api/update/:id', async (req, res) => {
    try {
        const blogId = req.params.id;   // get param
        const updateData = req.body;

        const updateBlog = await BlogModel.findByIdAndUpdate(blogId, updateData);
        res.json({ message: `update ${blogId} success!`, updateBlog });
    } catch (error) {
        res.json({ message: `No have blog!. Can't update`, error });
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

// Get Image
app.use('/imgs', express.static(path.join(__dirname, 'imgs'))) // ทุก req ที่ขึ้นต้น /img express จะเข้าไปทำงานเกี่ยวกับไฟล์ใน folder imgs






//start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});