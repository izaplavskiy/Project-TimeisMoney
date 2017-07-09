'use strict';

// Hover on photo
var msg = {
			required: "This field is required",
			maxLength: "This field is too long",
			email: "Email is not valid"
			},
		config = {
			name: { required: true,
					maxLength: 30},
			email: { required: true,
					 email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/},
			message: { required: true,
					   maxLength: 200}
			},
		errors = {};

$(document).ready(function() {

	$('.services--item-btn').hover(

		function(){
			$( this).parent().children('.services--item-title').addClass('active');
			
	},
		function(){
			$( this).parent().children('.services--item-title').removeClass('active');
	});




	// form



	$('#contactsForm').find('input[type="submit"]').on('click', function( event ) {
  event.preventDefault();

  	validateForm();
	});
});


	


	function validateForm() {

		var el,
			elementValue,
			name;

		$('#contactsForm').find('input[type="text"], textarea').each(function(){

			    el = $(this),
				elementValue = el.val(),
				name = el.attr('name');

				errors[name] = false;

				$.each( config[name], function( key, value ) {
  						switch (key) {

  							case 'required': validate(validation.required, value, elementValue, name, 'required');
  								break;

  							case 'maxLength': validate(validation.maxLength, value, elementValue, name, 'maxLength');
  								break;

  							case 'email': validate(validation.email, value, elementValue, name, 'email');
  								break;
  						}
					});
		});

		var isValid = true;
		
		$.each(errors, function(key, value) {

			var span = $('#contactsForm').find('span#' + key),
				elem = $('#contactsForm').find('[name=' + key+']');

			if (value !== false) {

				isValid = false;
				span.text(this)

				elem.addClass('error');

			} else {

				elem.text('');
				elem.removeClass('error');
			}
		})


		
        if (isValid) {
        	$('#contactsForm').submit();
        }

	}

	

	var validation = {
		required: function(value) {

			if (value) { return true} 
			
			else { return false }
		},
		maxLength: function (value, param ) {

			return value.length < param;
		},
		email: function (value, param) {

			return param.test(value);
		}
	}



	function validate(func, param, value, name, msgKey) {

		var isValid = func(value, param );

		if ( isValid  === false ) {

			errors[name] = msg[msgKey]
		}

	}




	