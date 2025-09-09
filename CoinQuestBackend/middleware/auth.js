const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  console.log('\n--- New request to protected route ---');
  
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.error('Auth Error: No "Authorization" header found on the request.');
      return res.status(401).json({ message: "Authorization header is missing." });
    }
    console.log('Found Authorization header:', authHeader);

    if (!authHeader.startsWith("Bearer ")) {
      console.error('Auth Error: Token is not a Bearer token.');
      return res.status(401).json({ message: "Invalid token format. Must be a Bearer token." });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log('Extracted Token:', token);
    
    if (!process.env.JWT_SECRET) {
        console.error('FATAL SERVER ERROR: JWT_SECRET is not defined in the .env file!');
        return res.status(500).json({ message: 'Server configuration error: Missing JWT secret.'});
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);

      const user = await User.findById(decoded.userId).select("-password");
      
      if (!user) {
        console.error(`Auth Error: User with ID "${decoded.userId}" not found in database.`);
        return res.status(401).json({ message: "Authentication failed: User not found." });
      }

      console.log(`User authenticated successfully: ${user.email}`);
      req.user = user;
      next();
      
    } catch (jwtError) {
      console.error('JWT Verification Failed:', jwtError.message);
      
      let errorMessage = 'Token is invalid.';
      if (jwtError.name === 'TokenExpiredError') {
        errorMessage = 'Your session has expired. Please log in again.';
      } else if (jwtError.name === 'JsonWebTokenError') {
        errorMessage = `Token Error: ${jwtError.message}. Please log in again.`;
      }
      
      return res.status(401).json({ message: errorMessage });
    }

  } catch (error) {
    console.error('A critical error occurred in the auth middleware:', error);
    res.status(500).json({ message: "Server error during authentication." });
  }
};

module.exports = { auth };