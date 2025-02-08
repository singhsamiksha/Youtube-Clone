import bcrypt from 'bcrypt';

const DataHelper = {}
export default DataHelper;

DataHelper.atob = (encodedString) => {
    return Buffer.from(encodedString, 'base64').toString('ascii');
}

DataHelper.encrypt = (target) => {
    return bcrypt.hash(target, 8);
}

DataHelper.compareHash = (targetString, encryptedString) => {
    return bcrypt.compare(targetString, encryptedString);
}