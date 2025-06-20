import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BLOG } from '../../constants/api';
import Swal from 'sweetalert2'

export default function EditBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    img: null,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { blogId } = useParams();
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้
  const [user, setUser] = useState({
    id: '',
    username: 'ผู้เยี่ยมชม',
    img: ''
  });

  useEffect(() => {
    try {
      const userData = localStorage.getItem("token");
      if (userData) {
        const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
        const profile = decodedPayload.result || decodedPayload;
        setUser({
          id: profile._id,
          username: profile.username,
          img: profile.img
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอ่านข้อมูลผู้ใช้:", error);
    }
  }, []);

  // ดึงข้อมูล blog ที่ต้องการแก้ไข
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BLOG.GET_BY_ID(blogId)}`);
        const blog = response.data;
        
        // ตรวจสอบว่าเป็น blog ของผู้ใช้หรือไม่
        if (blog.author !== user.username) {
          Swal.fire({
            icon: 'error',
            title: 'ไม่มีสิทธิ์แก้ไข',
            text: 'คุณไม่มีสิทธิ์แก้ไข blog นี้',
          });
          navigate('/blogs');
          return;
        }

        setBlogData({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          tags: blog.tags || "",
          img: null,
        });
        setCurrentImage(blog.image);
        setIsLoading(false);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล blog:", error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถดึงข้อมูล blog ได้',
        });
        navigate('/blogs');
      }
    };

    if (user.username !== 'ผู้เยี่ยมชม') {
      fetchBlog();
    }
  }, [blogId, user.username, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setBlogData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setBlogData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const updateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    formData.append('author', user.username)
    if (blogData.img) {
      formData.append('img', blogData.img)
    }
    if (blogData.tags) {
      formData.append('tags', blogData.tags)
    }

    try {
      await axios.patch(`${BLOG.UPDATE(blogId)}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      });
      
      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแก้ไข blog:", error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการแก้ไข blog',
        text: error.message || '',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <div className="flex flex-shrink-0 items-center text-center justify-end m-2">
          <a
            href={`/blogs/${blogId}`}
            className="rounded-md bg-indigo-600  w-auto px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >
            ย้อนกลับ
          </a>
        </div>
        <form
          className="space-y-6"
          onSubmit={updateBlog}
          encType="multipart/form-data"
        >
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="title">
              หัวข้อ
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              required
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="content"
            >
              รายละเอียด
            </label>
            <textarea
              name="content"
              value={blogData.content}
              required
              onChange={handleChange}
              rows="10"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="tags">
              Tags (คั่นด้วยเครื่องหมายจุลภาค)
            </label>
            <input
              type="text"
              name="tags"
              value={blogData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="img">
              รูปภาพ (ถ้าไม่เลือกจะใช้รูปเดิม)
            </label>
            {currentImage && (
              <div className="mt-2 mb-2">
                <p className="text-white text-sm">รูปปัจจุบัน:</p>
                <img src={currentImage} alt="Current" className="w-32 h-32 object-cover rounded" />
              </div>
            )}
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
            >
              อัปเดต Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 