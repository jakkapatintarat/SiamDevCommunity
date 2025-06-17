const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// ฟังก์ชันสำหรับทำความสะอาดชื่อไฟล์
const sanitizeFileName = (fileName) => {
    // ลบอักขระพิเศษและเว้นวรรค
    return fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

// ฟังก์ชันสำหรับสร้างชื่อไฟล์ที่ปลอดภัย
const generateSafeFileName = (originalName) => {
    // แยกชื่อไฟล์และนามสกุล
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    
    // สร้าง hash จากชื่อไฟล์เดิม
    const hash = crypto.createHash('md5').update(baseName).digest('hex').slice(0, 8);
    
    // ทำความสะอาดชื่อไฟล์
    const sanitizedName = sanitizeFileName(baseName);
    
    // สร้างชื่อไฟล์ใหม่ในรูปแบบ: sanitizedName-timestamp-hash.ext
    return `${sanitizedName}-${Date.now()}-${hash}${ext}`;
};

// กำหนดที่เก็บไฟล์
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // สร้างโฟลเดอร์ตามปี/เดือน
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const uploadPath = `uploads/${year}/${month}`;
        
        // สร้างโฟลเดอร์ถ้ายังไม่มี
        const fs = require('fs');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // สร้างชื่อไฟล์ใหม่
        const safeFileName = generateSafeFileName(file.originalname);
        cb(null, safeFileName);
    }
});

// ตรวจสอบประเภทไฟล์
const fileFilter = (req, file, cb) => {
    // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('ไม่รองรับไฟล์ประเภทนี้ กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น'), false);
    }
};

// สร้าง middleware สำหรับ upload ไฟล์
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // จำกัดขนาดไฟล์ 5MB
    }
});

module.exports = upload; 