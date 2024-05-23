async function getTrain(req, res) {
  try {
    const response = await fetch(
        "https://api.goswift.ly/real-time/mta-maryland-marc/gtfs-rt-trip-updates?format=json",
        {
          headers: {
            Authorization: "Bearer 17fcc7fb43237c3379ab97ce79cfd808",
          },
        }
      );
    
      const data = await response.json();
      res.json(data);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getTrain,
};
