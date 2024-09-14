$(document).ready(function() {

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://restcountries.com/v3.1/all');
ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);


$("#search-bar").on("click",function(){
  var value = $("#t").val().toLowerCase();
  var countryCards = $(".country-box");

  $.each(countryCards, function(index , card){
    if(card.id.includes(value)){
      card.style.display = "";
    }
    else {
      card.style.display = "none";
    }
  })
});


function display(){
    for (var i = 0; i < ourData.length;i++) { 

                //show map button
                let button1 = document.createElement("button");
                button1.className = "map border border-4 rounded fw-semibold bg-white col text-primary  border-primary";
                button1.innerHTML = "Show Map";
        
                //map
                let map= document.createElement("a");
                map.href= ourData[i].maps.googleMaps;
                map.append(button1);


              //for details
                let button2 = document.createElement("button");
                button2.id = ourData[i].cca3;
                button2.className = "details border border-4 fw-semibold col bg-white text-primary rounded border-primary";
                button2.innerHTML = "Details";

              //for buttons both buttons
              let buttons = document.createElement("div")
              buttons.className = "d-flex justify-content-around position-absolute bottom-0 mb-1 container gap-4 text-center bttn";
              buttons.append(map);
              buttons.append(button2);

              //for currency

              let currency = document.createElement('div');
              const currencyName = ourData[i].currencies?Object.values(ourData[i].currencies)[0].name:null;
              currency.className = "currency fs-4";
              currency.innerHTML = "Currency: " + currencyName;

              //for time


              let date_time = document.createElement('div');
              date_time.className = "date-time currency fs-4";
              // date_time.innerHTML = "Date: " + Date.now();

              //for text
              let countrytext = document.createElement('div');
              countrytext.className = "text position-relative fs-2";
              countrytext.innerHTML = "<b>" + ourData[i].name.common + "</b>";
              countrytext.append(currency);
              countrytext.append(date_time);
              countrytext.append(buttons);
        
               //for country image
               let countryimage = document.createElement('img');
               countryimage.className = "image image-fluid pr-1";
               countryimage.src = ourData[i].flags.png;
               countryimage.alt = ourData[i].flags.alt;
       

              let name = document.createElement('div');
              name.className = " new shadow-lg p-3 mb-3 bg-body-tertiary rounded d-flex"
              name.append(countryimage);
              name.append(countrytext);

               let country = document.createElement('div');
               country.className = "country-box";
               var tid = ourData[i].name.common;
               country.id = tid.toLowerCase();
              country.append(name);
               

               $(".main").append(country);     

     }  

   }
  display();

 $(".details").click(function(){
    //new page
         window.location.href = "details.html?country="+ this.id;
}); 



};
ourRequest.send();



});










