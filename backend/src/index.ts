import * as http from 'http';
import * as dotenv from 'dotenv'
import app from './app'
import debug from 'debug';
import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';

const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const port = 8000;
const server: http.Server = http.createServer(app);
dotenv.config()
routes.push(new UsersRoutes(app));

server.listen(port, () => {
	console.log(`We're running at ${port}, process:${process.env.NODE_ENV}`)
	debugLog(`Server running at http://localhost:${port}`);
	routes.forEach((route: CommonRoutesConfig) => {
	    debugLog(`Routes configured for ${route.getName()}`);
	});
});