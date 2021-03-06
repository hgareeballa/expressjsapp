function loadpage(url) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "html",
    ajaxError: function (e) {
      console.log("AJax Error", e);
      $("#mymain").html(e);
    },
    error: function (e) {
      console.log("Error", e);
      $("#mymain").html(e);
    },
    beforeSend: function () {
      console.log("Before Send");
      $("#mymain").html(
        `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`
      );
    },
    complete: function () {
      console.log("Complated");
    },
  })
    .done(function (data) {
      $("#mymain").html("");
      $("#mymain").hide();
      $("#mymain").html(data);
      $("#mymain").slideDown('slow');
    })
    .fail(function (err) {
      console.log("Something went wrong!");
      $("#mymain").html("Not Working !");
    });
} //

function submitHandler(submitbtn, loadingbtn, restext, form, url) {
  loadingbtn.hide();
  restext.hide();

  $.ajax({
    url: url,
    type: "POST",
    data: form.serialize(),
    ajaxError: function (e) {
      console.log("AJax Error", e);
    },
    error: function (e) {
      console.log("Error", e);
    },
    beforeSend: function () {
      restext.hide();
      submitbtn.hide();
      loadingbtn.show();
    },
    complete: function () {
      restext.show();
      submitbtn.show();
      loadingbtn.hide();
    },
  }).done((response) => {
    console.log("done");
    let { error, msg } = response;

    switch (error) {
      case "Unauthorized":
        restext.html(msg);
        restext.prop("class", "btn btn-danger");
        // code block
        break;
      case "Success":
        restext.html(msg);
        restext.prop("class", "btn btn-success");
        // code block
        break;
      case "Fail":
        restext.html(msg);
        restext.prop("class", "btn btn-danger");
        // code block
        break;
      default:
        restext.html("Success");
        restext.prop("class", "btn btn-success");
        $("#mymain").html(response).delay(500);
      // code block
    };//case

  });
}; //
