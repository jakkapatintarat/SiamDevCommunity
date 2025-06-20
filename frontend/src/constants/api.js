// Base URL สำหรับ API
export const BASE_URL = 'http://localhost:5000/api';

// Authentication Endpoints
export const AUTH = {
    LOGIN: `${BASE_URL}/auth/login`,
    ADMIN_LOGIN: `${BASE_URL}/auth/login/admin`,
    REGISTER: `${BASE_URL}/auth/register`,
};

// User Endpoints
export const USER = {
    GET_ALL: `${BASE_URL}/users`,
    GET_BY_ID: (id) => `${BASE_URL}/users/${id}`,
    CREATE: `${BASE_URL}/users/add`,
    UPDATE: (id) => `${BASE_URL}/users/update/${id}`,
    DELETE: (id) => `${BASE_URL}/users/delete/${id}`,
};

// Blog Endpoints
export const BLOG = {
    GET_ALL: `${BASE_URL}/blogs`,
    GET_BY_ID: (id) => `${BASE_URL}/blogs/blogById?blogId=${id}`,
    CREATE: `${BASE_URL}/blogs/create`,
    UPDATE: (id) => `${BASE_URL}/blogs/update/${id}`,
    DELETE: (id) => `${BASE_URL}/blogs/delete/${id}`,
};

// Admin Blog Endpoints
export const ADMIN_BLOG = {
    GET_ALL: `${BASE_URL}/admin/blogs`,
    GET_BY_ID: (id) => `${BASE_URL}/admin/blog/${id}`,
    CREATE: `${BASE_URL}/createadmin/blog`,
    UPDATE: (id) => `${BASE_URL}/updateadmin/blog/${id}`,
    DELETE: (id) => `${BASE_URL}/deleteadmin/blog/${id}`,
};

// Comment Endpoints
export const COMMENT = {
    GET_ALL: `${BASE_URL}/blogs/comments`,
    GET_BY_BLOG_ID: (blogId) => `${BASE_URL}/blogs/${blogId}/comments`,
    CREATE: (blogId) => `${BASE_URL}/blogs/${blogId}/comments`,
};

// Bookmark Endpoints
export const BOOKMARK = {
    GET_BY_USER_ID: (userId) => `${BASE_URL}/blogs/${userId}/bookmark`,
    CREATE: (blogId) => `${BASE_URL}/blogs/${blogId}/bookmark`,
    DELETE: (blogId) => `${BASE_URL}/blogs/${blogId}/bookmark`,
};

// API Headers
export const getHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

// API Headers สำหรับ multipart/form-data (ใช้สำหรับอัพโหลดไฟล์)
export const getMultipartHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
}); 