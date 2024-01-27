import React from 'react'
import { useParams } from "react-router-dom"




export default function BlogDetail() {
    const {blogId} = useParams()
    console.log(blogId);
    // const thisBlog = productsData.find(blog => blog._id === blogId)


    return (
        <div>BlogDetail</div>
    )
}
