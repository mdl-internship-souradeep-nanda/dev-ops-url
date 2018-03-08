const hapi = require('hapi');
const good = require('good');

const routes = require('./routes');

// Create a new Hapi server
const server = new hapi.Server({
  connections: {
    routes: {
      cors: true,
    },
  },
});

server.connection({
  port: Number(process.env.PORT || 8080),
  host: '0.0.0.0',
});

server.register({
  register: good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
});

server.route(routes);

/**
 * Start the server
 */
if (!module.parent) {
  server.start(() => {
    console.log(`Server running at: ${server.info.uri}`);
  });
}

module.exports = server;
