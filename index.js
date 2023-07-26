window.onload = function(){

    const cont = document.getElementById('cardContainer');
    const mImg = document.getElementById('mainImg');
    const mInfo = document.getElementById('mainInfo');
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
    console.log(data);
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

    function myFunction(v){
        console.log(newArray[0]);
        for(let s = v; s < newArray.length; s++){
            const div = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h1');
            const rate = document.createElement('h2');
            const series = document.createElement('p');
            const release = document.createElement('p');
    
                div.classList.add("card");
                div.appendChild(img);
                img.src = newArray[s].title.image.url;
                img.alt = newArray[s].title.title + " Poster";
                div.appendChild(title);
                title.textContent = newArray[s].title.title;
                div.appendChild(rate);
                rate.textContent = "IMDb Rating: " + newArray[s].ratings.rating;
                div.appendChild(series);
                    if(newArray[s].title.seriesEndYear == undefined ){
                        series.textContent = "Start " + newArray[s].title.seriesStartYear + " - present";
                    }else{
                        series.textContent = "Start " + newArray[s].title.seriesStartYear + " - End " + newArray[s].title.seriesEndYear;
                    };
                div.appendChild(release);
                release.textContent = "Release Date: " + newArray[s].releaseDate;
                cont.appendChild(div);
        }

        const img = document.createElement('img');
        const title = document.createElement('h1');
        const rate = document.createElement('h2');
        const series = document.createElement('p');
        const release = document.createElement('p');

                mImg.appendChild(img);
                img.src = newArray[0].title.image.url;
                img.alt = newArray[0].title.title + " Poster";


                mInfo.appendChild(title);
                title.textContent = newArray[0].title.title;
                mInfo.appendChild(rate);
                rate.textContent = "IMDb Rating: " + newArray[0].ratings.rating;
                mInfo.appendChild(series);
                    if(newArray[0].title.seriesEndYear == undefined ){
                        series.textContent = "Start " + newArray[0].title.seriesStartYear + " - present";
                    }else{
                        series.textContent = "Start " + newArray[0].title.seriesStartYear + " - End " + newArray[0].title.seriesEndYear;
                    };
                mInfo.appendChild(release);
                release.textContent = "Release Date: " + newArray[0].releaseDate;
        
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

    myFunction(0);

});
})
.catch(err => {
    console.error(err);
 }); 


 
        function loopNext(){
            $('#cardContainer').stop().animate({scrollLeft:'+=75'}, 'fast', 'linear', loopNext);
        }

        function loopPrev(){
            $('#cardContainer').stop().animate({scrollLeft:'-=75'}, 'fast', 'linear', loopPrev);
        }

        function stop(){
            $('#cardContainer').stop();
        }


        $('#next').hover(function () {
        loopNext();
        },function () {
        stop();
        });

        $('#prev').hover(function () {
        loopPrev();
        },function () {
        stop();
        });
}