import mongoose from 'mongoose';

// MongoDB connection URI stored in an environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Global variable to cache the mongoose connection
let cached = (global as any).mongoose || { conn: null, promise: null };

// Function to connect to the MongoDB database
export const connectToDatabase = async () => {
    // If connection is already established, return the cached connection
    if (cached.conn) return cached.conn;

    // Throw an error if the MongoDB URI is not provided
    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // If there's no pending connection promise, create one
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'event_hub', // Name of the database
        bufferCommands: false, // Disable buffering of commands
    })

    // Wait for the connection promise to resolve and store the connection
    cached.conn = await cached.promise;

    // Return the established connection
    return cached.conn;
}