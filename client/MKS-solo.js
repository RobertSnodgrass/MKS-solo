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
      Items.update({_id:this._id}, {$set:{done:!this.done}}) 
      //sets list item's "done" property to true; toggles
    },
  })

  Template.list.events({
      "click .removeitems": function(){
        Items.remove({_id:this._id});
        //Deletes item in the to do list
      },
    })

  Template.list.events({
    "dblclick .todoItem": function(){
      console.log("Item was double clicked")
      //No functionality at this time; may be implemented later
    },
  })

  Template.logout.events({
  'click #logOut': function(e, t) {
    e.preventDefault();

    Meteor.logout(function() {
      console.log('Bye Meteorite! Come back whenever you want!');

    });

    return false;
  }
});


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
}

Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "537147a6c81817f70f9b",
  secret: "214516c32afa616d95c621b0d6afcc5f782215e8"
});

