window.onload = function(){

    const cont = document.getElementById('cardContainer');
    const mImg = document.getElementById('imgId');
    const title = document.getElementById('mhOne');
    const rate = document.getElementById('mhTwo');
    const series = document.getElementById('mRun');
    const release = document.getElementById('mRelease');

    const headers = {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': ''
      };

fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows", {
	"method": "GET",
    headers
})
.then(response => response.json())
.then ( data =>{
    let text = "";
    let i = 0;
    let y = 0;
    const dataArray = [];
    const showArray = [];
    const newArray = [];
    
  
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


    function mainFunction(num){

                
                mImg.src = newArray[num].title.image.url;
                mImg.alt = newArray[num].title.title + " Poster";

                title.textContent = newArray[num].title.title;

                rate.textContent = "IMDb Rating: " + newArray[num].ratings.rating;
                    if(newArray[num].title.seriesEndYear == undefined ){
                        series.textContent = "Start " + newArray[num].title.seriesStartYear + " - present";
                    }else{
                        series.textContent = "Start " + newArray[num].title.seriesStartYear + " - End " + newArray[num].title.seriesEndYear;
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

});
})
.catch(err => {
    console.error(err);
 }); 
 
}