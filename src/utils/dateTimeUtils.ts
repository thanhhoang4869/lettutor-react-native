const toPeriodTimeStamp = (date: moment.Moment): any => {
  const period: {
    start: number;
    end: number;
  } = {
    start: 0,
    end: 0,
  };

  date.subtract(12, 'hours');
  const start = date.clone().unix() * 1000;
  date.add(1439, 'minutes');
  const end = date.clone().unix() * 1000;

  period.start = start;
  period.end = end;

  return period;
};

const toPeriodTimeStampOfDay = (date: moment.Moment): any => {
  return toPeriodTimeStamp(
    date.hours(0).minutes(0).seconds(0).add(12, 'hours'),
  );
};

const toLetTutorTimeString = (timestamp: number): string => {
  const date = new Date(timestamp);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (+hours < 10) {
    hours = `0${hours}`;
  }

  if (+minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

const getCurrentTimeStamp = (): number => {
  return new Date().getTime();
};

const timeStampToDateString = (timestamp: number): string => {
  const date = new Date(timestamp);

  const dateString = date.getDate().toString();
  const monthString = (date.getMonth() + 1).toString();
  const yearString = date.getFullYear().toString();

  const dateFormatted = `${dateString.length === 1 ? '0' : ''}${dateString}`;
  const monthFormatted = `${monthString.length === 1 ? '0' : ''}${monthString}`;

  return `${date.getFullYear()}-${monthFormatted}-${dateFormatted}`;
};

const dateTimeUtils = {
  toPeriodTimeStamp,
  toPeriodTimeStampOfDay,
  toLetTutorTimeString,
  getCurrentTimeStamp,
  timeStampToDateString,
};

export default dateTimeUtils;
