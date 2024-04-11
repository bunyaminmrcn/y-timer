// imports
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const os = require('os');
const path = require('path');
const cors = require('cors');

const { createServer } = require('http');

// local imports
const { prettyPrint } = require('./logger');
const { bindIO } = require('./sio');

// instances
const app = express();
const userHomeDir = os.homedir();

// ENV consts
const { GLOBAL } = process.env;

const whitelist = ['http://localhost:3000', "http://localhost:3206"]

// config
app.use(helmet());
app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            console.log('origin:', origin, 'not allowed')
            callback(new Error('Not allowed by CORS'))
            //callback(null, true)
        }
    }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'));
app.use(express.static('assets'));
app.use('/api', require('./routes'));

const getConfigFile = () => {
    try {
        const userPath = path.resolve(userHomeDir, '.config', 'timer-app', 'env');
        const configFile = GLOBAL == '0' ? dotenv.config() : dotenv.config({ path: userPath })
        const parsed = configFile.parsed;
        const parsedKeys = Object.keys(parsed);

        return parsedKeys.length > 0 ? { success: true, ...parsed } : { success: false };
    } catch (error) {
        return { success: false, ...error }
    }
}

const serverUp = async () => {

    const config = getConfigFile();
    prettyPrint({ config });

    if (!config.success) {
        return Promise.reject(new Error('Unable to load configuration file'))
    }
    const { SERVER_PORT } = config;

    return new Promise((res, rej) => {
        try {
            const server = createServer(app);
            // handle every other route with index.html, which will contain
            // a script tag to your application's JavaScript file(s).
            app.get('*', function (request, response) {
                response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
            });

            server.listen(SERVER_PORT, async () => {
                console.log(`Server listening on port ${SERVER_PORT}`);
                bindIO(server);
                res({ status: 'OK', port: SERVER_PORT })
            })
        } catch (error) {
            rej({ status: 'FAIL', msg: error.toString() });
        }

    })

};


if (require.main === module) {
    serverUp();
}

module.exports = { serverUp }
