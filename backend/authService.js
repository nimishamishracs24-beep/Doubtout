const { db, connectDb } = require("./db");
const bcrypt = require('bcryptjs');

const saltRounds = 10;


async function signUpUser(email, password, fullName, role, roleDetails) {
    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 1. Check if the user already exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            throw new Error(`User with email '${email}' is already in use.`);
        }

       
        const [newUser] = await db('users')
            .insert({
                email,
                full_name: fullName, 
                password_hash: passwordHash,
                role,
            })
            .returning(['user_id', 'email', 'role']);

        return newUser;

    } catch (error) {
        console.error('Database insertion error:', error.message);
        throw error;
    }
}


async function loginUser(email, password, role) {
    try {
        const user = await db('users')
            .where({ email, role })
            .first();

        if (!user) {
            return null; 
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            const { password_hash, ...userDetails } = user;
            return userDetails;
        }

        return null; 

    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}


module.exports = {
    signUpUser,
    loginUser,
};
