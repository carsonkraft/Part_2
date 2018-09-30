var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

// skeleton code credit: https://gist.github.com/SiddharthaSarma/eb3f6fb19717fcf84199eda81243bafc
function findComics(query_year, query_title, query_format) {

  console.log(query_title);
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV + PUBLIC).toString();

  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  $.getJSON(url, {
    ts: ts,
    hash: hash,
    apikey: PUBLIC,
    titleStartsWith: query_title,
    startYear: query_year,
    format: query_format
    })
    .done(function(response) {
      var results = response.data.results;
      var output = '<div class="container">';

      if(!results){
        output = '<p> No results found for your query. Please try again! </p>'
      }
      else{

        for(var i=0; i < results.length && i <= 10; i++){
          if(results[i].images.length > 0){
            if(i==0){
              output = output + '<div class="row"> <div class="col-sm"><img src="' +
                results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                  + '"><br>'+ results[i].title + '</div>';
            }
            else if(i % 3 == 0){
            output = output + '</div><div class="row"> <div class="col-sm"><img src="' +
              results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                + '"><br>'+ results[i].title + '</div>';
            }
            else{
              output = output + '<div class="col-sm"><img src="' +
                results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                  + '"><br>'+ results[i].title + '</div>';
            }
         }
       }
      }
      output += "</div>"

      $('#search-container').append(output);

    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err.status);
      console.log(err);
    });
  };


 $(document).ready(function() {
  document.getElementById('searchMarvel').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
        findComics(document.getElementById('query_year').value, document.getElementById('query_title').value, document.getElementById('query_format').value);
}, false);
});
