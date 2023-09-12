const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        title: "Personnel API",
        message: "Manual on how to use the API is found at: https://github.com/wadholm/personnel-api/tree/dev#readme"
    };

    res.json(data);
});

module.exports = router;
