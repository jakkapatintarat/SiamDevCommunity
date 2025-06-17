import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        content: '',
        author: ''
    });

    // ดึงข้อมูล comments ทั้งหมด
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/blogs/${blogId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    // จัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        });
    };

    // ส่ง comment ใหม่
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/blogs/${blogId}/comments`, newComment);
            setNewComment({ content: '', author: '' }); // รีเซ็ตฟอร์ม
            fetchComments(); // ดึงข้อมูล comments ใหม่
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเพิ่ม comment:', error);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">ความคิดเห็น</h3>
            
            {/* ฟอร์มเพิ่ม comment */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <input
                        type="text"
                        name="author"
                        value={newComment.author}
                        onChange={handleChange}
                        placeholder="ชื่อของคุณ"
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="content"
                        value={newComment.content}
                        onChange={handleChange}
                        placeholder="เขียนความคิดเห็นของคุณ..."
                        className="w-full p-2 border rounded"
                        rows="3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    เพิ่มความคิดเห็น
                </button>
            </form>

            {/* แสดง comments ทั้งหมด */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="border p-4 rounded">
                        <div className="font-bold">{comment.author}</div>
                        <div className="mt-2">{comment.content}</div>
                        <div className="text-sm text-gray-500 mt-2">
                            {new Date(comment.createdAt).toLocaleDateString('th-TH')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection; 