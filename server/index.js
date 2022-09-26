const server = require("./src/app.js");
const { db } = require("./src/db.js");

// Syncing all the models at once.
db.sync({ force: true }).then(() => {
  server.listen(3030, () => {
    console.log("--->   Servidor en puerto 3030"); // eslint-disable-line no-console
  });
});
