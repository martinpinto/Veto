// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the quotes table on initial page load
    populateQuotesTable();

});

// Functions =============================================================

// Fill table with data
function populateQuotesTable() {

    // Empty content string
    var tableContent = '';
  
  var data = {
      size: 5 // get 5 results
      q: 'type:quote' // query on the title field for 'jones'
    };
    $.ajax({
      url: '/api/v1/quotes',
      dataType: 'jsonp',
      success: function(data) {
        alert('Total results found: ' + data.hits.total)
      }
    });
  alert(data);
  // jQuery AJAX call for JSON
    $.ajax('/api/v1/quotes', function( data ) { // TODO: automate api call version
        alert(data);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="quote-show" rel="' + this.message + '">' + this.message + '</a></td>';
            tableContent += '<td>' + this.subject + '</td>';
            tableContent += '<td>' + this.hashtags + '</td>';
            tableContent += '<td>' + this.source + '</td>';
            tableContent += '<td><a href="#" class="quote-delete" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};