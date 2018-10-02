var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

//findCharacter returns character card html
function findCharacter(charactersURI, is3) {


  var ts1 = new Date().getTime();
  var hash1 = CryptoJS.MD5(ts1 + PRIV + PUBLIC).toString();

  var order = "focDate";

  var obj1 = {
  "ts": ts1,
  "hash": hash1,
  "apikey": PUBLIC,
  }

  var url1 = charactersURI;

  $.getJSON(url1, obj1)
    .done(function(out) {

      var output1 = '';

    //first one
    if(is3 < 3){

      if(out.data.results.length == 0){
        //no characters in given comic
        $('#1').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>No characters found</div>');
      }
      else if (path == '') {
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

        $('#1').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>' + character
          + '<br>'+ description + '</div>');

      }
      else{
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

              $('#1').append('<div class="col-sm"><img src="' +
                path + '/portrait_medium.' + ext + '"><br>'+ name + '<br>' + description + '</div>');
      }
    }
    else if(is3 > 2 && is3 < 6){

      if(out.data.results.length == 0){
        //no characters in given comic
        $('#2').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>No characters found</div>');
      }
      else if (path == '') {
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

        $('#2').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>' + character
          + '<br>'+ description + '</div>');

      }
      else{
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

              $('#2').append('<div class="col-sm"><img src="' +
                path + '/portrait_medium.' + ext + '"><br>'+ name + '<br>' + description + '</div>');
      }
    }
    else if(is3 > 5 && is3 < 9){

      if(out.data.results.length == 0){
        //no characters in given comic
        $('#3').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>No characters found</div>');
      }
      else if (path == '') {
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

        $('#3').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>' + character
          + '<br>'+ description + '</div>');

      }
      else{
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

              $('#3').append('<div class="col-sm"><img src="' +
                path + '/portrait_medium.' + ext + '"><br>'+ name + '<br>' + description + '</div>');
      }
    }
    else if(is3 == 9){

      if(out.data.results.length == 0){
        //no characters in given comic
        $('#4').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>No characters found</div>');
      }
      else if (path == '') {
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

        $('#4').append('<div class="col-sm"><img height:200px style="box-sizing:border-box;height:200px;"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><br>' + character
          + '<br>'+ description + '</div>');

      }
      else{
        var character = out.data.results[0].name;
        var path = out.data.results[0].thumbnail.path;
        var description = out.data.results[0].description;
        var ext = out.data.results[0].thumbnail.extension;

              $('#4').append('<div class="col-sm"><img src="' +
                path + '/portrait_medium.' + ext + '"><br>'+ name + '<br>' + description + '</div>');
      }
    }


    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });

}

// skeleton code credit: https://gist.github.com/SiddharthaSarma/eb3f6fb19717fcf84199eda81243bafc
function findComics(query_year, query_title, query_format, query_sort, query_offset) {

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
  "offset": query_offset
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

      if(response.data.count == 0){

        $('#search-container').append('<p> No results found for your query. Please try again! </p>');
      }
      else{



        for(i = 0; i < results.length; i++){

            if(i == 0){

              findCharacter(results[i].characters.collectionURI, i);
            }
            else if(i % 3 == 0){

              findCharacter(results[i].characters.collectionURI, i);
            }
            else{
              findCharacter(results[i].characters.collectionURI, i);
            }

       }
      }

      var pagination = '</div>'
      if(response.data.count > 10){
        console.log(response.data.count);
        pagination += '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">';

        for(i = 0; i < ((response.data.count / 10)); i++){

          var searchParams = new URLSearchParams(window.location.search);
          if(i > 0){
            var offNum = (i*10) - 1;
          }
          else {
            offNum = 0;
          }

          searchParams.set("query_offset", offNum);
          var link = searchParams.toString();

          console.log(link);

          pagination += '<li class="page-item"><a class="page-link" href="?'+ link +'">' + (i + 1) + '</a></li>';

        }
        pagination += '</ul></nav>';

      }
      $('#search-results').append(pagination);

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

   var year1 = url.searchParams.get('query_year'); // "lorem"
   var title1 = url.searchParams.get('query_title'); // "" (present with empty value)
   var format1 = url.searchParams.get('query_format'); // "" (present with no value)
   var sort1 = url.searchParams.get('query_sort');
   var offset1 = url.searchParams.get('query_offset');

   if(location.search != '/' && location.search != ''){
     findComics(year1, title1, format1, sort1, offset1);
   }

  document.getElementById('searchMarvel').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
        var year = '&query_year=' + document.getElementById('query_year').value;
        var title = '&query_title=' + document.getElementById('query_title').value;
        var format = '&query_format=' + document.getElementById('query_format').value;
        var sort = '&query_sort=' + document.getElementById('query_sort').value;

        var off = '&query_offset=0';

        var queryArr = [year, title, format, sort, off];

        for(i=0; i< queryArr.length; i++){

          if(queryArr[i].charAt(queryArr[i].length - 1) == '='){
            queryArr[i] = '';
          }
        }


      var queryString = '/?q=marvel';

      for(i=0; i< queryArr.length; i++){
        queryString += queryArr[i];
      }

        //append URL with queries
        window.location.assign(queryString);

}, false);
});
