// Output Current Year
$('.currentYear').text( (new Date).getFullYear() );


/**********************************
  CONFIGURE JSON CALL
**********************************/ 
// The API feed
const url = 'https://gist.githubusercontent.com/jcampbell18/8b4cab8b820e61a7acc86e112af0e12c/raw/aa024380fbef9706b188a02589cecb13ebd0ff11/movies-v2.json';

// Do stuff with returned data
let doStuff = function(data) {
 
  let q = document.getElementById('search').value;
  document.getElementById('search').value = '';
  
  var res = $(data.Search).filter(function (i, n){
     return n.Title.includes(q) || n.imdbID == q;
  });

  const max = res.length;
 
  for ( let ix = 0; ix < max; ix++ ) {
    
    let title = res[ix].Title;
    let year = res[ix].Year;
    let imdbLink = res[ix].imdbID;
    let img = res[ix].Poster;
  
    const template = `
      <section>  
        <img src="${ img }" alt="Poster of ${ title }" title="Poster of ${ title }"/>
        <div class="movie-info">
            <p class="title">${ title }</p>
            <p class="year">${ year }</p>
            <p class="imdb">
                <a href="http://imdb.com/title/${ imdbLink }" target="_blank">IMDB</a>
            </p>
        </div>
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