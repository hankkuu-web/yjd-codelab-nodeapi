const env = process.env.NODE_ENV || 'development';

const environments = {
  development: {
    db: {
      dialect: 'sqlite',
      storage: 'db.sqlite'
    }
  },
  production: {
    db: {
      dialect: 'sqlite',
      storage: 'db.sqlite'
    }
  },
  test: {
    db: {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    }
  }
};

module.exports = environments[env];
