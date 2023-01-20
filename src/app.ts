import express, { Request, Response} from 'express';
import { serieRouter } from './routers/seriesRouter.js';
import { volumeRouter } from './routers/volumesRouter.js';

const server = express();
server.use(express.json());

server.get('/health', (req: Request, res: Response) => {
    return res.send('Server is healthy!');
});
server.use('/', serieRouter);
server.use('/', volumeRouter);



server.listen(4000, () => {
    console.log('Server is listening on port 4000.')
});