const SearchSongs = () => {

    const SearchInput =document.getElementById("search-input").value;

    fetch(`https://api.lyrics.ovh/suggest/${SearchInput}`)

    .then(response => response.json())
    .then( data  => displaySong(data.data))
    .catch(err => displayError("Something went wrong Plese try again !"))
}
 
const displaySong= (songs) => {
   document.getElementById("container-songs").innerHTML='';
    const containerSong =document.getElementById("container-songs");
   
    songs.forEach(song => {
      
        const newDiv =document.createElement("div");
              newDiv.className="single-result row align-items-center my-3 p-3";
           
      
       
    newDiv.innerHTML=`
        
    <div class="col-md-9">
    <h3 class="lyrics-name">${song.album.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
    <audio controls>
             <source src="${song.preview}" type="audio/ogg">
    </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.artist.name}','${song.album.title}')"; class="btn btn-success">Get Lyrics</button>
    </div>
        `;
        containerSong.appendChild(newDiv);
      
   });
}

const getLyrics= async(artist,title) => {


    try{
        const res =await   fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

        const data =await res.json();
         getLyricsDisplay(data.lyrics)
    }
    catch(err){

        getLyricsDisplay("Sorry ! I failed to load lyrics")
    }
 
    
}


const getLyricsDisplay = (lyrics) =>{
   const lyricsDiv=document.getElementById("single-Larics");
    lyricsDiv.innerHTML=lyrics;
       


}

const displayError = err =>{

    const errorTag =document.getElementById("error-messege");
    errorTag.innerHTML= err;
}