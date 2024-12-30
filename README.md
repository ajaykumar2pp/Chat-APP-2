## Chat Message App 🚀

A feature-rich authentication via Google and GitHub OAuth, real-time chat application built using **Node.js**, **Express**, **Socket.IO**, **MongoDB**, and **EJS** for templating. The application supports real-time messaging, typing indicators, and persistent chat history.Additionally, it provides a user private-chat dashboard



## 🌟 Features

- 🔒 **User Registration and Login**
  - Traditional email and password authentication using Passport.js.
- 🌐 **OAuth Integration**
  - Google and GitHub authentication support.
- 📧 **Forget Password Flow**
  - Reset your password securely via email.
- 🛠️ **Protected Private-Chat**
  - Accessible only to authenticated users.
- 🔗 **Real-Time Messaging**
  - Send and receive messages instantly using Socket.io.
- 👥 **User Management**
  - View active users and their count.
- 📜 **Persistent Chat History**
  - Retrieve stored messages from the database.
- ⌨️ **Typing Indicators**
  - Know when another user is typing.
- 🖼️ **User Profiles**
  - Includes user avatars and display names.
- 📱  **Responsive Design**
  - Built using EJS and Bootstrap for a modern, adaptive interface.

## 🚀 Tech Stack

| Technology        | Description                 |
| ----------------- | --------------------------- |
| 📦 **NPM**        | Dependency management       |
| ⚛️ **EJS**   | Templating engine          |
| 🟢 **Node.js**    | Backend runtime environment |
| ⚡ **Express.js** | Backend web framework       |
| 🔑 **Passport.js**        | Authentication middleware  |
| ✉️ **Nodemailer**        | Email Service for password reset  |
| ⚡ **Socket.IO**       |Real-time communication |
| 🗄️ **MongoDB**    | NoSQL Database for user data           |

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ajaykumar2pp/Chat-APP-2
   ```
2. Navigate to the project directory:
   ```bash
    cd chat-app-2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   DATABASE_URL=mongodb+srv://<username>:<password>mongodb.net/USER_AUTH?retryWrites=true&w=majority
   JWT_SECRET=themyscret
   GOOGLE_CLIENT_ID=**6444762183-***************************.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-VGOKmLZdJx2oJ2WxON_***********
   EMAIL_USER=abc@gmail.com
   EMAIL_PASS=tsqp **** **** jeym
   GOOGLE_CALLBACK_URL=https://abc-coder-in.onrender.com/auth/google/callback
   GITHUB_CLIENT_ID=Ov23li8zO2Uw8c7******
   GITHUB_CLIENT_SECRET=ab882befa44617**********56695388fd7d1b07
   GITHUB_CALLBACK_URL=https://abc-coder-in.onrender.com/auth/github/callback
   ```
5. Start the development server:
   ```bash
   npm start
   ```


## 📁 Project Structure

```
Multi-Authentication/
src/
├── config/                  # Configuration files
│   └── db.config.js         # Database connection configuration
│   └── nodemailer.js        # Email service setup
├── controllers/             # Route controllers
│   └── userController.js    # Controller for authentication-related logic
├── middlewares/             # Custom middleware
│   └── auth.middleware.js   # Middleware for authentication and authorization
├── models/                  # Database models
│   └── user.model.js        # User schema and model definition
├── passport/                # Passport.js strategies
│   └── passport.js          # Passport-Local, Google & GitHub strategies
├── routes/                  # Application routes
│   └── userRoutes.js        # Routes related to authentication
├── views/                   # EJS templates
├── .env.example             # Sample environment file
├── index.js                 # Main entry point for the server
├── package.json             # Project configuration
├── README.md                # Documentation
```

## 🚦 API Endpoints

| HTTP Method | Endpoint                  | Description                                    |
|--------------|---------------------------|------------------------------------------------|
| `GET`        | `/register`                | Displays the registration page.               |
| `POST`       | `/register`                | Registers a new user.                         |
| `GET`        | `/login`                   | Displays the login page.                      |
| `POST`       | `/login`                   | Logs in the user.                             |
| `GET`        | `/google`             | Initiates Google OAuth.                       |
| `GET`        | `/google/callback`    | Google OAuth callback.                        |
| `GET`        | `/github`             | Initiates GitHub OAuth.                       |
| `GET`        | `/github/callback`    | GitHub OAuth callback.                        |
| `GET`        | `/private-chat`               | Private chat dashboard  |
| `GET`        | `/forget-password`         | Displays the forget password page.            |
| `POST`       | `/forget-password`         | Sends reset password email.                   |
| `GET`        | `/check-email`             | Prompts user to check email for reset link.   |
| `GET`        | `/reset-password/:token`   | Displays the reset password page.             |
| `POST`       | `/reset-password/:token`   | Resets the user password.                     |
| `GET`        | `/success`                 | Displays success page.                        |
| `GET`        | `/logout`                  | Logs the user out.                            |



## 📷 Screenshots
<a href="https://ibb.co/4J9Rhvp"><img src="https://i.ibb.co/Pt3GqXg/Chat-APP-12.png" alt="Chat-APP-12" border="0"></a>

## 🛡️ Security

- Encrypted passwords using bcrypt 🔒.
- Secure OAuth flows with Google and GitHub.
- Environment variables stored securely with dotenv.

## 📞 Contact

- 👤 Author: Ajay Kumar Prajapati
- 📧 Email: ajay2kumarpp@gmail.com
- 🌐 Github: https://github.com/ajaykumar2pp
