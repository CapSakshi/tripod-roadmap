# Tripod Roadmap — Full Stack MERN App

## 🚀 New Features Added

### 🛡️ Admin Panel
- Role-based access control (admin vs user)
- Dashboard with sidebar layout
- Create, Edit, Delete roadmaps with image thumbnail upload
- Step reordering (move up/down)
- Dynamic resource links per step
- Protected by `adminOnly` middleware

### 🌐 Community Explore Page
- Browse all public user roadmaps
- Filter by **category** and **difficulty**
- **Search** by title or description
- Pagination support
- Like/Unlike roadmaps
- Fork any roadmap to your own profile

### 🗺️ User Roadmap Builder
- Create roadmaps with dynamic step builder
- Add multiple resource links per step
- **Save as Draft** (private) or **Publish** (public)
- Edit/Delete your own roadmaps
- Publish/Unpublish toggle

### 💬 Social Features
- Like & unlike roadmaps
- Comment on public roadmaps
- View creator's profile page
- 🍴 **Fork Roadmap** — copy any public roadmap to edit it yourself

### 👤 Profile Page
- View your own published + draft roadmaps
- Edit profile (name, bio)
- Public profiles for viewing other users' roadmaps
- Quick access to Admin Panel for admins

---

## 📁 Project Structure

```
tripod-roadmap/
├── client/                     # React Frontend
│   └── src/
│       ├── pages/
│       │   ├── AdminPanel.js           # 🆕 Admin dashboard
│       │   ├── ExplorePage.js          # 🆕 Community explore
│       │   ├── CreateRoadmapPage.js    # 🆕 Roadmap builder
│       │   ├── ProfilePage.js          # 🆕 User profile
│       │   ├── CommunityRoadmapPage.js # 🆕 Roadmap detail + social
│       │   ├── DashboardPage.js
│       │   ├── LoginPage.js
│       │   ├── SignupPage.js
│       │   └── RoadmapPage.js
│       ├── context/AuthContext.js      # Updated with role + updateUser
│       ├── components/common/Navbar.js # Updated with new links
│       └── App.js                      # Updated with all new routes
│
└── server/                     # Express Backend
    ├── models/
    │   ├── User.js             # Updated: added role field
    │   └── Roadmap.js          # 🆕 Full roadmap schema (steps, likes, comments, fork)
    ├── routes/
    │   ├── admin.js            # 🆕 Admin CRUD + image upload
    │   ├── userRoadmaps.js     # 🆕 User roadmap CRUD + like/comment/fork
    │   └── auth.js             # Updated: returns role, profile update
    ├── middleware/auth.js      # Updated: added adminOnly middleware
    └── index.js               # Updated: registered new routes + multer static
```

---

## ⚙️ Setup & Run

### 1. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

### 3. Make a user admin (one-time via MongoDB shell)

```js
// In MongoDB shell or Compass
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

### 4. Run

```bash
# Terminal 1 — Server
cd server && npm run dev

# Terminal 2 — Client
cd client && npm start
```

---

## 🔗 API Reference

### Admin Routes (requires admin token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/roadmaps` | List all admin roadmaps |
| POST | `/api/admin/roadmap` | Create roadmap (multipart/form-data) |
| PUT | `/api/admin/roadmap/:id` | Update roadmap |
| DELETE | `/api/admin/roadmap/:id` | Delete roadmap |

### User Roadmap Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/roadmap/create` | Create user roadmap |
| GET | `/api/roadmap/public` | All public roadmaps (with filters) |
| GET | `/api/roadmap/my` | Current user's roadmaps |
| GET | `/api/roadmap/:id` | Single roadmap |
| PUT | `/api/roadmap/:id` | Edit own roadmap |
| DELETE | `/api/roadmap/:id` | Delete own roadmap |
| POST | `/api/roadmap/:id/like` | Toggle like |
| POST | `/api/roadmap/:id/comment` | Add comment |
| POST | `/api/roadmap/:id/fork` | Fork a roadmap |
| GET | `/api/roadmap/user/:userId` | Public roadmaps by user |
