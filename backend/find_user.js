const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const findUser = async (id) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const user = await User.findById(id);
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User NOT found with ID:', id);
            const allUsers = await User.find({});
            console.log('All users in DB:');
            allUsers.forEach(u => console.log(`- ${u._id} (${u.name}, ${u.role})`));
        }
        
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const userId = '6963d54b3151152909a56aee';
findUser(userId);
