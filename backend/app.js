import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let players = []; 
let matches = {}; 

io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  socket.on('find-opponent', ({ username }) => {
    const playerExists = players.some(player => player.socketId === socket.id);

    if (!playerExists) {
      players.push({ username, socketId: socket.id });
      console.log('Players queue:', players);

      
      if (players.length >= 2) {
        const player1 = players.shift(); 
        const player2 = players.shift(); 

        const roomId = `room-${player1.socketId}-${player2.socketId}`; 
        matches[socket.id] = roomId;

        // Both players join the room
        socket.join(roomId);
        io.sockets.sockets.get(player2.socketId).join(roomId);

        // Notify both players that they've been matched and provide opponent's username
        io.to(player1.socketId).emit('opponent-found', { opponentUsername: player2.username, roomId });
        io.to(player2.socketId).emit('opponent-found', { opponentUsername: player1.username, roomId });

        console.log(`Match found: ${player1.username} vs ${player2.username} in room ${roomId}`);
      }
    } else {
      console.log('Player already in the queue:', username);
    }
  });

  // Handle user input and broadcast it to the room
  socket.on('user-input', ({ key, roomId }) => {
    if (roomId) {
      
      socket.to(roomId).emit('opponent-input', key);
      console.log(`Key '${key}' from player ${socket.id} sent to room ${roomId}`);
    } else {
      console.log('No room found for player:', socket.id);
    }
  });


  socket.on('typing-progress', ({ progress, roomId }) => {
    if (roomId) {
     
      socket.to(roomId).emit('opponent-progress', { progress });
      console.log(`Progress from player ${socket.id}: ${progress}% sent to room ${roomId}`);
    } else {
      console.log('No room found for player:', socket.id);
    }
  });

  // Handle player disconnect
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);

   
    players = players.filter(player => player.socketId !== socket.id);
    console.log('Player removed from queue:', socket.id);

    // If the player was in a match, notify the room
    const roomId = matches[socket.id];
    if (roomId) {
      // Notify the room that the player has disconnected
      socket.to(roomId).emit('opponent-disconnected');
      console.log(`Player ${socket.id} was in room ${roomId} and has disconnected.`);
      delete matches[socket.id];
    }
  });
});

export { app, httpServer };
