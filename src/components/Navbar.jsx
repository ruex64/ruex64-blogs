import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../utils/firebase";

const Navbar = ({ setSearchQuery }) => {
  const user = auth.currentUser;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/"><h1 className=" text-xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>DevBlogs</h1></Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white outline-none w-1/3 border-2 border-black focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-800" style={{ fontFamily: "'Rajdhani', sans-serif" }}
      />

      {/* Right Section: Auth / Buttons */}
      <div>
        {user ? (
          <>
            <Link to="/create-post" className="mr-4 bg-blue-500 px-4 py-2 rounded" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Create Post</Link>
            <Link to="/profile" className="bg-gray-700 px-4 py-2 rounded" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Profile</Link>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="bg-blue-500 px-4 py-2 rounded" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
