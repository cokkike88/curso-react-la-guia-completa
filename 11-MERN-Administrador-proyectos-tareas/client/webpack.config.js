const env = process.env.NODE_ENV;
const webpack = require(`./webpack.${env}.js`);
console.log(webpack);
module.exports = webpack;