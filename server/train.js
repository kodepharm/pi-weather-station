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
    res.json(data);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
}

module.exports = {
  getTrain,
};
