import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const app = express();
const posts = [];
const users=[];

// Connect Database

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =====================
// Registration Route
// =====================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExists = users.find(
      (u) => u.email === email
    );

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      followers: [],
      following: [],
      bio: "",
      profilePicture: "",
    };

    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================
// Get All Users
// =====================
app.get("/api/users", (req, res) => {
  const safeUsers = users.map(
    ({ password, ...rest }) => rest
  );

  res.json(safeUsers);
});
// =====================
// Search Users
// =====================

// =====================
// Home Route
// =====================
app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.get("/api/search", (req, res) => {

  const query = req.query.query;

  if (!query) {
    return res.json([]);
  }

  const results = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  res.json(results);
});

// =====================
// Get Posts
// =====================
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// =====================
// Create Post
// =====================
app.post("/api/posts", (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    author: author || "Anonymous",
    createdAt: new Date(),
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
});

// =====================
// Upload Image
// =====================
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  res.status(200).json({
    message: "Upload successful",
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});
// =====================
// Account Route
// =====================
app.get("/api/account/:id", (req, res) => {
  const user = users.find(
    (u) => u.id == req.params.id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    followers: user.followers.length,
    following: user.following.length,
  });
});
    

// =====================
// Update Profile Picture
// =====================
app.post(
  "/api/profile-picture",
  upload.single("image"),
  (req, res) => {

    const { userId } = req.body;

    const user = users.find(
      (u) => u.id == userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profilePicture =
      `http://localhost:5000/uploads/${req.file.filename}`;

    res.json({
      message: "Profile picture updated",
      image: user.profilePicture,
    });
  }
);
// =====================
// Update Bio
// =====================

app.put("/api/bio", (req, res) => {

  const { userId, bio } = req.body;

  const user = users.find(
    (u) => u.id == userId
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.bio = bio;

  res.json({
    message: "Bio updated successfully",
    bio: user.bio,
  });
});
// =====================
// Follow User
// =====================
app.post("/api/follow", (req, res) => {

  const { userId, targetUserId } = req.body;

  const user = users.find(
    (u) => u.id == userId
  );

  const targetUser = users.find(
    (u) => u.id == targetUserId
  );

  if (!user || !targetUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.following.includes(targetUserId)) {

    user.following.push(targetUserId);

    targetUser.followers.push(userId);
  }

  res.json({
    message: "User followed successfully",
  });
});
// =====================
// Unfollow User
// =====================
app.post("/api/unfollow", (req, res) => {

  const { userId, targetUserId } = req.body;

  const user = users.find(
    (u) => u.id == userId
  );

  const targetUser = users.find(
    (u) => u.id == targetUserId
  );

  if (!user || !targetUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.following =
    user.following.filter(
      (id) => id != targetUserId
    );

  targetUser.followers =
    targetUser.followers.filter(
      (id) => id != userId
    );

  res.json({
    message: "User unfollowed successfully",
  });
});

// =====================
// Start Server
// =====================
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});