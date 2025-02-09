import moment from 'moment';

export const APPErrorUtil = (...e) => {
  console.error(...e);
}

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name, sx = {}) => {
  const nameParts = (name || '').split(' ');
  const a = (nameParts[0] ? nameParts[0][0] : '').toUpperCase();
  const b = (nameParts[1] ? nameParts[1][0] : '').toUpperCase();

  return {
    sx: {
      ...sx,
      bgcolor: stringToColor(name || ''),
    },
    children: `${a}${b}`,
  };
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const humanizeTime = (createdAt) => {
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
