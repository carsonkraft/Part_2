var PUBLIC = config.PUBLIC_KEY;
var PRIV = config.PRIV_KEY;

function getMarvelResponse() {

  // you need a new ts every request
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV + PUBLIC).toString();

  // the api deals a lot in ids rather than just the strings you want to use
  var characterId = '1009718'; // wolverine


  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    hash: hash,
    apikey: PUBLIC,
    characters: characterId
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

getMarvelResponse();
