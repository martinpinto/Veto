// DOM Ready =============================================================
var tableContent;
// Functions =============================================================

// Fill table with data
// jQuery AJAX call for JSON
$(document).ready(function () {
  $("#test-fn").click(function () {
    $.getJSON("http://localhost:3000/api/v1/quotes?callback=?", {
      jsonp: "jsonp"
    }, function (data) {

      if (data != null && data.length != 0) {
        $.each(data, function(){
          tableContent += '<tr>';
          tableContent += '<td><a href="#" class="quote-show" rel="' + this._source.data.message + '">' + this._source.data.message + '</a></td>';
          tableContent += '<td>' + this._source.data.topic + '</td>';
          tableContent += '<td>' + this._source.data.hashtags + '</td>';
          tableContent += '<td><a href="#" class="quote-delete" rel="' + this._id + '">delete</a></td>';
          tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#quotesList').html(tableContent);
      }

    }).error(function (data) {
      alert("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
      console.log("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
    });
  });
});
