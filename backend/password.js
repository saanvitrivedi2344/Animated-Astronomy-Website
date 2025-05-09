import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./User.js"; // adjust path if needed

const fixPasswords = async () => {
  await mongoose.connect("mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const users = await User.find({});

  for (const user of users) {
    // Skip users that already have hashed passwords
    if (!user.password.startsWith("$2a$")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(`Fixed password for user: ${user.username}`);
    } else {
      console.log(`Password already hashed for user: ${user.username}`);
    }
  }

  console.log("Password fix complete!");
  process.exit();
};

fixPasswords();
