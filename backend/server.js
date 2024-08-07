const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { faker } = require('@faker-js/faker');

const app = express();
const PORT = process.env.PORT || 5000;
const server = createServer(app); // สร้าง server โดยให้ socke.io มาใช้งานร่วมกับ express
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// MiddleWare
app.use(bodyParser.json()); // แปลง req ให้เป็น json
app.use(cors()); // ตัวแก้ไม่ให้ติด cors header เมื่อ req ส่งมา

// เชื่อมต่อฐานข้อมูล
const databaseUrl = 'mongodb://127.0.0.1:27017/SiamDev';
try {
    mongoose.connect(databaseUrl);
    console.log('Connect DB success');
} catch (error) {
    console.log(error);
}

// socket.io connection
// รับ connect เมื่อ client มีการเข้าเว็บ
io.on('connection', (socket) => {
    // console.log(`Socket ${socket.id} connected`);
    socket.on('sendMessage', (data) => { // recieve message from client
        // console.log('Resived message', data);

        const serverChat = {
            text: data.message,
            isChatOwner: false,
        }

        socket.broadcast.emit('serverSend', serverChat);   // send message to client
    });
});



// Model
const BlogModel = require('./models/blogSchema');
const userModel = require('./models/userSchema');
const AdminBlogModel = require('./models/adminBlogSchema');
const CommentsModel = require('./models/comment');
const BookmarkModel = require('./models/bookmarkSchema');

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
const upload = multer({ storage: storage });

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
    const avatar = faker.image.avatar();
    if (!user) {
        // ใช้ bcrypt hash รหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10); // เอารหัสผ่านไปเข้ารหัส 10 รอบ
        const newUser = new userModel({ username, password: hashedPassword, email, fname, lname, tel, role: 'user', img: avatar });
        await newUser.save()

        const payloadToken = {
            username: newUser.username,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname,
            tel: newUser.tel,
            role: newUser.role,
            img: newUser.img,
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
app.get('/api/user/:id', async (req, res) => {
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
    const { username, password, fname, lname, tel, email } = req.body
    const user = await userModel.findOne({ username: username });
    const mail = await userModel.findOne({ email: email });
    const avatar = faker.image.avatar();
    if (!user) {
        if (!mail) {
            // ใช้ bcrypt hash รหัสผ่าน
            const hashedPassword = await bcrypt.hash(password, 10); // เอารหัสผ่านไปเข้ารหัส 10 รอบ
            const newUser = new userModel({ username, password: hashedPassword, email, fname, lname, tel, role: 'user', img: avatar });
            await newUser.save()
            res.json({ newUser })
        } else {
            res.json({ message: 'email is already use' })
        }
    } else {
        res.json({ message: 'username is already use' })
    }
});

// update user
app.patch('/api/user/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;   // get param
        const updateData = req.body;
        const { username, password, email, fname, lname, tel } = req.body;
        console.log(updateData);
        const hashedPassword = await bcrypt.hash(password, 10); // เอารหัสผ่านไปเข้ารหัส 10 รอบ

        const updateUser = await userModel.findByIdAndUpdate(userId, { username, password: hashedPassword, email, fname, lname, tel });
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
// Blogs User 
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

// *****
// Comments 
// API 
// *****
// All comments
app.get('/api/comments', async (req, res) => {
    const comments = await CommentsModel.find();
    res.json(comments);
});

// Find comment by blogId
app.get('/api/comments/:blogId', async (req, res) => {
    const comments = await CommentsModel.find({ blogId: req.params.blogId });
    res.json(comments);
});

// create comment
app.post('/api/comments/create', async (req, res) => {
    const { blogId, userId, comment, fname, profileImg } = req.body;
    const addBlog = await CommentsModel.create({ blogId: blogId, userId: userId, comment: comment, fname: fname, profileImg: profileImg });
    res.json(addBlog);
});


// *****
// Blogs Admin 
// API 
// *****
// All blogs
app.get('/api/adminblogs', async (req, res) => {
    const allModels = await AdminBlogModel.find();
    res.json(allModels).status(200);
});

// find blog by id
app.get('/api/adminblog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blogResult = await AdminBlogModel.findById(blogId);
        res.json(blogResult);
    } catch (error) {
        res.json({ message: 'no have this blog', error });
    }
});

// create blog
app.post('/api/createadminblog', upload.single('img'), async (req, res) => {
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
    const newBlog = new AdminBlogModel(newBlogData);
    try {
        newBlog.save()
        res.json('Blog Added')
    } catch (error) {
        res.json('Error: ' + error)
    }
});

// update blog
app.patch('/api/updateadminblog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;   // get param
        const updateData = req.body;

        const updateBlog = await AdminBlogModel.findByIdAndUpdate(blogId, updateData);
        res.json({ message: `update ${blogId} success!`, updateBlog });
    } catch (error) {
        res.json({ message: `No have blog!. Can't update`, error });
    }
});

// delete blog
app.delete('/api/deleteadminblog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await AdminBlogModel.findByIdAndDelete(blogId);
        res.json({ message: `delete ${blogId} success!`, deletedBlog });
    } catch (error) {
        res.json({ message: `Already no have blog!. Can't delete`, error });
    }
});

// Get Image
app.use('/imgs', express.static(path.join(__dirname, 'imgs'))) // ทุก req ที่ขึ้นต้น /img express จะเข้าไปทำงานเกี่ยวกับไฟล์ใน folder imgs

// *****
// Bookmark 
// API 
// *****
// Bookmark Get All
app.get('/api/bookmark', async (req, res) => {
    const bookmark = await BookmarkModel.find();
    res.json(bookmark);
});

// Bookmark Get by userId
app.get('/api/bookmark/self/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const bookmarks = await BookmarkModel.find({ userId: userId }).populate('blogId');
        res.json({ bookmarks });
    } catch (error) {
        res.json({message: 'no have bookmark', error})
    }
});

// Bookmark Create
app.post('/api/bookmark/create', async (req, res) => {
    const blogId = req.body.blogId;
    const userId = req.body.userId;
    const isUserBookmark = await BookmarkModel.findOne({ userId: userId, blogId: blogId });
    // console.log(isUserBookmark);

    //ถ้า userId นี้มี blogId นี้อยู่แล้วจะไม่บันทึก
    if (!isUserBookmark) {
        const CreateBookmark = await BookmarkModel.create({ blogId, userId });
        res.json(CreateBookmark);
    } else {
        res.json({ message: "already bookmarked" });
    }
});

// Check already bookmark
app.get('/api/bookmark/check', async (req, res) => {
    const blogId = req.body.blogId;
    const userId = req.body.userId;
    const haveBookmark = await BookmarkModel.findOne({ userId: userId, blogId: blogId });
    if (haveBookmark) {
        res.json({ message: "have Bookmark" });
    } else {
        res.json({ message: "no have Bookmark" });
    }
})

// Bookmark Delete
app.delete('/api/bookmark/delete', async (req, res) => {
    const bookmarkId = req.body.bookmarkId;
    const deleteBookmark = await BookmarkModel.findOneAndDelete(bookmarkId);
    res.json({ message: "deleted success", deleteBookmark })
});


//start server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});