var express = require('express');
var app = express(); //init Express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Request = require('./app/models/Request');
var Friends = require('./app/models/Friends');
var Messages = require('./app/models/Messages');
mongoose.connect('mongodb://toutouastro:toutouastro@ds032887.mlab.com:32887/pokemap');

//init bodyParser to extract properties from POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
//init Express Router
var router = express.Router();
//default/test route
router.get('/toutou', function(req, res) {
  res.json({ message: 'App is running!' });
});

router.route('/requests')

  .get(function(req, res) {
    console.log (req.query.dest_id);
    Request.find({"dest": req.query.dest_id}, function(err, contact) {
      if (err)
        res.send(err);

      console.log (contact);
      res.json(contact);
    });

  })

  // update contact: PUT http://localhost:8080/api/contacts/{id}
  .post(function(req, res) {
        var request = new Request ({"src" :req.body.src, "dest":req.body.dest});
        console.log ({"src" :req.body.src, "dest":req.body.dest});
        request.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Request created!' });
      });
  })

  .put(function(req, res) {
        Request.findById(req.body.req_id, function(error, friend_req) {
          console.log("here");
          //res.json(req.body.req_id);
          console.log(req.body.req_id);
          //res.json(friend_req);
          var first_user = friend_req.src;
          var second_user = friend_req.dest;

          // Create friends record
          var friendship = new Friends({first_user_id: first_user, second_user_id: second_user});
          friendship.save(function(err){
            if (err) return handleError(err);
          });

          friend_req.remove(function (err) {
            if (err) return handleError(err);
          });
        })
        res.json({ message: 'Done' });
  });

router.route('/friends')

  .get(function(req, res) {
    console.log (req.query.user_id);
    var user_id = req.query.user_id;

    Friends.find({$or : [{first_user_id: user_id}, {second_user_id: user_id}]}, function(err, friends_list) {
      if (err)
        res.send(err);

      console.log (friends_list);
      res.json(friends_list);
    });

  });

router.route('/messages')

  .get(function(req, res) {
    console.log (req.query);
    var first_user_id = req.query.first_user_id;
    var second_user_id = req.query.second_user_id;

    Messages.find({$or : [{sender_id: first_user_id, receiver_id: second_user_id}, {sender_id: second_user_id, receiver_id: first_user_id}]}, function(err, messages_list) {
      if (err)
        res.send(err);

      console.log (messages_list);
      res.json(messages_list);
    });

  })

  .post(function(req, res) {
    console.log (req.body);
    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var message_content = req.body.message_content;

    var new_message = new Messages ({message_content: message_content,sender_id: sender_id, receiver_id: receiver_id });
    new_message.save(function(err) {
      if (err)
        res.send(err);

      console.log(new_message);
      res.json({ message: 'Done' });
    });

  });

//associate router to url path
app.use('/', router);
//start the Express server
app.listen(port);
console.log('Listening on port ' + port);	