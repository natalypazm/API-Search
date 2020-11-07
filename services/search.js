const express = require("express");
const axios = require("axios");

const router = express.Router();

async function getFromTvMaze(query) {
  try {
    const resp = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${query}`
    );
    return parseTvMazeData(resp.data);
  } catch (err) {
    console.error(err);
  }
}

async function getFromApple(query) {
  try {
    const resp = await axios.get(
      `https://itunes.apple.com/search?term=${query}`
    );

    return parseAppleData(resp.data);
  } catch (err) {
    console.error(err);
  }
}

function parseTvMazeData(data) {
  return data.map((el) => {
    const show = el["show"];
    return {
      id: show.id,
      source: "tvmaze",
      name: show.name,
      type: "tvshow",
      image: show.image ? show.image.original : ''
    };
  });
}

function parseAppleData(data) {
  const results = data["results"];
  return results.map((el) => {
    return {
      id: el.trackId,
      source: "apple",
      name: el.trackName,
      type: el.kind,
      image: el.artworkUrl100,
    };
  });
}

async function search(query) {
  const apple = await getFromApple(query);
  const tvMaze = await getFromTvMaze(query);

  return {
    status: 200,
    data: [...apple, ...tvMaze],
  };
}

router.get("/search", async (req, res) => {
  res.send(await search(req.query.q));
});

module.exports = router;
