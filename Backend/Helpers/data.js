import bcrypt from 'bcrypt';

const DataHelper = {};
export default DataHelper;

DataHelper.atob = (encodedString) => Buffer.from(encodedString, 'base64').toString('ascii');

DataHelper.encrypt = (target) => bcrypt.hash(target, 8);

DataHelper.compareHash = (targetString, encryptedString) => bcrypt.compare(targetString, encryptedString);
