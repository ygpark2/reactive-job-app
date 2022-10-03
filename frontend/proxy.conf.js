const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */
const proxyConfig = [
  {
    context: '/api',
    // pathRewrite: { '^/api': '' },
    target: 'http://192.168.1.192:8090',  // for Dev
    // target: 'http://localhost:8090',  // for Local Dev
    // target: 'http://app:8090',  // in case of docker
    headers: {
      // Website you wish to allow to connect
      'Access-Control-Allow-Origin': '*',

      // Request methods you wish to allow
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

      // Request headers you wish to allow
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      'Access-Control-Allow-Credentials': true,

      "Connection": "keep-alive"
    },
    changeOrigin: true,
    logLevel: "debug",
    secure: false
  }
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => { entry.agent = agent; });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
