Items = new Meteor.Collection("items"); //Holds items

if (Meteor.isClient) {
  Meteor.subscribe('items');

  Template.list.helpers({
    items: function() {
      return Items.find();
      // return Items.find(Session.get('items'));
    },
    doneClass: function(){
      if(this.done){
        return "done";
      }
      else{
        return "";
      }
    }
  });

  Template.list.events({
    "submit form": function(event, template) {
      event.preventDefault();

      var description = $(event.target).find('[id=newItem]').val();
      Items.insert({description: description})
      template.find("form").reset();
      }
  })


  Template.list.events({
    "click .checky": function(){
      Items.update({_id:this._id}, {$set:{done:!this.done}}) //sets list item's "done" property to true; toggles
    },
  })

  Template.list.events({
      "click .removeitems": function(){
        console.log("Ya dun tershed it")
        Items.remove({_id:this._id});
      },
    })

  Template.list.events({
    "dblclick .todoItem": function(){
      console.log("Ya drblegrbled it")
      //Session.set('editingList', true)
    },
  })


  // Meteor.call("getQuote", function(error, results) {
  //     if (err){
  //       console.log("Error occurrs")
  //     }
  //     else{
  //       var buddy = result;
  //       console.log(results); //results.data should be a JSON object
  //     }
  //   });
        

}

if (Meteor.isServer) {
    function seed(){
      Items.remove({}); //removes items on server startup
    }
  
  Meteor.startup(seed);

    Meteor.publish('items', function(){
      observeSubscription(this, 'items', function(){
        return Items.find();
      });
    });

      if (Items.find().count() === 0) {
        var items = [];
      
      for (var i = 0; i < items.length; i++) {
        Items.insert(items[i]);
      }
    }


    // Meteor.methods({
    //     getQuote: function () {
    //         this.unblock();
    //         return Meteor.http.call("GET", " http://api.theysaidso.com/qod");
    //     }
    // });

}










/////////////////////////////////////////////////////////////////////
//API request to forismatic inspiriational quotes
// if (Meteor.isServer) {
    // Meteor.methods({
    //     getQuote: function () {
    //         this.unblock();
    //         return Meteor.http.call("GET", "http://api.forismatic.com/api/1.0/");
    //     }
    // });
// }

    // Meteor.methods({
    //     getQuote: function () {
    //         this.unblock();
    //          var url = "http://api.forismatic.com/api/1.0/"
    //         return Meteor.http.call("GET", "http://api.forismatic.com/api/1.0/");
    //     }
    // });



// //invoke the server method
// if (Meteor.isClient) {
    // Meteor.call("getQuote", function(error, results) {
    //     console.log(results.content); //results.data should be a JSON object
    // });
// }


// fetchFromService: function(userName) {
//       var url = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="+userName+"&count=10";
//       //synchronous GET
//       var result = Meteor.http.get(url, {timeout:30000});
//       if(result.statusCode==200) {
//         var respJson = JSON.parse(result.content);
//         console.log("response received.");
//         return respJson;
//       } else {
//         console.log("Response issue: ", result.statusCode);
//         var errorJson = JSON.parse(result.content);
//         throw new Meteor.Error(result.statusCode, errorJson.error);
//       }
//     }


/////////////////////////////////////////////////////////////////////













//Old code note being used currently


  // Template.login.events({
  //   'submit #login-form' : function(e, t){
  //     e.preventDefault();
  //     // retrieve the input field values
  //     var email = t.find('#login-email').value, 
  //     password = t.find('#login-password').value;

  //       // Trim and validate your fields here.... 
  //       // If validation passes, supply the appropriate fields to the
  //       // Meteor.loginWithPassword() function.
  //       Meteor.loginWithPassword(email, password, function(err){
  //         if (err){
  //           console.log(err) //Failed login; inform user
  //         }
  //         else{ //User successfully logs in  
  //         }

  //       });
  //       return false; 
  //     }
  // });

  // Template.register.events({
  //   'submit #register-form' : function(e, t) {
  //     e.preventDefault();
  //     var email = t.find('#account-email').value
  //       , password = t.find('#account-password').value;

  //       // Trim and validate the input

  //     Accounts.createUser({email: email, password : password}, function(err){
  //         if (err) {
  //           console.log(err)
  //           // Inform the user that account creation failed
  //         } else {
  //           console.log("Successful account creation and login")
  //           // Success. Account has been created and the user
  //           // has logged in successfully. 
  //         }

  //       });

  //     return false;
  //   }
  // });


  // var trimInput = function(val) {
  //   return val.replace(/^\s*|\s*$/g, "");
  // }

  // var email = trimInput(email);










    // return Meteor.methods({  //Clear out the database upon server start
      //   removeAllItems: function() {
      //     return Items.remove({});
      //   }
      // });






// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }