
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
		// $ul.append( $( '<li>' ).text( thisData[i] ) );
		if (thisData[i].startsWith("http")) {
			$ul.append( $( '<li>' ).html( '<a href="'+thisData[i]+'" target="_blank">'+thisData[i]+'</a>' ) );
		} else {
			$ul.append( $( '<li>' ).text( thisData[i] ) );
		}
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
	sectionName = 'Education';
	sectionWithItems(sectionName);

	// Work Expreience
	sectionName = 'Work Experience';
	sectionWithItems(sectionName);

	// Publications
	$.getJSON('jp_publications.json',
		function (publicationsData, textStatus, jqXHR) {
			var sectionName = 'Publications';
			var slug = convertToSlug(sectionName);
			var $section = $( '#resume-section-' + slug );
			$section.find( '.row-label' ).html( $( '<h3>' ).text( sectionName ) );
			var $content = $section.find( '.row-content' );
			var $ul = $content.find( 'ul' );
			for (var i = 0, len = publicationsData.length; i < len; i++) {
				var pubHtml = parseOnePublication(publicationsData[i]);
				$ul.append( $( '<li>' ).html( pubHtml ) );
			}
		}
	);
	
	// Skills
	var sectionName = 'Skills';
	var slug = convertToSlug(sectionName);
	var thisData = data.sections[sectionName];
	var $section = $( '#resume-section-' + slug );
	$section.find( '.row-label' ).html( $( '<h3>' ).text( sectionName ) );
	var $content = $section.find( '.row-content' );
	var $ul = $content.find( 'ul' );
	console.log(thisData);
	for (var i = 0, len = thisData.length; i < len; i++) {
		$ul.append( $( '<li>' ).text( thisData[i] ) );
	}

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

// function getPublicationsFromJSON(publicationsData) {
// 	console.log(publicationsData);
// 	for (var i = 0, len = publicationsData.length; i < len; i++) {
// 		var pubHtml = parseOnePublication(publicationsData[i]);
// 		console.log(pubHtml)
// 	}
// }

function parseOnePublication(pub) {
	function wrapSpan(text, className) {
		return '<span class="' + className + '">' + text + '</span>';
	}
	var authors = [];
	for (var i = 0, len = pub.author.length; i < len; i++) {
		var lastname = pub.author[i]['family'];
		var initials = pub.author[i]['given'].split(" ").map(function(x) {return x[0];}).join("");
		authors.push(lastname + " " + initials);
	}
	authors = authors.join(", ")
	authors = wrapSpan(authors, 'pub-authors');
	var title = pub.title;
	title = wrapSpan(title, 'pub-title');
	var venue = pub['container-title'];
	venue = wrapSpan(venue, 'pub-venue');
	var year = pub.issued['date-parts'][0][0];
	year = wrapSpan(year, 'pub-year');
	var pubHtml = authors + '. ' + title + '. ' + venue + ' (' + year + ').';
	return pubHtml;
}
