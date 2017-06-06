
function populateResume(data) {
	var $container = $( '#resume-container' );
	$( '#resume-title' ).append( $( '<h1>' ).text( data['Title'] ) );

	function getSectionDiv(slug) {
		return $( '<div id="resume-section-' + slug + '" class="resume-section row">');
	}

	function getLabelDiv(label, slug) {
		var $div = $( '<div id="resume-' + slug + '-label" class="row-label">' );
		$div.append( $( '<h3>' ).text(label) );
		return $div;
	}

	function getContentDiv(slug) {
		return $( '<div id="resume-' + slug + '-content" class="row-content">' );
	}

	var $resumeMain = $( '#resume-main' );

	// Contact
	var sectionName = 'Contact';
	var slug = convertToSlug(sectionName);
	var thisData = data.sections[sectionName];
	var $sectionDiv = getSectionDiv(slug);
	$sectionDiv.append( getLabelDiv(sectionName, slug) );
	var $ul = $( '<ul>' );
	for (var i = 0, len = thisData.length; i < len; i++) {
		$ul.append( $( '<li>' ).text(thisData[i]));
	}
	var $contentDiv = getContentDiv(slug);
	$contentDiv.append( $ul );
	$sectionDiv.append( $contentDiv );
	console.log($sectionDiv);
	$resumeMain.append( $sectionDiv );

	function getItem(itemData, slug) {
		var $contentDiv = getContentDiv(slug);
		// $contentDiv.addClass( 'row-nested' );
		// $contentDiv.addClass( 'row' );
		var $name = $( '<div class="row-header">' );
		$name.append( $( '<h3>' ).text( itemData.name ) );
		$contentDiv.append( $name );

		var $dates = $( '<div class="row-header">' );
		for (var i = 0, len = itemData.dates.length; i < len; i++) {
			$dates.append( $( '<h3>' ).text( itemData.dates[i].start + '—' + itemData.dates[i].end) );
		}
		$contentDiv.append( $dates );
		$contentDiv.append( $( '<div class="row-oneline">' ).append( $('<h5>').text('pdfs')));
		$contentDiv.append( $( '<div class="row-oneline">' ).append( $('<h5>').text('pdfs')));
		return $contentDiv;
	}
	
	// Education
	var sectionName = 'Education';
	var slug = convertToSlug(sectionName);
	var thisData = data.sections[sectionName];
	var $sectionDiv = getSectionDiv(slug);
	$sectionDiv.append( getLabelDiv(sectionName, slug) );
	// $sectionDiv.append( getItem(thisData[0], slug) );
	$sectionDiv.append( $( '<div class="row row-nested right-side">' ) );
	for (var i = 0, len = thisData.length; i < len; i++) {
		$sectionDiv.find( '.right-side' ).append( getItem(thisData[i], slug) );
	}
	console.log($sectionDiv);
	$resumeMain.append( $sectionDiv );
		
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
