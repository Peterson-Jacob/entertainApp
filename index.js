// window.onload = function(){
   
//     let showFetch = "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows";
//     Display(showFetch);
// }

function Shows(){
    $('.card').remove();
    let showFetch = "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows";
    Display(showFetch);
}

function Movies(){
    $('.card').remove();
    let movieFetch = "https://imdb8.p.rapidapi.com/title/get-top-rated-movies"
    Display(movieFetch);
}

function Upcoming(){
    $('.card').remove();
    let upcomingFetch = "https://imdb8.p.rapidapi.com/title/get-coming-soon-movies?homeCountry=US&purchaseCountry=US&currentCountry=US";
    Display(upcomingFetch); 
}


function Display(call){

    const cont = document.getElementById('cardContainer');
    const mImg = document.getElementById('imgId');
    const title = document.getElementById('mhOne');
    const cert = document.getElementById('certificate');
    const numShows = document.getElementById('numEpisodes');
    const rate = document.getElementById('mhTwo');
    const series = document.getElementById('mRun');
    const release = document.getElementById('mRelease');

    const headers = {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': ''
      };

fetch( call, {
	"method": "GET",
    headers
})
.then(response => response.json())
.then ( data =>{
    let text = "";
    let textTwo = "";
    let i = 0;
    let y = 0;
    const dataArray = [];
    const showArray = [];
    const newArray = [];
    dataArray.length = 0;
    showArray.length = 0;
    newArray.length = 0;

    while(data[i]){
        dataArray.push(data[i].id);
        i++;
    }

    while(dataArray[y]){
        showArray.push(dataArray[y].slice(7, -1));
        y++;  
    };

    for (let x = 0; x <= 50; x++) {
        if(x == 0){
        text += "ids=" + showArray[x];
        }else{
            text += "&ids=" + showArray[x];
        }
    };

    for (let x = 51; x <= 100; x++) {
        if(x == 51){
        textTwo += "ids=" + showArray[x];
        }else{
            textTwo += "&ids=" + showArray[x];
        }
    };


    function mainFunction(num){

                
                mImg.src = newArray[num].title.image.url;
                mImg.alt = newArray[num].title.title + " Poster";

                title.textContent = newArray[num].title.title;

                rate.textContent = "IMDb Rating: " + newArray[num].ratings.rating;
                cert.textContent = "Rated: " + newArray[num].certificate;

                if(newArray[num].title.numberOfEpisodes == undefined){
                    numShows.textContent = "";
                }else{
                numShows.textContent = newArray[num].title.numberOfEpisodes + " Episodes";
                }

                    if(newArray[num].title.seriesStartYear == undefined){
                        series.textContent == "";
                    }else{
                    if(newArray[num].title.seriesEndYear == undefined ){
                        series.textContent = "Start " + newArray[num].title.seriesStartYear + " - present";
                    }else{
                        series.textContent = "Start " + newArray[num].title.seriesStartYear + " - End " + newArray[num].title.seriesEndYear;
                    };
                };
                release.textContent = "Release Date: " + newArray[num].releaseDate;
    }
  
 

    function cardFunction(v){

        for(let s = v; s < newArray.length; s++){
            const div = document.createElement('div');
            const img = document.createElement('img');
            
                div.classList.add("card");
                div.appendChild(img);
                img.src = newArray[s].title.image.url;
                img.alt = newArray[s].title.title + " Poster";
                cont.appendChild(div);

            img.onclick = function(){

                    mainFunction(s);
                }
             
        }


            mainFunction(0);
    }

    
     fetch("https://imdb8.p.rapidapi.com/title/get-meta-data?" + text + "&region=US",{
	"method": "GET",
    headers
})

.then(newResponse => newResponse.json())
.then(newData =>{
    
    let z = 0;
    
    while (newData[showArray[z]]) {
        newArray.push(newData[showArray[z]]);
        z++;
    }

    cardFunction(0);

    fetch("https://imdb8.p.rapidapi.com/title/get-meta-data?" + textTwo + "&region=US", {
	"method": "GET",
    headers  
})

.then(newResponse => newResponse.json())
.then(newData =>{
    
    let z = 51;
    while (newData[showArray[z]]) {
        newArray.push(newData[showArray[z]]);
        z++;
    }
    
    cardFunction(50);

    

});
})
.catch(err => {
    console.error(err);
 }); 
 
}); 
};