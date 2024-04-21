import { authMiddleware } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

// Define a custom type for the afterAuth handler
type AfterAuthHandler = (options: {
    req: NextApiRequest,
    res: NextApiResponse,
    user: any
}) => Promise<NextApiResponse>;

// Define the custom afterAuth function
const customAfterAuth: AfterAuthHandler = async ({ req, res, user }) => {
    // Check if the user is authenticated
    if (!user) {
        // If not authenticated, modify the response object to remove the X-User-Authenticated header
        res.setHeader('X-User-Authenticated', '');
    }
    // Return the modified response object
    return res;
};

// Apply authMiddleware with custom afterAuth function
export default authMiddleware({
    // Define public routes accessible to both signed-in and signed-out users
    publicRoutes: [
        '/',
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/webhook/uploadthing',
        '/favicon.ico',
        '/assets/images/logo1.svg',
        '/assets/images/hero.png' 
    ],
    // Define routes to be ignored by Clerk authentication
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/favicon.ico',
        '/assets/images/logo1.svg', 
        '/assets/images/hero.png'
    ],
});

// Define the configuration for routes matching patterns
export const config = {
    matcher: [
        "/((?!.+.[w]+$|_next).*)", // Exclude files with specific extensions
        "/", // Root route
        "/(api|trpc)(.*)" // API routes
    ],
};