
function populateResume(data) {
	var $container = $( '#resume-container' );
	$( '#resume-title' ).append( $( '<h1>' ).text( data['Title'] ) );

	// Contact
	var sectionName = 'Contact';
	var slug = convertToSlug(sectionName);
	var thisData = data.sections[sectionName];
	var $section = $( '#resume-section-' + slug );
	$section.find( '.row-label' ).html( $( '<h3>' ).text( sectionName ) );
	var $content = $section.find( '.row-content' );
	var $ul = $content.find( 'ul' );
	for (var i = 0, len = thisData.length; i < len; i++) {
		$ul.append( $( '<li>' ).text( thisData[i] ) );
	}

	function sectionWithItems(sectionName) {
		var slug = convertToSlug(sectionName);
		var thisData = data.sections[sectionName];
		var $section = $( '#resume-section-' + slug );
		$section.find( '.row-label' ).html( $( '<h3>' ).text( sectionName ) );
		var $content = $section.find( '.row-content' );
		var $itemTemplate = $content.find( '.item' );
		for (var j = 0; j < thisData.length; j++) {
			var itemData = thisData[j];
			console.log(thisData.length);
			var $item = $itemTemplate.clone();
			$item.find( '.item-name' ).html( $( '<h3>' ).text( itemData['name'] ) );
			$item.find( '.item-dates' ).html( '' );  // clear it
			for (var i = 0, len = itemData['dates'].length; i < len; i++) {
				var datesData = itemData['dates'][i]
				var $date = $( '<h3>' ).text( datesData.start + ' — ' + datesData.end );
				$item.find( '.item-dates' ).append( $date );
			}
			$item.find( '.item-name2' ).html( $( '<h5>' ).text( itemData['name2'] ) );
			var $ul = $item.find( '.item-list ul' );
			for (var i = 0, len = itemData['list'].length; i < len; i++) {
				$ul.append( $( '<li>' ).text( itemData['list'][i] ) );
			}
			$content.append( $item );
		}
		$itemTemplate.remove();
	}

	// Education
	var sectionName = 'Education';
	sectionWithItems(sectionName);

	// Work Expreience
	var sectionName = 'Work Experience';
	sectionWithItems(sectionName);

	//
	// // Education
	// var sectionName = 'Education';
	// var slug = convertToSlug(sectionName);
	// var thisData = data.sections[sectionName];
	// var $sectionDiv = getSectionDiv(slug);
	// $sectionDiv.append( getLabelDiv(sectionName, slug) );
	// // $sectionDiv.append( getItem(thisData[0], slug) );
	// $sectionDiv.append( $( '<div class="row row-nested right-side">' ) );
	// for (var i = 0, len = thisData.length; i < len; i++) {
	// 	$sectionDiv.find( '.right-side' ).append( getItem(thisData[i], slug) );
	// }
	// console.log($sectionDiv);
	// $resumeMain.append( $sectionDiv );
		
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
