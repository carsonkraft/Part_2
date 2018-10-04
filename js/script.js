var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

//credit: https://stackoverflow.com/questions/16779244/hide-show-advanced-option-using-javascript
function more(obj) {
    var content = document.getElementById("showMore");

    if (content.style.display == "none") {
        content.style.display = "";
        obj.innerHTML = "Advanced -";
    } else {
        content.style.display = "none";
        obj.innerHTML = "Advanced +";
    }
}

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

      console.log(out);

      var output1 = '';

      var name = '';
      var path = '';
      var description = '';
      var ext = '';

      var fillImg = "http://getdrawings.com/img/superhero-silhouette-images-30.png";

      if(out.data.results.length == 0){

        //no characters in given comic
        output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img class="noChar" src="'
        + fillImg + '"></div>';
      }
      else {
        name = out.data.results[0].name;
        path = out.data.results[0].thumbnail.path;
        description = out.data.results[0].description;
        ext = out.data.results[0].thumbnail.extension;

        if(path == '' && description == ""){
          output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img class="noChar" src="' + fillImg + '"><h3>' + name
            + '</h3></div>';
        }
        else if(path == ''){
        output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><div class="row"><div class="col-4"><img src="' + fillImg + '"><h3>' + name
          + '</div><div class="col-8"></h3><p>'+ description + '</p></div></div></div>';
        }
        else if(description == ""){
          output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><img class="noChar" src="' +
          path + '/portrait_medium.' + ext + '"><h3>' + name
            + '</h3></div>';
        }
        else{

          output1 += '<div class="col-sm"><h2>'+ comicTitle +'</h2><div class="row"><div class="col-4"><img src="' +
          path + '/portrait_medium.' + ext + '"></div><div class="col-8"><h3>'+ name + '</h3><p>' + description + '</p></div></div></div>';
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

// date dropdown credit: https://stackoverflow.com/questions/19731767/to-generate-years-automatically-in-javascript-dropdown
   var max = new Date().getFullYear(),
   min = 1939;
   var select = document.getElementById("query_year");

   var opt = document.createElement('option');
   opt.value = '';
   opt.innerHTML = 'Any Year';
   select.appendChild(opt);

   for (var i = max; i>=min; i--){
      opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      select.appendChild(opt);
   }

   var url = new URL(window.location.href);

   var year1 = url.searchParams.get('query_year'); // "lorem"
   var title1 = url.searchParams.get('query_title'); // "" (present with empty value)
   var format1 = url.searchParams.get('query_format'); // "" (present with no value)
   var sort1 = url.searchParams.get('query_sort');
   var offset1 = url.searchParams.get('query_offset');

  if(year1){
   document.getElementById("query_year").value = year1;
   more(this);
  }
  if(title1){
   document.getElementById("query_title").value = title1;
  }
  if(format1){
   document.getElementById("query_format").value = format1;
   more(this);
  }
  if(sort1){
   document.getElementById("query_sort").value = sort1;
   more(this);
  }


   if(location.search != '/' && location.search != ''){
     findComics(year1, title1, format1, sort1, offset1);
   }

  document.getElementById('searchMarvel').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
        var year = document.getElementById('query_year').value;
        var title = document.getElementById('query_title').value;
        var format = document.getElementById('query_format').value;
        var sort = document.getElementById('query_sort').value;

      var searchParams = new URLSearchParams(window.location.search);
      if(year){

        searchParams.set('query_year', year);
      }

      if(title){

        searchParams.set('query_year', title);
      }

      if(format){

        searchParams.set('query_year', format);
      }

      if(sort){

        searchParams.set('query_year', sort);
      }

      searchParams.set('query_offset', 0);

        window.location.assign('?' + searchParams.toString());

}, false);
});
