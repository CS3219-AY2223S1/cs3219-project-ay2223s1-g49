import bcrypt from 'bcrypt'

async function createSaltAndHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

async function verifyPassword(attempt, storedPassword) {
    try {
        return await bcrypt.compare(attempt, storedPassword);
    } catch(err) {
        console.log("Error occured at verifyPassword", err)
    }
}

export {createSaltAndHash, verifyPassword}