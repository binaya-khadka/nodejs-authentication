import express, { Request, Response } from 'express'
import { PORT } from './config'

import { authRouter } from './routes/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send({ message: 'ping' });
})

app.listen(PORT, () => {
	console.log(`Server has started at ${PORT}`)
})
