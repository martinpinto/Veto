// DOM Ready =============================================================

// Functions =============================================================

// Fill table with data
$(document).ready(function () {
  $("button").click(function () {
    $.getJSON("http://localhost:3000/api/v1/quotes?callback=?", {
      jsonp: "jsonp"
    }, function (data) {
      var items = [];

      $.each(data, function (key, val) {
        //iterate through the returned data and build a list
        console.log("Key: " + key);
        console.log("Value: " + val);
        items.push(key);
      });

    }).error(function (data) {
      alert("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
      console.log("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
    });
  });
});
// jQuery AJAX call for JSON
//    $.ajax('/api/v1/quotes', function( data ) { // TODO: automate api call version
//        alert(data);
//
//        // For each item in our JSON, add a table row and cells to the content string
//        $.each(data, function(){
//            tableContent += '<tr>';
//            tableContent += '<td><a href="#" class="quote-show" rel="' + this.message + '">' + this.message + '</a></td>';
//            tableContent += '<td>' + this.topic + '</td>';
//            tableContent += '<td>' + this.hashtags + '</td>';
//            tableContent += '<td>' + this.source + '</td>';
//            tableContent += '<td><a href="#" class="quote-delete" rel="' + this._id + '">delete</a></td>';
//            tableContent += '</tr>';
//        });
//
//        // Inject the whole content string into our existing HTML table
//        $('#userList table tbody').html(tableContent);
//    });
//};