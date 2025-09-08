const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../model/admin"); 
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Fatal Error: MONGO_URI is not defined in the .env file.");
    process.exit(1); 
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established for the seeder."))
  .catch(err => {
      console.error("Database connection failed:", err);
      process.exit(1);
  });

const adminsToSeed = [
    { email: "admin@example.com", password: "securePassword123" },
    { email: "support@example.com", password: "supportPassword456" },
];

const seedAdminData = async () => {
    try {
        await Admin.deleteMany({});
        console.log("Successfully cleared all existing admins from the database.");

        await Admin.insertMany(adminsToSeed);
        console.log("Admin data has been successfully seeded into the database!");

    } catch (error) {
        console.error("Error while seeding admin data:", error);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection has been closed.");
    }
};

seedAdminData();

