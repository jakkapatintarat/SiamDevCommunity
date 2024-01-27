const { faker, tr } = require('@faker-js/faker');
const userModel = require('../models/userSchema');
const { default: mongoose, Mongoose } = require('mongoose');
const brypt = require('bcrypt');

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

const Admin = {
    username: 'admin',
    password: '1234',
    email: 'admin@admin.com',
    fname: 'SiamDev',
    lname: 'Community',
    tel: '0841085111',
}

const fakeUsers = Array.from({ length: 19 }, seedUsers);

// ตรวจสอบข้อมูล
const seedData = async () => {
    try {
        const count = await userModel.countDocuments({});
        if (count > 0) {
            await userModel.deleteMany({});
        } else {
            await userModel.create(fakeUsers);
            await seedAdmin();

            console.log('Data seeded successfully');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('disconnect database');
    }
}

const seedAdmin = async () => {
    try {
        const Admin = {
            username: 'admin',
            email: 'admin@admin.com',
            fname: 'SiamDev',
            lname: 'Community',
            tel: '0841085111',
        }
        const hashedPassword = await brypt.hash('1234', 10);
        const newUser = new userModel({ username: Admin.username, password: hashedPassword, email: Admin.email, fname: Admin.fname, lname: Admin.lname, tel:Admin.tel });
        await newUser.save()
        console.log('Admin seeded successfully');
    } catch (error) {
        console.error('Error seeding admin:', error.message);
    }
}

seedData()

// seedData()
//     .then(() => seedAdmin())
//     .finally(() => {
//         mongoose.connection.close();
//         console.log('Database connection closed');
//     });