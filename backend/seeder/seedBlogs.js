const { Faker, faker, el } = require('@faker-js/faker');
const BlogModel = require('../models/blogSchema');
const { default: mongoose } = require('mongoose');

// เชื่อมต่อ MongoDB
const databaseUrl = 'mongodb://127.0.0.1:27017/SiamDev';
try {
    mongoose.connect(databaseUrl);
    console.log('Connect DB success');
} catch (error) {
    console.log(error);
}

// สร้างข้อมูลเป็น array ของ objects
const seedBlogs = () => ({
    title: faker.lorem.slug(),
    content: faker.lorem.paragraph(),
    img: faker.image.url(),
    author: faker.internet.userName(),
});

const fakeBlogs = Array.from({ length: 20 }, seedBlogs);

// ตรวจสอบข้อมูล
const seedData = async () => {
    try {
        const count = await BlogModel.countDocuments({});
        if(count > 0) {
            await BlogModel.deleteMany({});
        }
        await BlogModel.create(fakeBlogs);
        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
            mongoose.connection.close();
    }
}

seedData();
    