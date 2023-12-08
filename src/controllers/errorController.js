const errorController = {};

errorController.notFound = (req, res) => {
    const errorType = 'Ruta no encontrada';
    res.status(404).render('404', { errorType });
};

module.exports = errorController;