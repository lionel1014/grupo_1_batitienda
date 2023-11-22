const card = require('../js/card.js');

const mainController = {
    index: function(request, response){
        console.log(card)
        response.render("index", {card})
    }
}


module.exports = mainController;