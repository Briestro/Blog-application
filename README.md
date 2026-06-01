zBlog — MEVN Stack Blog Application
About the Project
zBlog is a full-stack blogging application built using the MEVN tech stack, which includes MongoDB with Mongoose for the database, Node.js with Express for the backend server, and Vue 3 powered by Vite for the user interface. 
The frontend application uses Pinia for global state management, Vue Router 4 for navigation, and Axios to handle API communication. The entire user interface features a clean, modern sky blue color theme utilizing the 
DM Serif Display and Sora typography fonts.

Key Features and Access Rules
The application features user authentication using JSON Web Tokens (JWT) and secure password hashing via bcryptjs with salt rounds. All blog posts are fully public, meaning anyone can browse and read entries without logging in. 
However, creating, updating, or deleting blog posts requires an authenticated account. The system enforces role-based access control where regular authenticated users can only modify or delete their own posts, 
while users with an "admin" role have elevated privileges to delete any post on the platform. The system also includes robust backend error handling that provides specific validation failures and standardized server responses 
for missing resources or unauthorized access attempts.

Local Configuration and Environment Setup
Before running the application, you must configure the backend environment variables. Create a file named .env inside your /server directory. Inside this file, define four specific keys: set PORT to 5000 to specify 
the backend network port, set MONGO_URI to mongodb://localhost:27017/zblog to point to your local MongoDB instance, set JWT_SECRET to your unique security string like zblog_super_secret_jwt_key_2024, and set JWT_EXPIRES_IN to 7d to 
control how long user login sessions remain active.

Running the Application Locally
To launch the backend service, open your terminal, navigate into the /server folder, install the necessary dependencies by running npm install, and start the development environment 
using the command npm run dev to utilize nodemon tracking. Alternatively, you can run npm start for production environments. The server will run live at http://localhost:5000. 
To launch the client-side user interface, open a separate terminal window, navigate into the /client directory, run npm install to load the packages, and execute npm run dev. 
This will launch the Vite frontend server at http://localhost:3000.

Available API Endpoints
The backend routes are split into authentication and post management modules. The authentication routes include a public POST to /api/auth/register for account creation, 
a public POST to /api/auth/login to receive a JWT access token, and a private GET to /api/auth/me to fetch the logged-in user's profile. The post routes include a public GET to /api/posts to fetch all entries, 
a public GET to /api/posts/:id to inspect a single entry, a private POST to /api/posts for authenticated users to write articles, a private PUT to /api/posts/:id restricted to the original author for updates, 
and a private DELETE to /api/posts/:id accessible by either the original author or an administrator. To test administrative actions, you can manually seed an admin user by updating a profile's role property string 
to "admin" inside MongoDB Compass or through the mongo shell.


Accounts:

Admin:
{ "username": "admin", 
"email": "admin@mail.com", 
"password": "admin123" }

Regular user:

{ "username": "john", 
"email": "john@test.com", 
"password": "123456" }