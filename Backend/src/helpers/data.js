import moment from 'moment';
import bcrypt from 'bcrypt';

const DataHelper = {};
export default DataHelper;

DataHelper.atob = (encodedString) => Buffer.from(encodedString, 'base64').toString('ascii');

DataHelper.encrypt = (target) => bcrypt.hash(target, 8);

DataHelper.compareHash = (targetString, encryptedString) => bcrypt.compare(targetString, encryptedString);

DataHelper.humanizeTime = (createdAt) => {
  const now = moment();
  const createdMoment = moment(createdAt);
  const diffInYears = now.diff(createdMoment, 'years');
  const diffInMonths = now.diff(createdMoment, 'months');
  const diffInDays = now.diff(createdMoment, 'days');
  const diffInHours = now.diff(createdMoment, 'hours');
  const diffInMinutes = now.diff(createdMoment, 'minutes');

  if (diffInYears >= 2) return `${diffInYears} years ago`;
  if (diffInYears === 1) return 'a year ago';
  if (diffInMonths >= 2) return `${diffInMonths} months ago`;
  if (diffInMonths === 1) return 'a month ago';
  if (diffInDays >= 2) return `${diffInDays} days ago`;
  if (diffInDays === 1) return 'a day ago';
  if (diffInHours >= 2) return `${diffInHours} hours ago`;
  if (diffInHours === 1) return 'an hour ago';
  if (diffInMinutes >= 2) return `${diffInMinutes} minutes ago`;
  if (diffInMinutes === 1) return 'a minute ago';

  return 'just now';
};
