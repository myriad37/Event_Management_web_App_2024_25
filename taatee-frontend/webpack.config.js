const path = require('path');

module.exports = {
  entry: {
    index: './src/pages/index/index.ts',
    team: './src/pages/team/team.ts',
    events: './src/pages/events/events.ts',
    event_detail: './src/pages/events/event_detail.ts',
    login: './src/pages/login/login.ts',
    register: './src/pages/signup/signup.ts',
    user: './src/pages/user/user.ts',
    admin: './src/pages/admin/admin.ts',
    booking: './src/pages/booking/booking.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets/js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
