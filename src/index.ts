import express, { Request, Response } from 'express'
import { config } from './infrastructure/config';
import cors from 'cors';
import { authRouter } from './routes/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send({ message: 'ping' });
})

app.listen(config?.PORT, () => {
	console.log(`Server has started at ${config?.PORT}`)
})
