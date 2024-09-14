$(document).ready(function(){


    const urlParms = new URLSearchParams(window.location.search);
    const cntryid = urlParms.get("country");
    console.log(cntryid);


    var ourData1 = new XMLHttpRequest();
    ourData1.open('GET', 'https://restcountries.com/v3.1/alpha/'+ cntryid)
    ourData1.onload = function(){
        var country2 = JSON.parse(ourData1.responseText );

        console.log(country2);
    
    //for content
    var detail_text = document.createElement("div");
    const currencyName1 = country2[0].currencies?Object.values(country2[0].currencies)[0].name:null;
    detail_text.className = "country-text";
    detail_text.innerHTML += ('<p class="m-0 "><b>Native Name :</b>'+country2[0].name.common +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Capital :    </b>'+country2[0].capital +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Population : </b>'+country2[0].population +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Region :      </b> '+ country2[0].region+'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Sub-Region :  </b> '+country2[0].subregion +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Area :        </b>  '+country2[0].area +' KM<sup>2</sup></p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Country Code :</b>'+country2[0].idd.root + country2[0].idd.suffixes +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Languages :</b>');
        $.each(country2[0].languages,function(index,value)
        {
            detail_text.innerHTML += value;
        })
        detail_text.innerHTML += ('</p>');

    


    detail_text.innerHTML += ('<p class="m-0 "><b>Currencies :</b>'+currencyName1 +'</p>');
    detail_text.innerHTML += ('<p class="m-0 "><b>Time Zone :</b>'+country2[0].timezones +'</p>');

    //for image
    var image = document.createElement('img');
    image.src= country2[0].flags.png;
    image.alt= country2[0].flags.alt;
    
    var flag = document.createElement("div");
    flag.className="flags image-fluid";
    flag.append(image);

    var country_box = document.createElement("div");
    country_box.className="country-body mt-2 d-flex";
    country_box.append(image);
    country_box.append(detail_text);
    
    var neighbours = document.createElement("div");
    neighbours.className="neighbours box grid";
    neighbours.innerHTML += ('<h2 class="m-3">Neighbouring Countries</h2>');

   $.each(country2[0].borders, function(index,value){
   var border= new XMLHttpRequest();
   border.open('GET',  'https://restcountries.com/v3.1/alpha/'+ value);
   
   border.onload = function(){
   var data = JSON.parse(border.responseText);
   var n_countries = document.createElement('img');
   n_countries.src = data[0].flags.png;
   n_countries.alt = data[0].flags.alt;
   neighbours.append(n_countries);
}
border.send();
        })
var country1 = document.createElement('div');
country1.className = 'country-1';
country1.innerHTML= ('<h1>'+country2[0].name.common+'</h1> ');
country1.append(country_box);
country1.append(neighbours);


$(".box1").append(country1);



};
ourData1.send();


}); 