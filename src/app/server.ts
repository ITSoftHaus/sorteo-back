import App from './App';

const APP_CONFIG = {
    listenPort: 80,
    appName: process.env.APP_NAME
};

try {

    (new App(APP_CONFIG)).run();

} catch (e) {
    console.error(e.message);
}