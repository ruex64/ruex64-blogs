import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import Navbar from "../components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on searchQuery
  const filteredPosts = posts.filter(post =>
    post.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar with Search Input */}
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>Latest Posts</h1>

        {filteredPosts.length === 0 ? (
          <p className="text-gray-400 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>No posts found.</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="p-6 bg-gray-800 rounded-lg mx-auto">
                <h2 
                  onClick={() => navigate(`/blog/${post.slug}`)} 
                  className="text-2xl font-semibold cursor-pointer hover:text-blue-400 mb-3" 
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {post.heading}
                </h2>
                <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {post.tags.join(", ")}
                </p>

                <div className="flex-1 overflow-hidden mb-3">
                  <img 
                    src={post.imageURL} 
                    alt={post.heading} 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                <p className="mt-2 text-gray-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {post.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
