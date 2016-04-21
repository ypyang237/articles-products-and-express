window.onload = function () {
  console.log('hello');
  var xhrForm = document.getElementById('xhrForm');
  xhrForm.addEventListener('submit', function (event) {

    event.preventDefault();

    var content = document.querySelectorAll('.content');
    var method = 'PUT';

    var postReq = '';
    var newTitle;
    var urlTitle;
    for(var i = 0; i< content.length; i++) {
      if(content[i].name === 'newTitle') {
        newTitle = content[i].value;
      } else if (content[i].name === 'urlTitle'){
        urlTitle = content[i].value;
      }

      postReq += content[i].name + '=' + content[i].value + '&';
    }
    console.log('POSTREQ', postReq);
    if(document.getElementById('methodOverwrite') === null) {
      method = 'POST';
    } else {
      postReq = postReq.replace(urlTitle, encodeURI(newTitle));
    }


    var xReq = new XMLHttpRequest();

    xReq.addEventListener('load', function () {

      var res = JSON.parse(this.responseText);
      if (res.success) {

        window.location = 'http://localhost:3000/articles';
      }
    });

    xReq.onreadystatechange = function () {

      if (xReq.readyState == 4 && xReq.status != 200) {

        alert('Incorrect form data!');
      }
    };


    xReq.open(method, this.action);
    xReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xReq.setRequestHeader("version", "1.0");
    xReq.send(postReq);
  });
};