import {App} from './app';
import { TransitController } from './controllers/transitController';
import { ReportsController } from './controllers/reportsController';
import 'dotenv/config';

const PORT = 3000;

const controllers = [
    new TransitController,
    new ReportsController,
]

const app = new App(controllers, PORT);

app.listen();