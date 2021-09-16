import moment from "moment";
import Papa from 'papaparse';

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  let momentDate = moment(date);
  if (momentDate.isSame(1970, 'year')) {
    return null;
  }
  if (format  === 'DateObject') return new Date(date);

  return momentDate.format(format);
}

export const saveLeaderBoardDemo = (roomID) => {
  return {
    roomID: roomID,
    leaderboard: [
      {
        name: "Matthew Choi",
        class: "4B",
        score: 500,
        status: "online"
      },
      {
        name: "Stephen Yip",
        class: "3B",
        score: 400,
        status: "offline"
      },
      {
        name: "Edison chan",
        class: "4B",
        score: 300,
        status: "offline"
      },
      {
        name: "Francis Lo",
        class: "4B",
        score: 100,
        status: "online"
      },
    ]
  };
}

export const parseCSV = (data, configs = {}) => {
  let defaultConfig = {
    header: false
  };

  return Papa.parse(data, {
    ...defaultConfig,
    ...configs
  });
}