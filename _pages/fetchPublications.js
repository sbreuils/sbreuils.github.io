fetch("https://api.archives-ouvertes.fr/search/cnrs/?omitHeader=true&wt=json&q=Stephane%20Breuils&sort=producedDate_tdate+desc&fq=collCode_s%3ACNRS&fq=NOT+status_i%3A111&fq={!tag%3Dtag0__docType_s}docType_s%3A(%22ART%22+OR+%22COMM%22+OR+%22OUV%22+OR+%22COUV%22+OR+%22DOUV%22+OR+%22REPORT%22+OR+%22THESE%22+OR+%22HDR%22+OR+%22LECTURE%22)&defType=edismax&rows=1000&fl=uri_s%2CdocType_s%2Ctitle_s%2CauthFullName_s%2CproducedDate_s%2CjournalTitle_s%2CjournalPublisher_s%2Cvolume_s%2Cnumber_s%2Cpage_s%2CbookTitle_s%2CconferenceTitle_s%2CconferenceStartDate_s&sort=producedDate_s%20desc")
		.then(response => {
				return response.json()
		})
		.then(data => {
				// Work with JSON data here
				appendData( data );
		})
		.catch(err => {
				// Do something for an error here
		})

function delete_double_quotes( txt )
{
		return txt.slice( 1, -1 );
}

