Reservations = new Mongo.Collection("reservations");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    curReservation: function() {
      var idStr = Session.get("curReservation")
      var ret = null;
      console.log("enter");
      if (idStr) {
        console.log("go " + idStr);
        ret = Reservations.findOne({_id: new Meteor.Collection.ObjectID(idStr)})
        console.log("ret " + ret);
      }
      return ret;
    },
  });

  Template.reservation.helpers({
    reservations: function() {
      console.log("GET ReS");
      return Reservations.find({reservation: {$exists: true}});
    },
  });
  Template.reservation.events({
    'click .reservation-item' : function(event) {
      var d = event.currentTarget;
      $(d).button('toggle');
      Session.set("curReservation", $(d).data()._id);
      return false;
    },
  });

  Template.resources.helpers({
    getResource: function(reservaton, resource_name) {
      console.log("resources.getResource(" + reservaton.name + ", " + resource_name + ")");
      var resource = Reservations.find({reserve_from: reservaton.name, resource: resource_name});
      //console.log(" ==> " + JSON.stringify(resource, {indent: true}));
      return resource;
    },
  });

  Template.users.helpers({
    getUser: function(uid_ref) {
      console.log("users.getUser(" + uid_ref + ")");
      var user = Reservations.find({uid: uid_ref});
      //console.log(" ==> " + JSON.stringify(resource, {indent: true}));
      return user;
    },
  });
}
