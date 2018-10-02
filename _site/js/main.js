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
      $('#search-container').append(output + '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center"><li class="page-item disabled">'
      + '<a class="page-link" href="#" tabindex="-1">Previous</a></li><li class="page-item"><a class="page-link" href="#">1</a></li>'
    + '<li class="page-item"><a class="page-link" href="#">2</a></li><li class="page-item"><a class="page-link" href="#">3</a></li>'
    + '<li class="page-item"><a class="page-link" href="#">Next</a></li></ul></nav>');

    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
  };

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


 $(document).ready(function() {

   var url = new URL(window.location.href);
   console.log(location.search);

   var year1 = url.searchParams.get('query_year'); // "lorem"
   var title1 = url.searchParams.get('query_title'); // "" (present with empty value)
   var format1 = url.searchParams.get('query_format'); // "" (present with no value)
   var sort1 = url.searchParams.get('query_sort');

   if(location.search != '/' && location.search != ''){
     findComics(year1, title1, format1, sort1);
   }

  document.getElementById('searchMarvel').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
        var year = '&query_year=' + document.getElementById('query_year').value;
        var title = '&query_title=' + document.getElementById('query_title').value;
        var format = '&query_format=' + document.getElementById('query_format').value;
        var sort = '&query_sort=' + document.getElementById('query_sort').value;

        var queryArr = [year, title, format, sort];

        console.log(queryArr);
        for(i=0; i< queryArr.length; i++){

          if(queryArr[i].charAt(queryArr[i].length - 1) == '='){
            queryArr[i] = '';
          }
        }

        console.log(queryArr);

      var queryString = '/?q=marvel';

      for(i=0; i< queryArr.length; i++){
        queryString += queryArr[i];
      }

        //append URL with queries
        window.location.assign(queryString);

}, false);
});
