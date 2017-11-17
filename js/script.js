
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street= $('#street').val();
    var $city= $('#city').val();
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+$street+","+$city+'&key=AIzaSyAx_R_jv-1_c_XoQhw4cAVFmA658SGk8Ns">')   
    $greeting.text('So,you want to live at'+$street+','+$city+'?'); 

     // YOUR CODE GOES HERE!
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "42d2c7b133654f3c9d1435ad943356b1",
      'q': $city
    });
    $.getJSON(url, function(result){
        console.log(result)
        $nytHeaderElem.text('New York Times Articles About '+$city);
        for(i=0; i<result.response.docs.length; i++){
        $nytElem.append('<li class "article">'+
                            '<a href="'+result.response.docs[i].web_url+'">'+result.response.docs[i].headline.main+'</a>'+
                            '<p>'+result.response.docs[i].snippet+'</p>'+
                        '</li>');
        }
        
    }).fail(function(){
            $nytHeaderElem.text('New York Times Aticles Could Not Be Loaded');
        });

    //there is no method that can handle error when using .ajax(), so we have to implement one by ourselvies
    var wikiRequestTimeout=setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    },8000);
    $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$city,
            dataType: "jsonp",
            success: function(data){
                console.log(data)
                for(i=0; i<data[1].length; i++){
                    $wikiElem.append('<li>'+
                                        '<a href="https://en.wikipedia.org/wiki/'+data[1][i]+'">'+data[1][i]+'</a>'+ 
                                    '</li>'); 
                };
                clearTimeout(wikiRequestTimeout);   
            }
    });

    return false;
};

$('#form-container').submit(loadData);
