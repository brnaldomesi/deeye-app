import moment from 'moment';

export const getValidationErrorString = fieldName => 'Incorrect ' + fieldName;

export const hasLowerCase = str => /[a-z]/.test(str);

export const hasUpperCase = str => /[A-Z]/.test(str);

export const hasNumber = str => /\d/.test(str);

export const hasPunctuation = str => /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(str);

export const getDiffFromToday = (inputTime, isTimeStamp = false) => {
  const ts = isTimeStamp ? moment(moment.unix(inputTime).format("MM/DD/YYYY")) : moment(inputTime);
  const today = moment();
  //const today = moment().utc(moment());
  const duration = moment.duration(today.diff(ts));

  const years = duration.asYears();
  //Get Days and subtract from duration
  const days = duration.asDays();

  //Get hours and subtract from duration
  const hours = duration.hours();

  //Get Minutes and subtract from duration
  const minutes = duration.minutes();

  //Get seconds
  const seconds = duration.seconds();

  if(years >= 1) {
    return parseInt(years) + ' yrs';
  } else if(days >= 1) {
    return parseInt(days) + ' days';
  } else if(hours >= 1) {
    return parseInt(hours) + ' hrs';
  } else if(minutes >= 1) {
    return parseInt(minutes) + ' min';
  } else if(seconds >= 1) {
    return parseInt(seconds) + ' sec';
  }
}

export const refineJSON = param => {
  if (param == null || param == undefined) {
    return;
  }

  if(typeof param[Symbol.iterator] === 'function' || typeof param === 'string') {
    var dataArray = [...param];
    if (dataArray.filter(x => x == '{').length == dataArray.filter(x => x == '}').length + 1) param += '}';
    if (dataArray.filter(x => x == '[').length == dataArray.filter(x => x == ']').length + 1) param += ']';
  }

  if(typeof param === 'object') {
    return param;
  }

  const length = param.length;

  if(param[0] == '{' && param[length - 1] != '}') {
    param += '}';
  }

  if(param[0] == '[' && param[length - 1] != ']') {
    param += ']';
  }

  if (typeof param === 'string') {
    return JSON.parse(param);
  }

  return param;
}
