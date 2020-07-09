const STRIPE = require('../api/stripe-functions.js');
exports.home = async(req, res) => {
      STRIPE.getAllProductsAndPlans().then(products => {
            products = products.filter(product => {
              return product.plans.length > 0;
            });
            res.render('home/index.ejs', {products: products});
      });
};