const mongoose = require("mongoose");
const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Cluster64390:U6VQgIuq5rKHhtN8@cluster64390.pyej3ot.mongodb.net/devTinder"
    );
};

module.exports =connectDB;

