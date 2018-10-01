var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

// skeleton code credit: https://gist.github.com/SiddharthaSarma/eb3f6fb19717fcf84199eda81243bafc
function findComics(query_year, query_title, query_format, query_sort) {

  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV + PUBLIC).toString();

  var order = "focDate";

  var obj = {
  "ts": ts,
  "hash": hash,
  "orderBy": query_sort,
  "apikey": PUBLIC,
  "titleStartsWith": query_title,
  "startYear": query_year,
  "format": query_format,
  }
  console.log(obj);

  // getting rid of empty values
  for(x in obj){
    if (obj[x] === "" || obj[x] === null){
          delete obj[x];
      }
  }

  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  $.getJSON(url, obj)
    .done(function(response) {
      var results = response.data.results;

      var output = '<div class="container">';

      if(response.count > 0){
        output = '<p> No results found for your query. Please try again! </p>';
      }
      else{

        for(i = 0; i < results.length; i++){

          if(results[i].images.length > 0){
            if(i == 0){
              output = output + '<div class="row"> <div class="col-sm"><img src="' +
                results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                  + '"><br>'+ results[i].title + '</div>';
            }
            else if(i % 3 == 0){
            output = output + '</div><div class="row"> <div class="col-sm"><img src="' +
              results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                + '"><br>'+ results[i].title + '</div>';
            }
            else {
              output = output + '<div class="col-sm"><img src="' +
                results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension
                  + '"><br>'+ results[i].title + '</div>';
            }
         }
         if(results[i].images.length == 0){
           if(i == 0){
             output = output + '<div class="row"> <div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
             'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>'
             + results[i].title + '</div>';
           }
           else if(i % 3 == 0){
             output = output + '</div><div class="row"> <div class="col-sm"><img style="box-sizing:border-box;height:200px;"'+
             'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>'
             + results[i].title + '</div>';
           }
           else{
             output = output + '<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
             'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>'
             + results[i].title + '</div>';
           }
        }
       }
      }
      output += "</div>"

      //location.reload(true);
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
        findComics(document.getElementById('query_year').value,
        document.getElementById('query_title').value, document.getElementById('query_format').value,
        document.getElementById('query_sort').value);
}, false);
});
