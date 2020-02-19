module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const params = args;
      params[0].apiUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA671RqVfdvz5pBYtx7jg6E4cExW6fUFUA';
      return args;
    });
  },
};
