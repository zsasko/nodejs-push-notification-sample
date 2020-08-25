$(document).ready(function () {

  $("form").submit(function (e) {
    e.preventDefault(e);
    sendMessage();
  });

  function sendMessage() {
    const message = $("#message").val();
    const data = { message: message };
    //
    $.post("/send-message", data, function () {
      addMessageToList(data.message);
    }).fail(function (error) {
      const firstError = error.responseJSON["errors"][0]["msg"];
      alert(firstError);
    });
  }

  function addMessageToList(message) {
    $("#sentMessages").prepend(`<li class="list-group-item">${message}</li>`);
  }
  
});
