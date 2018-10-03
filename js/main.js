var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

//findCharacter returns character card html
function findCharacter(charactersURI, is3, comicTitle) {


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

      var name = '';
      var path = '';
      var desciption = '';
      var ext = '';


      if(out.data.results.length == 0){

        //no characters in given comic
        output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><h3>No characters found</h3></div>';
      }
      else  {
        name = out.data.results[0].name;
        path = out.data.results[0].thumbnail.path;
        description = out.data.results[0].description;
        ext = out.data.results[0].thumbnail.extension;

        if(path == ''){
        output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img"'+
        'src="http://getdrawings.com/img/superhero-silhouette-images-30.png"><h3>' + name
          + '</h3>'+ description + '</div>';
        }
        else{

          output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img src="' +
          path + '/portrait_medium.' + ext + '"><h3>'+ name + '</h3>' + description + '</div>';
        }
      }

      if(is3 < 3){

        $('#1').append(output1);

      }
      else if(is3 > 2 && is3 < 6){

        $('#2').append(output1);

      }
      else if(is3 > 5 && is3 < 9){

        $('#3').append(output1);
      }
      else if(is3 == 9){

        $('#4').append(output1);
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

      console.log(response);
      var results = response.data.results;
      var output = '<div class="container">';

      if(response.data.count == 0){

        $('#search-container').append('<p> No results found. Please, edit your query and try again! </p>');
      }
      else{

        $('#search-results').prepend('<p id="resultCount">' + response.data.total + ' Results </p>');

        for(i = 0; i < results.length; i++){

            if(i == 0){

              findCharacter(results[i].characters.collectionURI, i, results[i].title);
            }
            else if(i % 3 == 0){

              findCharacter(results[i].characters.collectionURI, i, results[i].title);
            }
            else{
              findCharacter(results[i].characters.collectionURI, i, results[i].title);
            }

       }
      }

      var pagination = '</div>'
      if(response.data.total > 10){
        //console.log(response.data.count);
        pagination += '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">';
          var searchParams = new URLSearchParams(window.location.search);
          offNum = searchParams.get("query_offset")

          if (parseInt(offNum) < 9 && response.data.total > 10) {
            searchParams.set("query_offset", 9);
            var link = searchParams.toString();
            pagination += '<li class="page-item"><a class="page-link" href="?'+ link +'">Next</a></li>';

          }
          if (parseInt(offNum) > 8 && (response.data.total - (parseInt(offNum) + 1)) > 10) {
            if(offNum == 9){
              searchParams.set("query_offset", 0);
            }
            else {
              searchParams.set("query_offset", parseInt(offNum) - 10);
            }

            var link = searchParams.toString();
            pagination += '<li class="page-item"><a class="page-link" href="?'+ link +'">Previous</a></li>';

            searchParams.set("query_offset", parseInt(offNum) + 10);
            var link = searchParams.toString();
            pagination += '<li class="page-item"><a class="page-link" href="?'+ link +'">Next</a></li>';

          }
          if (parseInt(offNum) > 8 && (response.data.total - (parseInt(offNum) + 1)) < 10) {
            if(parseInt(offNum) == 9){
              searchParams.set("query_offset", 0);
            }
            else {
              searchParams.set("query_offset", parseInt(offNum) - 10);
            }

            var link = searchParams.toString();
            pagination += '<li class="page-item"><a class="page-link" href="?'+ link +'">Previous</a></li>';

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
