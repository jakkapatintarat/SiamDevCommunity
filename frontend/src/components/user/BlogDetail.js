import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function BlogDetail() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  // ดึงข้อมูลผู้ใช้
  const userData = localStorage.getItem("token");
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;
  const [user, setUser] = useState({
    id: profile._id,
    fname: profile.fname
  });
  const [commentForm, setCommentForm] = useState({
    blogId: blogId,
    userId: user.id,
    fname: user.fname,
    comment: '',
  });

  const handelSubmitComment = async (e) => {
    e.preventDefault()
    console.log(commentForm);
    try {
      const res = await axios.post('http://localhost:5000/api/comments/create', commentForm)
      console.log(res);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${blogId}`
        );
        const comment = await axios.get(`http://localhost:5000/api/comments/${blogId}`);
        console.log(comment.data);
        console.log(response.data);
        setBlog(response.data);
        // console.log(comment.data);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-700 min-h-screen flex justify-center ">
      <div className="bg-slate-600 w-full mx-20 p-8 ">
        <h1 className="text-center text-gray-50 text-3xl">Title : {blog.title}</h1>
        <h1 className="text-center text-gray-50 text-xl text-bg-dark">By : {blog.author}</h1>

        <div className="p-4 rounded-md flex justify-center items-center">
          <div><img src={blog.img} className=" h-auto max-w-full rounded-lg" /></div>
        </div>

        <div className="bg-white px-5 py-2 mb-4 rounded-md ">
          {blog.content}
        </div>


      </div>

      {/* comment */}
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
          </div>
          <form className="mb-6" onSubmit={handelSubmitComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required value={commentForm.comment} onChange={(e) => setCommentForm((etc) => ({ ...etc, comment: e.target.value }))}></textarea>
            </div>
            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-600 rounded-lg">
              Post comment
            </button>
          </form>
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough" />Michael Gough</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                  title="February 8th, 2022">Feb. 8, 2022</time></p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
              instruments for the UX designers. The knowledge of the design tools are as important as the
              creation of the design strategy.</p>
          </article>
          <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  alt="Bonnie Green" />Bonnie Green</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                  title="March 12th, 2022">Mar. 12, 2022</time></p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
          </article>
          <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                  alt="Helene Engels" />Helene Engels</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-06-23"
                  title="June 23rd, 2022">Jun. 23, 2022</time></p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
          </article>
        </div>
      </section>
      {/* comment */}
    </div>
  );
}
