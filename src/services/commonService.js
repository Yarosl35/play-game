import moment from "moment";
import Papa from "papaparse";

export const formatDate = (date, format = "DD/MM/YYYY") => {
  let momentDate = moment(date);
  if (momentDate.isSame(1970, "year")) {
    return null;
  }
  if (format === "DateObject") return new Date(date);

  return momentDate.format(format);
};

export const saveLeaderBoardDemo = (roomID) => {
  return {
    roomID: roomID,
    leaderboard: [
      {
        id: 1,
        name: "Matthew Choi",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "online",
      },
      {
        id: 2,
        name: "Stephen Yip",
        class: "3B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "offline",
      },
      {
        id: 3,
        name: "Edison chan",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "offline",
      },
      {
        id: 4,
        name: "Francis Lo",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "online",
      },
      {
        id: 5,
        name: "F",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "offline",
      },
      {
        id: 6,
        name: "E",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "online",
      },
      {
        id: 7,
        name: "D",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "offline",
      },
      {
        id: 8,
        name: "C",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "online",
      },
      {
        id: 9,
        name: "B",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "offline",
      },
      {
        id: 10,
        name: "A",
        class: "4B",
        score: Math.floor(Math.random() * 1000) + 1,
        status: "online",
      },
    ],
  };
};

export const parseCSV = (data, configs = {}) => {
  let defaultConfig = {
    header: false,
  };

  return Papa.parse(data, {
    ...defaultConfig,
    ...configs,
  });
};
