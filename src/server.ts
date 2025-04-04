import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

// Expondo as imagem para acesso externo no frontend
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Error) {
        //Se for uma instancia do tipo Error
        return res.status(400).json({
            error: error.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server started')
});