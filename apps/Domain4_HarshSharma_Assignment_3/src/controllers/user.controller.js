import { User } from "../models/user.model.js"



export const createUser = async (req, res) => {
    try {
        const { name, email, age, role } = req.body;
        if (!name || !email || !age) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and age are required",
            });
        }

        if (typeof age !== "number") {
            return res.status(400).json({
                success: false,
                message: "Age must be a number",
            });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }


        const user = await User.create({
            name,
            email,
            age,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        console.error("Error creating user:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        if (!allUsers) return res.status(200).json({
            success: true,
            message: "No user exists",
        });
        return res.status(200).json({
            success: true,
            message: "Users found",
            users: allUsers
        });

    } catch (error) {
        console.error("Error fetching users:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

};

export const getUsersByCondition = async (req, res) => {
    try {
        const { age } = req.query;
        if (!age) {
            return res.status(400).json({
                success: false,
                message: "Age query parameter is required",
            });
        }

        if (isNaN(age)) {
            return res.status(400).json({
                success: false,
                message: "Age must be a number",
            });
        }

        const users = await User.find(
            { age: { $gt: Number(age) } },
            { name: 1, email: 1 }
        );
        if (!users) return res.status(200).json({
            success: true,
            message: "No user exists",
        });
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });

    } catch (error) {
        console.error("Error getting users by condition:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getSortedUsers = async (req, res) => {
    try {
        const {
            sortBy = "age",
            order = "desc",
            page = 1,
            limit = 5,
        } = req.query;

        const allowedSortFields = ["age", "name", "email", "role"];
        if (!allowedSortFields.includes(sortBy)) {
            return res.status(400).json({
                success: false,
                message: `Invalid sort field. Allowed: ${allowedSortFields.join(", ")}`,
            });
        }

        const sortOrder = order === "asc" ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);

        const users = await User.find({})
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        const totalUsers = await User.countDocuments();

        return res.status(200).json({
            success: true,
            totalUsers,
            currentPage: Number(page),
            totalPages: Math.ceil(totalUsers / limit),
            data: users,
        });

    } catch (error) {
        console.error("Error getting sorted users error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const updateUserRole = async (req, res) => {
    try {
        const { email } = req.params;
        const { role } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email parameter is required",
            });
        }

        if (!role || !["admin", "user"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role must be either 'admin' or 'user'",
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error(
            "Error updating user role:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const incrementAgeForAll = async (req, res) => {
    try {
        const result = await User.updateMany(
            {},
            { $inc: { age: 1 } }
        );

        return res.status(200).json({
            success: true,
            message: "Age incremented by 1 for all users",
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
        });

    } catch (error) {
        console.error(
            "Error incrementing age for all users:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const deleteUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email parameter is required",
            });
        }
        const deletedUser = await User.findOneAndDelete({ email });
        console.log("hii")
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error(
            "Error deleting user by email:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteUsersAboveAge = async (req, res) => {
    try {
        console.log("hi")
        const { age } = req.query;
        if (!age) {
            return res.status(400).json({
                success: false,
                message: "Age query parameter is required",
            });
        }
        console.log("age", age)

        if (isNaN(age)) {
            return res.status(400).json({
                success: false,
                message: "Age must be a number",
            });
        }

        const result = await User.deleteMany({
            age: { $gt: Number(age) },
        });
        if (!result) return res.status(200).json({
            success: true,
            message: `Users not found`,
        });

        return res.status(200).json({
            success: true,
            message: `Users above age ${age} deleted successfully`,
        });

    } catch (error) {
        console.error(
            "Error deleting users above age:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteUsersAboveAge2 = async (req, res) => {
    try {
        console.log("hi")
        const { age } = req.query;
        if (!age) {
            return res.status(400).json({
                success: false,
                message: "Age query parameter is required",
            });
        }
        console.log("age", age)

        if (isNaN(age)) {
            return res.status(400).json({
                success: false,
                message: "Age must be a number",
            });
        }

        const result = await User.deleteMany({
            age: { $gt: Number(age) },
        });
        if (!result) return res.status(200).json({
            success: true,
            message: `Users not found`,
        });

        return res.status(200).json({
            success: true,
            message: `Users above age ${age} deleted successfully`,
        });

    } catch (error) {
        console.error(
            "Error deleting users above age:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const dropUserCollection = async (req, res) => {
    try {
        await User.collection.drop();

        return res.status(200).json({
            success: true,
            message: "User collection dropped successfully",
        });

    } catch (error) {
        if (error.code === 26) {
            return res.status(404).json({
                success: false,
                message: "User collection does not exist",
            });
        }

        console.error(
            "Error dropping user collection:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

