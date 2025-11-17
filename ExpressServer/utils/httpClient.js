const axios = require("axios");

exports.get = (url, token) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28"
    }
  }).then(res => res.data);
};

exports.post = (url, body, token) => {
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28"
    }
  }).then(res => res.data);
};