# JobPosting.Backend
🧑‍💼 Job Posting Backend
A robust Node.js + Express + MongoDB backend for a job posting platform, featuring:

Role-based user access (Recruiters & Employees)

Job posting and application workflows

In-app messaging (via REST APIs)

JWT authentication

🎯 Frontend-compatible — ready to power React, Vue, Next.js, or Angular apps.

🚀 Features
🔐 Authentication
POST /api/auth/register – Register as an employee or recruiter

POST /api/auth/login – Login and receive JWT

👤 User Profiles
GET /api/users/me – Get profile of logged-in user

GET /api/users/:id – Employees can view recruiter profiles

📄 Jobs
Recruiter-only:
POST /api/jobs – Create new job

PUT /api/jobs/:id – Update existing job

DELETE /api/jobs/:id – Delete job

GET /api/jobs/my – View all jobs you posted

Public/Employee:
GET /api/jobs – Browse all job listings (supports filters)

GET /api/jobs/:id – View detailed job information

📝 Applications
POST /api/jobs/:jobId/apply – Employees can apply to jobs

GET /api/applications/me – View your own applications

GET /api/jobs/:id/applicants – Recruiters view applicants for a job

💬 Messaging
POST /api/messages/send – Send a message to another user

GET /api/messages/:withUserId – View full conversation

🛠️ Tech Stack
Server: Node.js, Express

Database: MongoDB + Mongoose

Auth: JSON Web Tokens (JWT)

Middleware: Role-based auth for employees/recruiters

Validation: Mongoose schema validation

⚙️ Getting Started
📦 Install Dependencies
bash
Copy
Edit
git clone https://github.com/amanp18/JobPosting.Backend.git
cd JobPosting.Backend
npm install
🔐 Environment Variables
Create a .env file at the root:

ini
Copy
Edit
PORT=8080
MONGO_URL=mongodb://localhost:27017/job-posting
JWT_SECRET=your_jwt_secret
▶️ Run Server
bash
Copy
Edit
npm run start
# or for auto-reload:
npm run dev
🧩 Recommended Folder Structure
text
Copy
Edit
/
├── controllers/       # Route handlers
├── models/            # Mongoose schemas
├── routes/            # Route definitions
├── middleware/        # JWT & role-based middleware
├── utils/             # Helper functions
├── server.js          # App entry point
├── package.json       # Dependencies/scripts
└── .env               # Environment config
🔒 Middleware Overview
requiredsignin – Validates JWT and attaches req.user

isRecruiter – Restricts routes to recruiter users

isEmployee – Restricts routes to employee users

Use them to guard routes like:
router.get('/jobs/my', requiredsignin, isRecruiter, getMyJobs);
router.post('/jobs/:jobId/apply', requiredsignin, isEmployee, applyToJob);

🧪 Testing the API
You can easily test using Postman, Insomnia, or Thunder Client:

Register a recruiter and an employee

Login to obtain JWTs

Use the Recruiter token to create jobs

Use the Employee token to browse and apply

Exchange messages and verify chat history

📄 Postman Collection
(Optional) Include a link or JSON export of your Postman collection here for quick testing.

🧩 Future Enhancements
Pagination, search, and filters for listings

File upload support for resumes

Email notifications and status updates

Real-time messaging (Socket.IO)

Logging, rate limiting, and caching

👤 Author
Aman P – amanp18
Built with ❤️ and JavaScript.