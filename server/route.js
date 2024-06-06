const fetch = require('node-fetch');

async function getRoute(req, res) {
    try {
      const response = await fetch(
        "https://api.goswift.ly/info/mta-maryland-marc/routes?format=json",
        {
          headers: {
            Authorization: "17fcc7fb43237c3379ab97ce79cfd808",
          },
        }
      );
  
      const data = await response.json();
      const entities = data.data || []; // Extract the "entity" array from the response
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
    getRoute,
  };