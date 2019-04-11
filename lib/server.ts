import {App} from './app';
import 'dotenv/config';
import { Container } from './di/container';
import './controllers/reportsController'
import './controllers/transitController'

const PORT = 3000;

const app = new App(Container, PORT);

app.listen();