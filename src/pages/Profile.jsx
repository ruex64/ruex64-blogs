// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, query, where, getDocs, deleteDoc, doc,  } from "firebase/firestore";
// import { auth, db } from "../utils/firebase";

// const Profile = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const user = auth.currentUser;

//   useEffect(() => {
//     if (!user) {
//       navigate("/"); // Redirect if not logged in
//       return;
//     }


//     const fetchUserPosts = async () => {
//       try {
//         const postsRef = collection(db, "posts");
//         const q = query(postsRef, where("author.uid", "==", user.uid));
//         const querySnapshot = await getDocs(q);

//         const userPosts = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setPosts(userPosts);
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//       }
//       setLoading(false);
//     };

//     fetchUserPosts();
//   }, [user, navigate]);

//   // Delete post function
//   const handleDelete = async (postId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this post?");
//     if (!confirmDelete) return;

//     try {
//       await deleteDoc(doc(db, "posts", postId));
//       setPosts(posts.filter(post => post.id !== postId)); // Remove deleted post from state
//       alert("Post deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       alert("Failed to delete post.");
//     }
//   };

//   if (loading) return <p className="text-white text-center">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
//       {/* Back Button */}
//       <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white mb-4">
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>Your Blog Posts</h1>

//       {posts.length === 0 ? (
//         <p className="text-gray-400 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>No posts created yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {posts.map(post => (
//             <div key={post.id} className="p-4 bg-gray-800 rounded-lg">
//               <h2 
//                 onClick={() => navigate(`/blog/${post.slug}`)} 
//                 className="text-xl font-semibold cursor-pointer hover:text-blue-400" style={{ fontFamily: "'Press Start 2P', cursive" }}
//               >
//                 {post.heading}
//               </h2>
//               <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{post.tags.join(", ")}</p>
//               <img src={post.imageURL} alt={post.heading} className="w-full mt-3 rounded-lg" />
//               <p className="mt-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{post.content.substring(0, 100)}...</p>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(post.id)}
//                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Delete Post
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { signOut } from "firebase/auth";  // Import signOut from Firebase Authentication

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect if not logged in
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("author.uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [user, navigate]);

  // Delete post function
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter(post => post.id !== postId)); // Remove deleted post from state
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out.");
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {/* Back Button */}
        <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white">
          ← Back
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>Your Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>No posts created yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="p-4 bg-gray-800 rounded-lg">
              <h2 
                onClick={() => navigate(`/blog/${post.slug}`)} 
                className="text-xl font-semibold cursor-pointer hover:text-blue-400" style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                {post.heading}
              </h2>
              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{post.tags.join(", ")}</p>
              <img src={post.imageURL} alt={post.heading} className="w-full mt-3 rounded-lg" />
              <p className="mt-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{post.content.substring(0, 100)}...</p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Post
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
