const router = require('express').Router();
const verify = require('./verifyToken');
const jsonfile = require('jsonfile');

router.get('/getByDateRange', verify, (req, res) => {

    const file = '../data.1625230922.json';
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const limit = req.query.limit;
    const page = parseInt(req.query.page);

    const mainurl = req.protocol + "://" + req.headers.host + req.originalUrl;
    const nexturl = mainurl.replace(`page=${page}`, `page=${page + 1}`);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    //console.log("ReponseData", { li: limit, pa: page });
    
    // read json file
    const JsonData = jsonfile.readFileSync(file);

    var result = JsonData.alarms.filter(item => new Date(item.timestamp).getTime() > new Date(startDate).getTime() && new Date(item.timestamp) < new Date(endDate).getTime())
    const response = result.slice(startIndex, endIndex);
    const { length } = JSON.stringify(result);
    //console.log("ReponseData", response);

    const resultData = {
        total_page: length / limit,
        current_page: page,
        limit: limit,
        next_page: (endIndex <= length) ? nexturl : null,
        data: response,
    }

    //console.log("ResultDate", JSON.stringify(resultData));

    res.status(200).send(resultData);


});

router.get('/GetLocationById', verify, (req, res) => {
    const file = '../data.1625230922.json';
    const locationId = req.query.id;
   // console.log("locationId", locationId);
    const JsonData = jsonfile.readFileSync(file);
    var result = JsonData.locations.filter(item => item.id == locationId);
    const resultData = {
        id: result[0].id,
        name: result[0].name
    };
    //console.log("ResultDate", resultData);
    res.status(200).send(resultData);
});


module.exports = router;