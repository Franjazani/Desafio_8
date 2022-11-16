module.export = {
    development: {
        client: 'sqlite3',
        connection: { filename: './myDB.sqlite' },
        useNullAsDefault: true,
    },

    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            port: 8080,
            password: '',
            database: '',
        },
    },
};