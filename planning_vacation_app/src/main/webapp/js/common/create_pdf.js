
var createPdf = function(json){
	
	pdfjs.load('fonts/OpenSans-Regular.ttf', function(err, buf) {
	    if (err) throw err
	    
	    var openSans = new pdfjs.TTFFont(buf);
	    
	    pdfjs.load('img/telegroup-logo-inside.jpg', function(err, buf) {
	        if (err) throw err

	        var logo = pdfjs.createImage(buf);
	        
	        var doc = new pdfjs.Document({font:openSans,paddingTop: 20});
		    doc.image(logo, { align: 'left',width:100 });
		    
		    if(typeof json.beforeTable !== 'undefined'){
	    		json.beforeTable.forEach(function(t) {
	    			
	    	    	doc.text(t.text, t.props)
	      		
	    		});
		    }
		    
		    doc.text().br();
	    	
	    	table = doc.table({
	    		  headerRows: 1, fontSize: 10,
	    		  borderHorizontalWidth: 0.05,
	    		  widths: json.widths
	    		});

	    		tr = table.tr({ borderBottomWidth: 1.0, backgroundColor: 0xeeeeee,paddingLeft: 5, paddingTop: 5,paddingBottom:5,paddingRight: 5});
	    		
	    		json.columnNames.forEach(function(column) {
	    			if(typeof column.props !== 'undefined') tr.td(column.name,column.props);
	    			else tr.td(column.name);
	      		});

	    		json.data.forEach(function(row) {
	    		  tr = table.tr({paddingLeft: 5,paddingTop: 3,paddingBottom:3,paddingRight: 5,borderColor: 0xdddddd});
		      		json.columnNames.forEach(function(column) {		
		    			if(typeof column.props !== 'undefined') tr.td(row[column.value],column.props);
		    			else tr.td(row[column.value]);
		        	});
	    		});
	    		
	    		var footer = doc.footer()
	    		footer.text({ textAlign: 'right' }).pageNumber().append('/').pageCount()
	    		
	    		var pdf = doc.render();
	    		

	    		var element = document.createElement('a');
	    		element.setAttribute('href', pdf.toDataURL());
	    		element.setAttribute('download', json.filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()+".pdf");

	    		element.style.display = 'none';
	    		document.body.appendChild(element);

	    		element.click();

	    		document.body.removeChild(element);

	    });
	});
}