app.use(session({
    secret: 'yourSecret',
    cookie: {
        sameSite: 'Lax', // or 'Strict'
        secure: true
    }
}));
