// Output Current Year
$('.currentYear').text( (new Date).getFullYear() );


/**********************************
  CONFIGURE JSON CALL
**********************************/ 
// The API feed
//const url = 'https://gist.githubusercontent.com/jcampbell18/8b4cab8b820e61a7acc86e112af0e12c/raw/aa024380fbef9706b188a02589cecb13ebd0ff11/movies-v2.json';
//const url = 'https://gist.githubusercontent.com/jcampbell18/c8d7476b3367ee739ecb7b7757cc135b/raw/9a66726b778fbc84b5d2cd88bef3dd303f063170/movies.json';
const url = 'https://gist.githubusercontent.com/jcampbell18/0e1da3a85ff8698092a90357d39c0102/raw/000503a6cc57896feb008c47b20a9d8e3cfa77db/combined-movies.json';


// Do stuff with returned data
let doStuff = function(data) {
 
  let q = document.getElementById('search').value;
  document.getElementById('search').value = '';
  
  var res = $(data.Search).filter(function (i, n){
    return n.Title.includes(q) || n.Title.includes(q.toLowerCase()) || n.Title.includes(q.toUpperCase()) || n.Title.includes(toCapitalize(q)) || n.imdbID == q;
  });

  const max = res.length;
 
  for ( let ix = 0; ix < max; ix++ ) {
    
    let title = res[ix].Title;
    let year = res[ix].Year;
    let imdbLink = res[ix].imdbID;
    let img = res[ix].Poster;
  
    const template = `
        <section>  
            <div class="movie-info">
                <p class="title">${ title }</p>
                <p class="year">${ year }</p>
                <p class="imdb">
                    <a href="http://imdb.com/title/${ imdbLink }" target="_blank">IMDB</a>
                </p>
            </div>
            <img src="${ img }" alt="Poster of ${ title }" title="Poster of ${ title }"/>
        </section>
    `;  

    $('main').append( template ); 

  } 
  
};

// Search button
$('#submit').click(function(event){

    $('main').empty();
    event.preventDefault(); // cancel default behavior
    $.getJSON( url, doStuff);

});

// Capitalize word(s) of search term
const toCapitalize = (str)  => {
    
  if (str.split(" ").length - 1 == 0) {

      return str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase(); 

  } else {

      let arr = str.split(" ");
      let newStr = "";

      for (let ix = 0; ix < arr.length; ix++) {

          arr[ix] = arr[ix].substring(0,1).toUpperCase() + arr[ix].substring(1).toLowerCase();

          newStr = newStr + arr[ix];

          if (ix < arr.length - 1) {

              newStr = newStr + " ";

          }

      }

      return newStr;

  }

}