function appendData( data )
{
		console.log("This is the beginning of the function my master");

		var mainContainer = document.getElementById("sbreuils_papers");

		var div = document.createElement("div");
		div.className = "boxed-content";
		div.innerHTML = " There are, for the moment, " + data.response.docs.length + " publications in HAL.";
		mainContainer.appendChild(div);

		var years = [];
		
		console.log("This is the end my master");
		for( var i = 0; i < data.response.docs.length; i++ )
		{
				var doctype = delete_double_quotes( JSON.stringify( data.response.docs[i].docType_s ) );
				var date = delete_double_quotes( JSON.stringify( data.response.docs[i].producedDate_s ) );
				var year = date.slice( 0, 4 );
				
				if( !years.find( function(element) { return element == year; }) )
				{
						years.push( year );
						var div_year = document.createElement("div");
						div_year.innerHTML = "<h2>" + year + "</h2>";
						mainContainer.appendChild( div_year );
				}
				
				var div_box = document.createElement("div");
				div_box.className = "boxed-content";

				// if( JSON.stringify( data.response.docs[i].journalTitle_s ) )
				// {
				// 		var div_type = document.createElement("div");
				// 		div_type.className = "article-type";
				// 		div_type.innerHTML = "Journal"
				// 		div_box.appendChild( div_type );
				// }
				if( doctype == "ART" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "<h3>" + "Journal" + "</h3>";
						div_box.appendChild( div_type );
				}
				else if( doctype == "OUV" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "Book"
						div_box.appendChild( div_type );
				}
				else if( doctype == "COUV" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "Book Chapter"
						div_box.appendChild( div_type );
				}
				else if( doctype == "DOUV" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "Proceedings"
						div_box.appendChild( div_type );
				}
				else if( doctype == "THESE" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "<h3>" + "Thesis" + "</h3>"
						div_box.appendChild( div_type );
				}
				else if( doctype == "COMM" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "<h3>" + "Conference" + "</h3>"
						div_box.appendChild( div_type );
				}
				else if( doctype == "REPORT" )
				{
						var div_type = document.createElement("div");
						div_type.className = "article-type";
						div_type.innerHTML = "Report"
						div_box.appendChild( div_type );
				}

				var div_title = document.createElement("div");
				div_title.className = "article-title";
				div_title.innerHTML = delete_double_quotes( JSON.stringify( data.response.docs[i].title_s[0] ) );
				div_box.appendChild( div_title );

				var div_authors = document.createElement("div");
				div_authors.className = "authors";
				div_authors.innerHTML = delete_double_quotes( JSON.stringify( data.response.docs[i].authFullName_s[0] ) );
				for( var a = 1; a < data.response.docs[i].authFullName_s.length; a++)
						div_authors.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].authFullName_s[a] ) )
				div_box.appendChild( div_authors );

				if( doctype == "ART" )
				{
						var div_journal = document.createElement("div");
						div_journal.className = "journal";
						div_journal.innerHTML = "in " + "<i>"+ delete_double_quotes( JSON.stringify( data.response.docs[i].journalTitle_s ) ) + "</i>";
						if( JSON.stringify( data.response.docs[i].journalPublisher_s ) )
						{
								div_journal.innerHTML += ", " + "<i>"+delete_double_quotes( JSON.stringify( data.response.docs[i].journalPublisher_s ) ) + "</i>" ;
						}
						if( JSON.stringify( data.response.docs[i].volume_s ) )
						{
								div_journal.innerHTML += ", vol. " + delete_double_quotes( JSON.stringify( data.response.docs[i].volume_s ) );
						}
						if( JSON.stringify( data.response.docs[i].number_s ) )
						{
								div_journal.innerHTML += ", num. " + delete_double_quotes( JSON.stringify( data.response.docs[i].number_s ) );
						}
						if( JSON.stringify( data.response.docs[i].page_s ) )
						{
								div_journal.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].page_s ) );
						}
						div_box.appendChild( div_journal );
				}
				else if( doctype == "COMM" )
				{
						var div_journal = document.createElement("div");
						div_journal.className = "journal";
						div_journal.innerHTML = "in proceedings of the " + "<i>" + delete_double_quotes( JSON.stringify( data.response.docs[i].conferenceTitle_s ) )+ "</i>";
						if( JSON.stringify( data.response.docs[i].page_s ) )
						{
								div_journal.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].page_s ) );
						}
						div_box.appendChild( div_journal );
				}
				else if( doctype == "OUV" )
				{
						var div_journal = document.createElement("div");
						div_journal.className = "journal";
						div_journal.innerHTML = "" + delete_double_quotes( JSON.stringify( data.response.docs[i].bookTitle_s ) );
						if( JSON.stringify( data.response.docs[i].volume_s ) )
						{
								div_journal.innerHTML += ", vol. " + delete_double_quotes( JSON.stringify( data.response.docs[i].volume_s ) );
						}
						if( JSON.stringify( data.response.docs[i].number_s ) )
						{
								div_journal.innerHTML += ", num. " + delete_double_quotes( JSON.stringify( data.response.docs[i].number_s ) );
						}
						if( JSON.stringify( data.response.docs[i].page_s ) )
						{
								div_journal.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].page_s ) );
						}
						div_box.appendChild( div_journal );
				}
				else if( doctype == "COUV" )
				{
						var div_journal = document.createElement("div");
						div_journal.className = "journal";
						div_journal.innerHTML = "in " + delete_double_quotes( JSON.stringify( data.response.docs[i].bookTitle_s ) );
						if( JSON.stringify( data.response.docs[i].volume_s ) )
						{
								div_journal.innerHTML += ", vol. " + delete_double_quotes( JSON.stringify( data.response.docs[i].volume_s ) );
						}
						if( JSON.stringify( data.response.docs[i].number_s ) )
						{
								div_journal.innerHTML += ", num. " + delete_double_quotes( JSON.stringify( data.response.docs[i].number_s ) );
						}
						if( JSON.stringify( data.response.docs[i].page_s ) )
						{
								div_journal.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].page_s ) );
						}
						div_box.appendChild( div_journal );
				}
				else if( doctype == "REPORT" )
				{
						var div_journal = document.createElement("div");
						div_journal.className = "journal";
						div_journal.innerHTML = "";
						if( JSON.stringify( data.response.docs[i].volume_s ) )
						{
								div_journal.innerHTML += ", vol. " + delete_double_quotes( JSON.stringify( data.response.docs[i].volume_s ) );
						}
						if( JSON.stringify( data.response.docs[i].number_s ) )
						{
								div_journal.innerHTML += ", num. " + delete_double_quotes( JSON.stringify( data.response.docs[i].number_s ) );
						}
						if( JSON.stringify( data.response.docs[i].page_s ) )
						{
								div_journal.innerHTML += ", " + delete_double_quotes( JSON.stringify( data.response.docs[i].page_s ) );
						}
						div_box.appendChild( div_journal );
				}

				var div_date = document.createElement("div");
				div_date.className = "article-date";
				div_date.innerHTML = year;
				div_box.appendChild( div_date );

				var div_url = document.createElement("div");
				div_url.className = "reference";
				div_url.innerHTML = "<a href=" + delete_double_quotes( JSON.stringify( data.response.docs[i].uri_s ) ) + " target=_blank>"  + "PDF" + "</a>";
				div_box.appendChild( div_url );

				mainContainer.appendChild( div_box );
		}		
}


