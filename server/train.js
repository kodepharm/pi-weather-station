const fetch = require('node-fetch');

async function getTrain(req, res) {
  const { default: fetch } = await import("node-fetch");
  try {
    const response = await fetch(
      "https://api.goswift.ly/real-time/mta-maryland-marc/gtfs-rt-trip-updates?format=json",
      {
        headers: {
          Authorization: "17fcc7fb43237c3379ab97ce79cfd808",
        },
      }
    );

    const data = await response.json();
    const entities = data.entity || []; // replace data with "entity" to get live updates of trains
    res.json(entities); // Send the "entity" array to the frontend
  } catch (error) {
    console.error('Error during fetch:', error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  getTrain,
};

