var accepted_ns = 0;

mw.loader.using( 'mediawiki.util', function () {
    importScript('User:DannyS712 test/append.js');
    $(document).ready( function () { 
        var link = mw.util.addPortletLink( 'p-cactions', '#', 'Cats', 'ca-cats', 'cats'); 
        $( link ).click( function ( event ) {
            event.preventDefault();
            cats();
        } );
    } );
} );
function cats () {
	var page = prompt("Please enter the category name (not including \"Category:\")", "Wikipedians");
	var number = parseInt(prompt("How many links would you like added", "10"), 10);

	if (number == -1){
		accepted_ns = parseInt(prompt("What namespace would you like to be included? (Use the namespace number)", "0"), 0);
		number = parseInt(prompt("How many links would you like added", "10"), 10);
	}
	
	if (page === null || page === "") {
	  console.log( "User cancelled the prompt." );
	} else {
		console.log( page );
		var catRequest = {
            action: 'query',
            list: 'categorymembers',
            cmlimit: number,
            cmtitle: 'Category:' + page,
            cmprop: 'title',
            format: 'json'
		};
		$.get( mw.config.get( 'wgScriptPath' ) + '/api.php', catRequest, function( catResponse ) {
			var pages = catResponse.query.categorymembers;
			var listed = [];
			var links = "";
			for (var i = 0; i < pages.length; i++) {
				var this_link = make_link( pages[i] );
				listed.push(this_link);
				links = links + this_link;
			}
			if ( links === "" ) {
				alert( "There are no pages in the specified namespace in that category." );
			}
			else addNewSection( 'Adding links with [[User:DannyS712/Cat links|cat links]]', 'Pages in [[:Category:' + page + ']]', links );
		} );
	}
}
function make_link( page_element ){
	var page_ns = page_element.ns;
	var page_name = page_element.title;
	var this_link = "";
	if ( page_ns === accepted_ns ) {
		this_link = '* [[' + pages[i].title + ']]\n';
	}
	return this_link;
}