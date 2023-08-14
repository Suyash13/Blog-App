import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard';
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async (req, res) => {
    try {
      const {data} = await axios.get("/api/v1/blog/all-blogs")
      if(data?.success) {
        setBlogs(data?.blogs);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllBlogs()
    // console.log(blogs);
  }, []);

  return (
    <div style={{display: 'flex', flexWrap: "wrap"}}>
      {blogs && blogs.length > 0 && blogs.map((blog) => 
      <BlogCard id={blog?._id} 
      isUser={localStorage.getItem('userId') === blog.user?._id}  //Issue fixed
      username={blog?.user?.username} 
      title = {blog?.title} 
      description={blog?.description} 
      image= {blog?.image} 
      time = {blog?.createdAt} />)}

    </div>
  )
}

export default Blogs;
