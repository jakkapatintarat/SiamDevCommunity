import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BLOG, COMMENT, BOOKMARK } from "../../constants/api";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';


export default function BlogDetail() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้
  const [user, setUser] = useState({
    id: '',
    username: 'ผู้เยี่ยมชม',
    img: ''
  });

  const [bookmark, setBookmark] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

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

  // เช็คว่า blog นี้ถูก bookmark หรือยัง
  useEffect(() => {
    const fetchBookmark = async () => {
      if (!user.id || !blogId) return;
      try {
        const res = await axios.get(BOOKMARK.GET_BY_USER_ID(user.id));
        // res.data.bookmark เป็น array
        const found = res.data.bookmark.find(b => b.blogId === blogId || b.blogId?._id === blogId);
        if (found) {
          setBookmark(true);
          setBookmarkId(found._id);
        } else {
          setBookmark(false);
          setBookmarkId(null);
        }
      } catch (err) {
        setBookmark(false);
        setBookmarkId(null);
      }
    };
    fetchBookmark();
  }, [user.id, blogId]);

  const [commentForm, setCommentForm] = useState({
    blogId: blogId,
    userId: '',
    username: 'ผู้เยี่ยมชม',
    profileImg: '',
    comment: '',
  });

  // อัพเดทข้อมูล user ใน commentForm เมื่อ user เปลี่ยน
  useEffect(() => {
    setCommentForm(prev => ({
      ...prev,
      userId: user.id,
      username: user.username,
      profileImg: user.img,
      comment: ''
    }));
  }, [user]);

  const [commentList, setCommentList] = useState([]);

  const handelSubmitComment = async (e) => {
    e.preventDefault();
    if (!user.id) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มความคิดเห็น");
      return;
    }
    try {
      const commentData = {
        comment: commentForm.comment,
        userId: user.id,
        username: user.username,
        profileImg: user.img
      };
      console.log("commentData", commentData);
      await axios.post(`${COMMENT.CREATE(blogId)}`, commentData);
      setCommentForm(prev => ({ ...prev, comment: '' })); // รีเซ็ตเฉพาะ comment
      getComment(); // ดึงข้อมูล comments ใหม่
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
    }
  }

  const handleBookmark = async () => {
    if (!user.id) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบก่อนบันทึก',
        timer: 1500
      });
      return;
    }
    if (bookmark) {     
        try {
          await axios.delete(BOOKMARK.DELETE(bookmarkId));
          setBookmark(false);
          setBookmarkId(null);
          Swal.fire({
            icon: 'success',
            title: 'ลบ bookmark สำเร็จ',
            timer: 1500
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาดในการลบ',
            text: error.message || '',
          });
        }
    } else {
      // ยังไม่เคย bookmark
      try {
        const res = await axios.post(`${BOOKMARK.CREATE(blogId)}`, { blogId, userId: user.id });
        setBookmark(true);
        setBookmarkId(res.data.bookmark?._id || null);
        Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการบันทึก',
          text: error.message || '',
        });
      }
    }
  };

  const getComment = async () => {
    try {
      const comment = await axios.get(`${COMMENT.GET_BY_BLOG_ID(blogId)}`);
      setCommentList(comment.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BLOG.GET_BY_ID(blogId)}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getComment();
  }, []);

  const handleEditBlog = () => {
    navigate(`/blogs/${blogId}/edit`);
  };

  return (
    <div className="bg-slate-700 min-h-screen flex justify-center ">
      <div className="bg-slate-600 w-full mx-20 p-8 ">
        <h1 className="text-center text-gray-50 text-3xl">Title : {blog.title}</h1>
        <h1 className="text-center text-gray-50 text-xl text-bg-dark">By : {blog.author}</h1>

        {/* Edit button - only show if current user is the author */}
        {user.username === blog.author && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleEditBlog}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              แก้ไข Blog
            </button>
          </div>
        )}

        <div className="p-4 rounded-md flex justify-center items-center">
          <div><img src={blog.image} className=" h-auto max-w-full rounded-lg" /></div>
        </div>

        <div className="bg-white px-5 py-2 mb-4 rounded-md ">
          {blog.content}
        </div>
      </div>

      {/* comment */}
      <section className="max-w-xl w-2/6 bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-center items-center mb-4">
            <button className="flex items-center gap-3 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleBookmark}
            >

              {/* if bookmark is true, show check icon */}
              {bookmark ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              )}
              Add to Bookmark
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">ความคิดเห็น</h2>
          </div>
          <form className="mb-6" onSubmit={handelSubmitComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">ความคิดเห็นของคุณ</label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="เขียนความคิดเห็นของคุณ..."
                required
                value={commentForm.comment}
                onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
            >
              เพิ่มความคิดเห็น
            </button>
          </form>
          {commentList.map((comment, index) => {
            const formatDate = new Date(comment.create_at).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <div key={index}>
                <article className="p-6 mb-3 bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={comment.profileImg}
                          alt={comment.username}
                        />
                        {comment.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={comment.create_at}>{formatDate}</time>
                      </p>
                    </div>
                  </div>
                  <p className="comment-text break-words dark:text-gray-400">{comment.comment}</p>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
