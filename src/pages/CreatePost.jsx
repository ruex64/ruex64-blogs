// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db, collection, addDoc, serverTimestamp } from "../utils/firebase";
// import { uploadImageToCloudinary } from "../utils/cloudinary";
// import { auth } from "../utils/firebase";

// // Function to generate a slug from the heading
// const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// const CreatePost = () => {
//   const [heading, setHeading] = useState("");
//   const [tags, setTags] = useState("");
//   const [content, setContent] = useState("");
//   const [imageURL, setImageURL] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Upload Image to Cloudinary
//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     const uploadedURL = await uploadImageToCloudinary(file);
//     setImageURL(uploadedURL);
//     setLoading(false);
//   };

//   // Publish Post (Save to Firestore)
//   const handlePublish = async () => {
//     if (!heading || !content || !tags || !imageURL) {
//       alert("All fields are required!");
//       return;
//     }

//     const slug = createSlug(heading); // Generate slug from heading

//     try {
//       await addDoc(collection(db, "posts"), {
//         heading,
//         slug, // Add the slug field
//         tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
//         content,
//         imageURL,
//         author: {
//           name: auth.currentUser?.displayName || "Anonymous",
//           uid: auth.currentUser?.uid,
//           photoURL: auth.currentUser?.photoURL || "",
//         },
//         timestamp: serverTimestamp(),
//       });

//       navigate("/"); // Redirect to Home
//     } catch (error) {
//       console.error("Error publishing post:", error);
//       alert("Failed to publish post.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-700 text-white rounded-lg">
//       {/* Back Button */}
//       <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white mb-4">
//         ← Back
//       </button>

//       {/* Image Upload */}
//       <label className="block text-gray-300 mb-2">Upload Image:</label>
//       <input type="file" onChange={handleImageUpload} className="block w-full p-2 bg-gray-800 rounded" />
//       {loading && <p className="text-sm text-yellow-500">Uploading...</p>}
//       {imageURL && <img src={imageURL} alt="Uploaded" className="mt-4 w-full h-40 object-cover rounded" />}

//       {/* Heading */}
//       <label className="block text-gray-300 mt-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>Heading:</label>
//       <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded text-white" placeholder="Enter heading" />

//       {/* Tags */}
//       <label className="block text-gray-300 mt-4">Tags (comma-separated):</label>
//       <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded text-white" placeholder="e.g. React, Firebase, UI/UX" />

//       {/* Content */}
//       <label className="block text-gray-300 mt-4">Content:</label>
//       <textarea value={content} onChange={(e) => setContent(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded text-white h-40" placeholder="Write your post..." />

//       {/* Publish Button */}
//       <button onClick={handlePublish}
//         className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//         Publish
//       </button>
//     </div>
//   );
// };

// export default CreatePost;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, addDoc, serverTimestamp } from "../utils/firebase";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { auth } from "../utils/firebase";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Function to generate a slug from the heading
const createSlug = (title) => 
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const CreatePost = () => {
  const [heading, setHeading] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Upload Image to Cloudinary
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const uploadedURL = await uploadImageToCloudinary(file);
    setImageURL(uploadedURL);
    setLoading(false);
  };

  // Publish Post (Save to Firestore)
  const handlePublish = async () => {
    if (!heading || !content || !tags || !imageURL) {
      alert("All fields are required!");
      return;
    }

    const slug = createSlug(heading); // Generate slug from heading

    try {
      await addDoc(collection(db, "posts"), {
        heading,
        slug, // Add the slug field
        tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
        content,
        imageURL,
        author: {
          name: auth.currentUser?.displayName || "Anonymous",
          uid: auth.currentUser?.uid,
          photoURL: auth.currentUser?.photoURL || "",
        },
        timestamp: serverTimestamp(),
      });

      navigate("/"); // Redirect to Home
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-700 text-white rounded-lg">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white mb-4">
        ← Back
      </button>

      {/* Image Upload */}
      <label className="block text-gray-300 mb-2">Upload Image:</label>
      <input type="file" onChange={handleImageUpload} className="block w-full p-2 bg-gray-800 rounded" />
      {loading && <p className="text-sm text-yellow-500">Uploading...</p>}
      {imageURL && <img src={imageURL} alt="Uploaded" className="mt-4 w-full h-40 object-cover rounded" />}

      {/* Heading */}
      <label className="block text-gray-300 mt-4">Heading:</label>
      <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded text-white" placeholder="Enter heading" />

      {/* Tags */}
      <label className="block text-gray-300 mt-4">Tags (comma-separated):</label>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded text-white" placeholder="e.g. React, Firebase, UI/UX" />

      {/* Content (Markdown) */}
      <label className="block text-gray-300 mt-4">Content (Supports Markdown):</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded text-white h-40" placeholder="Write your post using Markdown..." />

      {/* Live Markdown Preview */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Live Preview:</h2>
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              return !inline ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language="javascript"
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-800 text-sm p-1 rounded">{children}</code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Publish Button */}
      <button onClick={handlePublish}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Publish
      </button>
    </div>
  );
};

export default CreatePost;
