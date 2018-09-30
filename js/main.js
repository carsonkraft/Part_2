var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

// skeleton code credit: https://gist.github.com/SiddharthaSarma/eb3f6fb19717fcf84199eda81243bafc
function getMarvelResponse(query_title, query_year, query_format) {

  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV + PUBLIC).toString();

  var characterId = '1009718';


  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  $.getJSON(url, {
    ts: ts,
    hash: hash,
    apikey: PUBLIC,
    titleStartsWith: query_title,
    startYear: query_year,
    format: query_format
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      console.log(data);
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
};

getMarvelResponse('The', 1992, 'comic');
