// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();
// const port = 3000;

// app.get('/api/train-updates', async (req, res) => {
//     try {
//         const response = await fetch('https://api.goswift.ly/real-time/mta-maryland-marc/gtfs-rt-trip-updates?format=json', {
//             headers: {
//                 'Authorization': 'Bearer 17fcc7fb43237c3379ab97ce79cfd808'
//             }
//         });
//         const data = await response.json();
//         console.log(data); 
//         res.json(data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred while fetching train updates' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/api/train-updates', async (req, res) => {
    try {
        const response = await fetch('https://api.goswift.ly/real-time/mta-maryland-marc/gtfs-rt-trip-updates?format=json', {
            headers: {
                'Authorization': 'Bearer 17fcc7fb43237c3379ab97ce79cfd808'
            }
        });
        const data = await response.json();
        console.log('Data fetched from external API:', data); // Log the data
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching train updates' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
