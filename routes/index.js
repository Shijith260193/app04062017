var express = require('express');
var router = express.Router();
var request=require('request');
var https=require('https');
var email=require('emailjs/email');

/* GET home page. */
router.get('/', function (req, res, next) {
    return res.render('index', { title: 'Price Comparison'});
});

router.post('/data', function(req,res){
console.log(req.body.url);

    var apikey="kX2BRz4AWqi9Oz2ZthuX7xOD1NKxTiyi";
  var URL=req.body.url + apikey;
  // headers
  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }
// Configure the request
  var options1 = {
      url: URL,
      method: 'GET',
      headers: headers
  }
  var link,result,value

  request(options1,function(err,response,body){
      if(!err && response.statusCode==200){
          var item3=JSON.parse(body)
          res.json(item3);
      }
      });

});

router.get('/products',function(req,res,next){
  res.render('products');
})

router.get('/categories',function(req,res,next){
    res.render('categories')
})

router.get('/category',function(req,res,next){
    res.render('category')
})

router.get('/displayproduct',function(req,res,next){
    res.render('displayproduct')
})

router.get('/deals',function(req,res,next){
    res.render('deals')
})

router.get('/displaydeals',function(req,res,next){
    res.render('displaydeals')
})
router.get('/contactus',function(req,res,next){
  res.render('contactus');
});
router.post('/send',function(req,res,next){

  if(req.body.email == "" || req.body.subject == "") {
    res.send('empty fields')
    return false;
  }
  var cust_name=req.body.cust_name;
  var cust_email=req.body.email;
  var cust_number=req.body.number;
  var cust_sub=req.body.subject;
  var cust_desc=req.body.description;
  var sendmail=email.server.connect({
      user:"showmoredeals.test@gmail.com",
      password: "showmoredeals1!",
      host:"smtp.gmail.com",
      ssl:true
    });
    var message={
      from: cust_name,
      to:"showmoredeals <showmoredeals.test@gmail.com>",
      subject:cust_sub+"          Contact number is: "+cust_number,
      text:cust_desc
    };
    sendmail.send(message,function(err,message){
      if(err){
        console.log('some error')
      }
      else{
        console.log('success!!!!')
        res.render('thanks');
      }
    })

});


module.exports = router;
