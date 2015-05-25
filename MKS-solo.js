Items = new Meteor.Collection("items");

if (Meteor.isClient) {
  Template.list.helpers({
    items: function() {
      return Items.find();
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


  Template.inputs.events({
    "submit form": function(event, template) {
      event.preventDefault();

      var description = $(event.target).find('[id=newItem]').val();
      Items.insert({description: description})
      template.find("form").reset();
    }
  })

  Template.list.events({
    "click li": function(){
      Items.update({_id:this._id}, {$set:{done:!this.done}}) //sets list item's "done" property to true; toggles
    }
  })
}


if (Meteor.isServer) {
  Meteor.startup(function() {
      if (Items.find().count() === 0) {
        var items = [
        { description: "eat cereal"}, 
        { description: "DAWG WHY U GOTTA EAT ALL MUH CERLS"}
        ];
      
      for (var i = 0; i < items.length; i++) {
        Items.insert(items[i]);
      }
    }
  });
}



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