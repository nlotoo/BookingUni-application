const errorHandler = (err, req, res, next) => {

    err.message = err.message || 'Something is wrong!'
    err.status = err.status || 500;

    //TODO RENDER PAGE

    console.log(err)

    res.status(err.status).render('home', { error: err.message })
};
module.exports = errorHandler