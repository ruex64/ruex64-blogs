# DevBlogs 📝🚀  

**DevBlogs** is a **modern blogging platform** built with **React.js** and **Firebase**, integrating **Cloudinary** for image handling. It provides an easy-to-use interface for users to **write, format, and publish blog posts** with **Markdown support** and **live preview**. Users can **log in using Google**, create, search, and delete posts seamlessly.  

---

## 📌 Features  

### ✅ **User Authentication**  
- Users can **sign up or log in** using **Google authentication**.  
- Firebase Authentication securely manages **user sessions**.  

### ✅ **Create & Manage Blog Posts**  
- Users can **write and format blog posts** using **Markdown**, with a **live preview** feature.  
- Supports **image uploads via Cloudinary**, allowing users to include visuals in their blogs.  
- **Delete post functionality** is available to remove unwanted posts.  

### ✅ **SEO-Friendly & Searchable Content**  
- Each blog post has an **SEO-friendly slug**, automatically generated from the title.  
- Users can **search for blog posts by heading**, making it easy to find relevant content.  

### ✅ **Modern UI & Simplicity**  
- The app has a **simple yet elegant UI flow**, ensuring a seamless experience.  
- The **dark-themed interface** makes reading and writing more comfortable.  

---

## 🏗️ Pages & Functionalities  

### 🏠 **Home Page**  
- Displays **all published blogs** in a list format.  
- Each blog preview includes **title, a bit of contact and tags**.  
- Clicking on a post redirects users to the **full blog view**.  
- The **search bar** at the top allows users to search blogs by **title**.  

### 📝 **Create Post Page**  
- Users can create a new post by providing:  
  - **Title** (used for generating the slug).  
  - **Content** (supports Markdown).  
  - **Tags** (for categorization).  
  - **Image Upload** (handled via Cloudinary).  
- Markdown **live preview panel** allows users to see real-time formatting.  
- **Publish button** saves the post in Firebase Firestore.  

### 🔎 **Search Feature**  
- Users can search for blogs **based on titles**.  
- Search results update in real-time as users type.  

### 👤 **Profile Page (Work in Progress)**  
- Displays **user-specific blogs**.  
- Users can **view and delete their own posts**.  
- Logout button for easy session management.  

### 📄 **Blog Post Page**  
- Displays the **full blog post** with the **title, content, and tags**.  
- Includes a **formatted Markdown rendering** for a better reading experience.    

---

## 🚧 Features in Development  

- 🔹 **Enhanced Profile Page**: More details about user activity.  
- 🔹 **Multiple Themes**: Users can select between **light and dark** themes.  
- 🔹 **Edit Post Feature**: Users will be able to **update existing posts**.  
- 🔹 **Comments & Likes**: Users will soon be able to **comment and like posts**.  

---
