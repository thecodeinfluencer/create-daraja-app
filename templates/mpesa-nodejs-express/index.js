import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import callbackRoutes from './routes/callbackRoutes.js';
import stkRoutes from './routes/stkRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/example', stkRoutes);
app.use('/api/example', callbackRoutes);

app.listen(PORT, () => console.info(`listening on ${PORT}`));
