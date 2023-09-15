import User from "../models/User.js";

// Function to get all users (admin access)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({count:users.length, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get the profile of the currently logged-in user
export const getUserProfile = async (req, res) => {
  try {
    // Retrieve the user's profile from the database using req.user
    // req.user is set by Passport.js after successful authentication
    const { username, email } = req.user;
    res.json({ username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to update the profile of the currently logged-in user
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email,password } = req.body;

    // Retrieve the user by ID using req.user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties
    if (username) user.username = username;
    if (email) user.email = email;
    if(password) user.password = password;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
