export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogger");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvykowu9i/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url; // Returns image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };
  