import App from './App';

const APP_CONFIG = {
    listenPort: process.env.LISTEN_PORT,
    appName: process.env.APP_NAME
};

try {

    (new App(APP_CONFIG)).run();

} catch (e) {
    console.error(e.message);
}