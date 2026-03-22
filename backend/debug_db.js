const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Company = require('./models/Company');

dotenv.config();

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const userCount = await User.countDocuments();
        const eventCount = await Event.countDocuments();
        const companyCount = await Company.countDocuments();
        
        console.log(`Users: ${userCount}`);
        console.log(`Events: ${eventCount}`);
        console.log(`Companies: ${companyCount}`);
        
        if (userCount === 0 && eventCount === 0 && companyCount === 0) {
            console.log('Database is EMPTY.');
        } else {
            console.log('Database has data.');
        }
        
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

debugDB();
