const { faker } = require('@faker-js/faker');
const userModel = require('../models/userSchema');
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
const seedUsers = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fname: faker.person.firstName(),
    lname: faker.person.lastName(),
    tel: faker.phone.number(),
});

const fakeUsers = Array.from({ length: 20 }, seedUsers);

// ตรวจสอบข้อมูล
const seedData = async () => {
    try {
        const count = await userModel.countDocuments({});
        if (count > 0) {
            await userModel.deleteMany({});
        }
        await userModel.create(fakeUsers);
        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        mongoose.connection.close();
    }
}

seedData();
