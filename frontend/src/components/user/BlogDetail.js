import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function BlogDetail() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${blogId}`
        );
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-full bg-slate-700 flex justify-center items-center overflow">
      <div className="container mx-auto bg-slate-600 p-8 sm:p-12 h-screen sm:h-auto rounded-md ">
        
        <p className="text-4xl text-center mb-2">{blog.title}</p>
        <p className=" text-center mb-8">By: {blog.author}</p>

        <div className="flex justify-center mb-8">
          <img
            src={blog.img}
            alt=""
            className="rounded-2xl w-full sm:w-1/3 object-fill lg:aspect-auto lg:h-[25.5rem]"
          />
        </div>

        <div className="bg-white text-xl  rounded-md p-5 overflow-auto">
          <p className="">{blog.content}กฟหกฟหกหฟกหฟกฟหกกฟห</p>
          {/* Your long content here */}Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Esse eaque veritatis, doloremque rerum quis,
          assumenda et consectetur asperiores, reprehenderit tenetur repudiandae
          totam. Iure architecto, est porro ad aliquam mollitia magni hic quod
          culpa quasi praesentium cum optio nemo quibusdam, modi laboriosam.
          Repudiandae ratione eos delectus soluta, sequi nulla quas quisquam?
          Repudiandae aspernatur quis atque reprehenderit blanditiis
          perspiciatis rerum aliquid doloribus est dolore dicta vero quidem,
          fuga aperiam ex velit iusto deserunt nam animi non, quibusdam magni
          accusamus a saepe? Tenetur, soluta! Ea iste aut nihil doloribus
          maiores quo qui ipsa ad exercitationem cum! Quidem commodi pariatur
          facere tempore ducimus explicabo fuga perspiciatis, excepturi eligendi
          veniam consectetur doloribus eveniet dicta. Porro eveniet quos maiores
          consectetur accusantium illo quia, voluptatum itaque ratione
          temporibus expedita necessitatibus excepturi debitis explicabo laborum
          minus quisquam sint quaerat dignissimos unde officiis deserunt maxime.
          Ullam rem nemo architecto voluptates suscipit error, fugit ad culpa
          quidem repellat porro totam iure molestias. Blanditiis id voluptatum
          laborum iusto beatae aliquid ratione eligendi doloribus reiciendis
          expedita tenetur ab consequuntur recusandae, eveniet quia, ea cum
          molestias perferendis sequi in nesciunt repellendus, obcaecati
          aperiam. Repellendus ex ea porro tenetur maxime officiis impedit
          voluptatum nostrum, magnam vero ad ratione eius sit alias, deserunt
          iure cupiditate culpa molestiae assumenda consequatur maiores officia
          dolore nulla provident? Corrupti provident eaque reprehenderit aut
          inventore eos quasi expedita cumque! Sint eius vel explicabo autem
          inventore sunt, est doloribus beatae nesciunt quia dolorem delectus
          quidem molestias enim omnis aperiam suscipit voluptatem laborum nulla
          tempore nisi! Molestiae vel quidem corporis delectus minima,
          exercitationem maxime fugiat quis dolores saepe nemo voluptatem nihil
          sunt error aspernatur itaque pariatur iusto voluptate recusandae
          ullam. Architecto velit nostrum illo error cupiditate ea ipsam
          expedita voluptatibus cumque dignissimos sed porro quam qui
          consequuntur, voluptatem odit quasi ratione tempore rerum animi
          praesentium enim beatae quos sint. Nemo, beatae placeat.
        </div>
      </div>
    </div>
  );
}
