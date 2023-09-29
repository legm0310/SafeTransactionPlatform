/**
 * 포멧 형식
 * 년: YYYY
 * 월: M or MM
 * 일: D or DD
 * 시: h or hh
 * 분: m or mm
 * 초: s or ss
 *
 * 예시: YYYY-MM-DD-hh-mm-ss
 */
// 날짜로 변환
export const dateFormat = (value, format) => {
  const date = new Date(value);

  const dateArray = [];
  let result = "";
  const decorationArray = format.match(/[^YMDhms]/g);
  let decorationIndex = 0;

  dateArray.push(yearFormat(date, format));
  dateArray.push(monthFormat(date, format));
  dateArray.push(dayFormat(date, format));
  dateArray.push(hourFormat(date, format));
  dateArray.push(minuteFormat(date, format));
  dateArray.push(secondFormat(date, format));

  dateArray.forEach((v) => {
    if (!v) return;

    const decoration = decorationArray[decorationIndex]
      ? decorationArray[decorationIndex]
      : "";
    decorationIndex += 1;

    result += `${v}${decoration}`;
  });

  return result;
};

// 지난 시간으로 변환
export const timeFormat = (value) => {
  const date = new Date(value);

  const temp = new Date().getTime() - date.getTime();

  // 1분이하
  if (temp / 1000 < 60) {
    return `${Math.floor(temp / 1000)}초전`;
  }
  // 1시간이하
  if (temp / 1000 / 60 < 60) {
    return `${Math.floor(temp / 1000 / 60)}분전`;
  }
  // 1일이하
  if (temp / 1000 / 60 / 60 < 24) {
    return `${Math.floor(temp / 1000 / 60 / 60)}시간전`;
  }
  // 1월이하
  if (temp / 1000 / 60 / 60 / 24 < 30) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24)}일전`;
  }
  // 1년이하
  if (temp / 1000 / 60 / 60 / 24 / 30 < 12) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30)}개월전`;
  }
  // 1년 이상
  return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30 / 12)}년전`;
};

// 일주일 이내면 시간 아니면 날짜로 반환
export const dateOrTimeFormat = (value, format) => {
  // 일주일 이후
  if (Date.now() - new Date(value).getTime() > 1000 * 60 * 60 * 24 * 7)
    return dateFormat(value, format);
  else return timeFormat(value);
};

// 플레이 시간 변환기
export const timeConverter = (duration) => {
  if (+duration >= 60) {
    return `${Math.floor(+duration / 60)} : ${+duration % 60}`;
  }
  return `0:${+duration % 60}`;
};

// 년 포멧
const yearFormat = (date, format) => {
  const yearRegexp = /YY{2}/g;
  const yearRegexpResult = format.match(yearRegexp);

  switch (yearRegexpResult?.length) {
    case 1:
      return date.getFullYear();
    case 2:
      return +String(date.getFullYear()).slice(2);
    default:
      return;
  }
};

// 월 포멧
const monthFormat = (date, format) => {
  const monthRegexp = /M/g;
  let month = null;
  const monthRegexpResult = format.match(monthRegexp);

  // 포멧에 월 없으면 리턴
  if (!monthRegexpResult) return;

  month = date.getMonth() + 1;

  // mm일 때 ( 06 )
  if (monthRegexpResult?.length === 2 && month < 10) {
    month = `0${month}`;
  }

  return month;
};

// 일 포멧
const dayFormat = (date, format) => {
  const dayRegexp = /D/g;
  let day = null;
  const dayRegexpResult = format.match(dayRegexp);

  // 포멧에 일 없으면 리턴
  if (!dayRegexpResult) return;

  day = date.getDate();

  // mm일 때 ( 06 )
  if (dayRegexpResult?.length === 2 && day < 10) {
    day = `0${day}`;
  }

  return day;
};

// 시간 포멧
const hourFormat = (date, format) => {
  const hourRegexp = /h/g;
  let hour = null;
  const hourRegexpResult = format.match(hourRegexp);

  // 포멧에 시간 없으면 리턴
  if (!hourRegexpResult) return;

  hour = date.getHours();

  // mm일 때 ( 06 )
  if (hourRegexpResult?.length === 2 && hour < 10) {
    hour = `0${hour}`;
  }

  return hour;
};

// 분 포멧
const minuteFormat = (date, format) => {
  const minuteRegexp = /m/g;
  let minute = null;
  const minuteRegexpResult = format.match(minuteRegexp);

  // 포멧에 분 없으면 리턴
  if (!minuteRegexpResult) return;

  minute = date.getMinutes();

  // mm일 때 ( 06 )
  if (minuteRegexpResult?.length === 2 && minute < 10) {
    minute = `0${minute}`;
  }

  return minute;
};

// 초 포멧
const secondFormat = (date, format) => {
  const secondRegexp = /m/g;
  let second = null;
  const secondRegexpResult = format.match(secondRegexp);

  // 포멧에 초 없으면 리턴
  if (!secondRegexpResult) return;

  second = date.getSeconds();

  // mm일 때 ( 06 )
  if (secondRegexpResult?.length === 2 && second < 10) {
    second = `0${second}`;
  }

  return second;
};

console.log(dateOrTimeFormat(new Date(), "YYYY-MM-DD-HH-MM-SS"));
