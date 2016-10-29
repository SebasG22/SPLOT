/**
 * Created by SebasG on 25/10/16.
 */
var user = firebase.auth().currentUser;

user.delete().then(function() {
    // User deleted.
}, function(error) {
    // An error happened.
});
