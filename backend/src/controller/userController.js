import Admin from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';


// Function to validate the content of the CSV file
const validateCSVContent = (data) => {
    const requiredFields = ["FirstName", "Phone", "Notes"];
    const errors = [];

    data.forEach((row, index) => {
        // Check if all required fields exist
        requiredFields.forEach((field) => {
            if (!row[field]) {
                errors.push(`Missing "${field}" in row ${index + 1}`);
            }
        });

        // Validate Phone (should be a number)
        if (row["Phone"] && isNaN(Number(row["Phone"]))) {
            errors.push(`Invalid "Phone" value in row ${index + 1}: "${row["Phone"]}"`);
        }

        // Validate FirstName and Notes (should be strings)
        if (row["FirstName"] && typeof row["FirstName"] !== "string") {
            errors.push(`Invalid "FirstName" value in row ${index + 1}: "${row["FirstName"]}"`);
        }
        if (row["Notes"] && typeof row["Notes"] !== "string") {
            errors.push(`Invalid "Notes" value in row ${index + 1}: "${row["Notes"]}"`);
        }
    });

    return errors;
};

export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = path.join(process.cwd(), "uploads", req.file.filename);

    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            // Validate the content of the CSV
            const errors = validateCSVContent(results);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed Incorrect Format",
                    errors,
                });
            }

            // Return success if validation passes
            res.json({
                success: true,
                message: "File uploaded and parsed successfully!",
                data: results,
            });
        })
        .on("error", (err) => {
            res.status(500).json({
                success: false,
                message: "Error reading CSV file",
                error: err.message,
            });
        });
};

// Fetch Users

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users; modify as needed for specific queries
        if (users && users.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: users,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No users found",
            });
        }
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users",
        });
    }
};

export const addUser = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User added successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
            },
        });
    } catch (error) {
        console.error("Add User Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the user",
        });
    }
};

export const deleteUser = async (req, res) => {
    const { data } = req.body;
    try {
        const user = await User.findOneAndDelete({email:data.email});
        if (user) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error("Delete User Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the user",
        });
    }
};

export const editUser = async (req, res) => {
const data = req.body
console.log(data,"data==");

    const {_id, name, email, mobile,password} = data.selectedAgent;
    console.log(_id,"id===");
    console.log(req.body);
    
    
    try {
        // Check if the user exists
        const user = await User.findByIdAndUpdate(_id,{name:name,email:email,mobile:mobile,password:password});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if email is being updated and if it's already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }
        }

        // If password is provided, hash it
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        if (hashedPassword) {
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (error) {
        console.error("Edit User Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while editing the user",
        });
    }
};
