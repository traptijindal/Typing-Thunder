import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)

export {app}

// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   },
// });

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
// }));

// app.use(express.json({ limit: '16kb' }));
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.static('public'));
// app.use(cookieParser());

// import userRouter from './routes/user.routes.js';

// app.use('/api/v1/users', userRouter);

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);
  
//     // Handle finding an opponent
//     socket.on('find_opponent', () => {
//       waitingPlayers.push(socket);
  
//       if (waitingPlayers.length >= 2) {
//         // Pop two players from the queue
//         const player1 = waitingPlayers.shift();
//         const player2 = waitingPlayers.shift();
  
//         // Create match information
//         const matchInfoPlayer1 = { opponent: 'Player 2' };
//         const matchInfoPlayer2 = { opponent: 'Player 1' };
  
//         // Notify both players they have been matched
//         player1.emit('match_found', matchInfoPlayer1);
//         player2.emit('match_found', matchInfoPlayer2);
  
//         console.log(`Matched ${player1.id} with ${player2.id}`);
//       }
//     });
  
//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('A user disconnected:', socket.id);
      
//       // Remove the disconnected socket from the waiting queue if present
//       const index = waitingPlayers.indexOf(socket);
//       if (index !== -1) {
//         waitingPlayers.splice(index, 1);
//       }
//     });
//   });
  

// server.listen(process.env.PORT || 3000, () => {
//   console.log(`Server running on port ${process.env.PORT || 3000}`);
// });

// export { app };


