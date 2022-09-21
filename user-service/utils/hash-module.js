import bcrypt from 'bcrypt'

function createSaltAndHash(password) {
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    return [salt, hashedPassword];
}

function generateHash(salt, unhashedPassword) {
    const hashedPassword = bcrypt.hash(unhashedPassword, salt);

    return hashedPassword;
}

export {createSaltAndHash, generateHash}