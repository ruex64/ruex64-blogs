import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogPost = () => {
  const { slug } = useParams(); // Get slug from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching blog with slug: ${slug}`);
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPost(querySnapshot.docs[0].data());
          console.log("Blog post found:", querySnapshot.docs[0].data());
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-white text-center mt-5">Loading...</p>;
  if (!post) return <p className="text-gray-400 text-center mt-5">Blog post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white mb-4">
        ← Back to Home
      </button>

      <img src={post.imageURL} alt={post.heading} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold">{post.heading}</h1>
      <p className="text-gray-400 text-sm mt-2">
        Published on {post.timestamp?.seconds ? new Date(post.timestamp.seconds * 1000).toLocaleDateString() : "Unknown Date"}
      </p>
      <div className="mt-6 text-lg leading-relaxed markdown-content">
        <ReactMarkdown
          children={post.content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      <div className="mt-6">
        {post.tags?.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-sm px-2 py-1 rounded-full mr-2">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
