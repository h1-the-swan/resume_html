
function populateResume(data) {
	var $container = $( '#resume-container' );
	$( '#resume-title' ).append( $( '<h1>' ).text( data['Title'] ) );

	function getSectionDiv(slug) {
		return $( '<div id="resume-section-' + slug + '" class="resume-section">')
	}

	// Contact
	// var $contact = $( '<div id="resume-section-contact"')
	var sectionName = 'Contact';
	var slug = convertToSlug(sectionName);
	console.log(slug);
	var contactData = data.sections['Contact'];
	$div = getSectionDiv(slug);
	$ul = $( '<ul>' );
	for (var i = 0, len = contactData.length; i < len; i++) {
		$ul.append( $( '<li>' ).text(contactData[i]));
	}
	$div.append( $ul );
	$( '#resume-main' ).append( $div );
		
}

$( document ).ready( function() {
	$.getJSON('resume-data.json',
		function (data, textStatus, jqXHR) {
			console.log(data);
			populateResume(data);
		}
	);
});

// https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}
