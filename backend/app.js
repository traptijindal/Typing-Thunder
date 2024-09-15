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
                const player1 = players[0];
                const player2 = players[1];
                
                // Create a unique room ID for the match
                const roomId = `room-${player1.socketId}-${player2.socketId}`;
                matches[player1.socketId] = roomId;
                matches[player2.socketId] = roomId;

                // Join players to the room
                socket.join(roomId);
                io.sockets.sockets.get(player2.socketId).join(roomId);

                // Notify players of their opponent and the room ID
                io.to(player1.socketId).emit('opponent-found', { opponentUsername: player2.username, roomId });
                io.to(player2.socketId).emit('opponent-found', { opponentUsername: player1.username, roomId });

                // Remove players from the queue
                players = players.slice(2);

                console.log(`Match found: ${player1.username} vs ${player2.username} in room ${roomId}`);
            }
        } else {
            console.log('Player already in the queue:', username);
        }
    });

    // Handle progress updates from players
    socket.on('updateProgress', (progress) => {
        const roomId = matches[socket.id];
        if (roomId) {
            io.to(roomId).emit('progressUpdate', { userId: socket.id, progress });
        }
    });

    socket.on('disconnect', () => {
        // Remove player from the matches and players list
        const roomId = matches[socket.id];
        if (roomId) {
            const otherSocketId = Object.keys(matches).find(id => matches[id] === roomId && id !== socket.id);
            if (otherSocketId) {
                io.to(otherSocketId).emit('opponent-disconnected');
            }
        }
        players = players.filter(player => player.socketId !== socket.id);
        delete matches[socket.id];
        console.log('Socket disconnected:', socket.id);
    });
});

export {app,httpServer}
