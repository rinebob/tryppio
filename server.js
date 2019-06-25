
const app = require("./server/app");
const http = require("http");
// const debug = require("debug")("node-angular");
const debug = require("debug")("node-images");

// -----------------------------------------------
// ensure received port number is a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// -----------------------------------------------
// diagnoses error and reports message;  allows app to continue running
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// -----------------------------------------------
// logs the port number being used
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
  console.log("listening on port: ",port)
};

// -----------------------------------------------
// server tasks:

// sets port value
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//create server
const server = http.createServer(app);

// listen for onError method above
server.on("error", onError);

// listen for onListening method above
server.on("listening", onListening);

// start server
server.listen(port);

