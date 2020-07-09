if (document.getElementById('card-element')) {
    /* Replace 'pk_test_************************' with your publishable key */
    var stripe = Stripe('pk_test_4Ksg2y2OJKsaI5cfKwmlxd80');
    var elements = stripe.elements();

    /* Custom styling can be passed to options when creating an Element */
    var style = {
      base: {
        fontSize: '16px', '::placeholder': { color: "#aab7c4"},
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    /* Create a Stripe Elements instance 
      and mount to the div with the id 'card-element' */

    var card = elements.create('card', {style: style});

    card.mount('#card-element');

    /* Handle validation errors */
    card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = ''; 
      }
    });

    /* Create a token when the form is submitted */
    var form = document.getElementById('payment-form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          stripeTokenHandler(result.token);
        }
      })
    });
  }

  function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    form.submit();
  }