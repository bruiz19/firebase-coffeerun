(function (window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
      db.collection("users").doc(key).set(val);
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      db.collection("users").get.then((snap) =>
        snap.forEach((doc) => {
          console.log(doc.data());
        })
      );
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + "/" + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
      db.collection("users")
        .doc(key)
        .get()
        .then((doc) => {
          console.log(doc.data());
        });
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    db.collection("users").doc(key).delete();
    $.ajax(this.serverUrl + "/" + key, {
      type: "DELETE",
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
