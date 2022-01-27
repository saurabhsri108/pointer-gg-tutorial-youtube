const Log = console.log; // in production -> should be changed to something like winston
function log(message, filepath) {
  Log(`${new Date()} : ${filepath} : ${message}`);
}

module.exports = log;
