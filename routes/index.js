var express = require('express');
var router = express.Router();
var http = require('http');
var request=require('request');

var bodyParser = require('body-parser');

var data;
var dict = {};
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index.html',{'name':'arunima'});
});


router.post('/n', function(req, res) {
  console.log("This is n: "+ req.body.n);
  var n=req.body.n;

    request(
        {
            url: 'http://terriblytinytales.com/test.txt',
            json: false
        }, function (error, response, body) {
            if (!error && response.statusCode === 200)
            {

                data=body.split(" ");
                var i=0;

                while(i<data.length)
                {
                    if(dict[data[i]]===undefined)
                        dict[data[i]]=1;
                    else
                        dict[data[i]]+=1;

                    i++;

                }


                var keys= getSortedKeys(dict);
                var words=keys.slice(0,n);

                var wordlist=[];


                for(i=0;i<words.length;i++)
                {wordlist.push(words[i], dict[words[i]]);}
                wordlist.toString();





                res.send({'data':wordlist});

            }
            else
            {
                console.log("Error in generating request for TTT");
                res.send({'data':'ERROR'});

            }
        });



});



module.exports = router;



//function to sort the words
function getSortedKeys(obj)
{
    var keys = [];

    for(var key in obj)
        keys.push(key);

    return keys.sort(function(a,b){return obj[b]-obj[a]});

}

