// Import necessary dependencies and types
import { CreateUserParams, UpdateUserParams } from '../../types/index';
import { connectToDatabase } from '../database/index';
import { handleError } from '../utils';
import User from '../database/models/user.model';
import Event from '../database/models/event.model';
import Order from '../database/models/order.model';
import { revalidatePath } from 'next/cache';

// Function to create a new user
export async function createUser(user: CreateUserParams) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Create a new user
        const newUser = await User.create(user);

        // Return the newly created user
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        // Handle any errors
        handleError(error);
    }
}

// Function to retrieve a user by ID
export async function getUserById(userId: string) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Find the user by ID
        const user = await User.findById(userId);

        // If user is not found, throw an error
        if (!user) throw new Error('User not found');

        // Return the user
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        // Handle any errors
        handleError(error);
    }
}

// Function to update a user
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Find and update the user
        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });

        // If user update failed, throw an error
        if (!updatedUser) throw new Error('User update failed');

        // Return the updated user
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        // Handle any errors
        handleError(error);
    }
}

// Function to delete a user
export async function deleteUser(clerkId: string) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Find the user to delete
        const userToDelete = await User.findOne({ clerkId });

        // If user is not found, throw an error
        if (!userToDelete) throw new Error('User not found');

        // Update related events and orders
        await Promise.all([
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { organizer: userToDelete } }
            ),
            Order.updateMany(
                { _id: { $in: userToDelete.orders } },
                { $unset: { buyer: 1 } }
            )
        ]);

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);

        // Revalidate the path
        revalidatePath('/');

        // Return the deleted user
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        // Handle any errors
        handleError(error);
    }
}