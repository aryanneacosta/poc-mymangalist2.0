import express from 'express';
import { getSeriesList, postSeries } from './controllers/seriesController.js';
var server = express();
server.use(express.json);
server.get('/health', function (req, res) {
    return res.send('Server is healthy!');
});
server.get('/series', getSeriesList);
server.post('/series', postSeries);
server.listen(4000, function () {
    console.log('Server is listening on port 4000.');
});
