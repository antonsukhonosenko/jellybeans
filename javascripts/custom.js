// todo: extract single function
// todo: generalize handlers based on UI control type
// todo: add price filtering

function filter_items() {
	checked_brands = $('input.brands[type="checkbox"]:checked');
	checked_sizes = $('.sizes input[type="checkbox"]:checked');
	checked_flavors = $('input.flavors[type="checkbox"]:checked');
	checked_colors = $('.colors input[type="checkbox"]:checked');
	
	checked_b = [];
	checked_brands.each(function (index) {
		checked_b.push('.'+this.id);
	});
	
	checked_s = [];
	checked_sizes.each(function (index) {
		checked_s.push('.'+this.id);
	});
	
	checked_f = [];
	checked_flavors.each(function (index) {
		checked_f.push('.'+this.id);
	});
	
	checked_c = [];
	checked_colors.each(function (index) {
		checked_c.push('.'+this.id);
	});
	
	$('.result_item').hide();
	
	items = $('.result_item');
	
	if(checked_b.length > 0)
		items = items.filter(checked_b.join(','));
	
	if(checked_s.length > 0)
		items = items.filter(checked_s.join(','));
		
	if(checked_f.length > 0)
		items = items.filter(checked_f.join(','));
	
	if(checked_c.length > 0)
		items = items.filter(checked_c.join(','));
		
	items.show();
}

$(document).ready(function (){	

	// drop all checkboxes, just in case
	// valid only for this assessment task, in real life checkboxes must persist between pages

	$('input[type="checkbox"]').removeAttr('checked');

	// filter by brands

	$('.brands').change(function(e) {
		filter_items();	
	});
	
	// filter by sizes: small, middle or big
	
	$('.sizes').click(function(e) {
		
		bean = $(e.target);
		checkbox = bean.children()[0]; // checkbox inside
			
		if(checkbox.checked != true) {
			$(checkbox).attr('checked','checked');
			bean.css('background-image', 'url(images/'+$(bean).attr('id')+'_checked.gif)');
		}
		else {
			$(checkbox).removeAttr('checked');
			bean.css('background-image', 'url(images/'+$(bean).attr('id')+'.gif)');
		}
		
		filter_items();			
	});	
	
	// filter by colors
	
	$('.colors').click(function(e) {
		$('.result_item').hide();
		
		color = $(e.target);
		checkbox = color.children()[0]; // checkbox inside
			
		if(checkbox.checked != true) { // !checkbox.checked may not work
			$(checkbox).attr('checked','checked');
			color.css('border', '2px solid black');
		} else {
			$(checkbox).removeAttr('checked');
			
			if($(color).attr('id') == 'white') {
				color.css('border', '2px solid lightgrey');
			} else {
				color.css('border', '2px solid white');
			}
		}
		
		filter_items();			
	});	
	
	// filter by flavors
	
	$('.flavors').change(function(e) {
		filter_items();	
	});
	
	// inline search - pretty dumb but works
	// doesn't search by price in this sample
	
	$('#search_all').keyup(function(e) {
	
		// drop all checkboxes, since we're using different search pattern here anyway
		// doesn't have undo.
		$('input[type="checkbox"]').removeAttr('checked');
	
		items = $('.result_item');

		items.each(function (index) {
		
			// we need to lowercase it to find 'red' and 'Red' as well
		
			item_text = $(items[index]).children('.name').text().toLowerCase();
			search_text = $(e.target).val().toLowerCase();
			
			if(item_text.indexOf(search_text) >= 0) { // if we have something like search string in item names
				$(items[index]).show();
			}
			else {
				$(items[index]).hide();
			}
		});
	});
});