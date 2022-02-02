import http from 'http';
import app from './app';
import config from './config/config'

const httpServer = http.createServer(app)

const server = httpServer.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
})
