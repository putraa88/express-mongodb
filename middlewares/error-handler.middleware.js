module.exports = (err, req, res, next) => {
    console.log(err);
    const messageError = {
        error: true,
        url: req.url,
        method: req.method
    };

    // handle jwt error
    if (err.name == 'JsonWebTokenError') {
        return res.status(401).json({
            ...messageError,
            message: 'authentication failed',
        })
    }

    // handle custom error
    if (err.code && err.message) {
        return res.status(err.code).json({
            ...messageError,
            message: err.message,
        });
    }

    // handle server error
    return res.status(500).json({
        ...messageError,
        message: 'Internal Server Error',
        error: err.errors,
    });
}