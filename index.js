require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')
const socketIo = require('socket.io');
const moment = require('moment-timezone');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./src/passport/passport');
const dbConfig = require('./src/config/db.config')
const userRoutes = require('./src/routes/userRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const Chat = require('./src/models/chat.model')

// Initialize Express app
const app = express();


//***************** Session config   ******************//
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))



//***************** Passport setup  ******************//
app.use(passport.initialize());
app.use(passport.session());

//***************** Express Flash  ******************//
app.use(flash())

//*********** Enable CORS for all routes **************// 
app.use(cors());

// ********  serve the static file from the 'public' directory *********//
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())   // Parse JSON bodies for incoming requests
app.use(express.urlencoded({ extended: false }));   // Parse URL-encoded bodies


// *********   Set Template Engine  *********//

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))

// *********  Database Connection ************//
dbConfig.connectMongoDB();




app.get('/', (req, res) => {
    res.redirect('/register');
});

// ********  Route Setup ***********//
app.use('/', userRoutes);
app.use('/private-chat', chatRoutes);

//*****   404 Error Handling   *******/ 
app.use((req, res, next) => {
    res.status(404).render('errors/error', { title: 'Page Not Found' });
});


// ***********   Port Start   *************//
const PORT = process.env.PORT || 3000;

// *************  Server and Socket Setup   ***************//
const server = app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Failed to start server:', err.message);
    }
    else {
        console.log(`🚀 Server running  on http://localhost:${PORT}`);
    }
})

const io = socketIo(server);

// Store active users
const activeUsers = {};


// Socket.IO for real-time chat
io.on('connection', (socket) => {
    // console.log(`🔗 User connected: ${socket.id}`);

    socket.on('userData', async({ username }) => {
        //    console.log("Username",username)

        // Store user info in the activeUsers
        activeUsers[socket.id] = username;

        // Store user info in the socket object
        socket.username = username;

         // Retrieve last 50 messages
         const messages = await Chat.find().sort({ date: -1 }).limit(50);
        //  console.log(messages)
         socket.emit('previousMessages', messages.reverse());

        // console.log("Active user",activeUsers)

        // Notify other users about the new connection
        socket.broadcast.emit("notification", { message: `${username} has joined the chat` })


       // Update active users list
        io.emit('userList', activeUsers);
    })


    // Send a chat message
    socket.on('chatMessage', async (data) => {
        const { user, message } = data;

        // Validate username structure
        if (!user || !user.name || !user.image) {
            console.error('❌ Invalid chat message data:', { user, message });
            return;
        }
    

        const chatData = {
            user: {
                name: user.name,
                image: user.image,
            },
            message: message,
            date: moment().tz("Asia/Kolkata").format('MMMM Do YYYY, h:mm a'),
        };

        // Broadcast the message to all clients
        io.emit('receiveMessage', chatData);

         // Save the message to the database
         try {
            const newMessage = new Chat({
                user: { name: user.name.trim(), image: user.image  },
                message,
                date: chatData.date,
            });
            await newMessage.save();
            // console.log('✅ Message saved:', newMessage);
        } catch (err) {
            console.error('❌ Error saving message:', err.message);
        }

    })

    // Typing Notification
    socket.on('typing', (username) => {
        // console.log(username)
        socket.broadcast.emit('showTyping', username);
    });

    //   Handle built-in 'disconnect' event
    socket.on('disconnect', () => {
        const username = socket.username;
        if (username) {
            // console.log(`🔴 ${username} has left the chat`);

            // Remove  user from the active users list
            delete activeUsers[socket.id];

            //  Updated active users list
            io.emit('userList', activeUsers);

            // Notify others about the user leaving
            io.emit('notification', { message: `${username} has left the chat` });
        } else {
            // console.log('⚠️ A user disconnected without a username');
        }

    })
})

