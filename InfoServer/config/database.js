const mongoose = require("mongoose");

const connect = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb://localhost:27017/MySPACE",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

module.exports = { connect };
