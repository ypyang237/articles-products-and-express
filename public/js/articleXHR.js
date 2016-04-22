window.onload = function () {
  var xhrForm = document.getElementById('xhrForm');
  xhrForm.addEventListener('submit', function (event) {

    event.preventDefault();

    var content = document.querySelectorAll('.content');
    var method = 'PUT';

    var postReq = '';
    var newTitle;
    var urltitle;
    for(var i = 0; i< content.length; i++) {
      if(content[i].name === 'newTitle') {
        console.log('newTitle', content[i].name);
        newTitle = content[i].value;
      } else if (content[i].name === 'urltitle'){
        console.log('Title', content[i].name);
        urltitle = content[i].value;
      }

      postReq += content[i].name + '=' + content[i].value + '&';
    }
    if(document.getElementById('methodOverwrite') === null) {
      method = 'POST';
    } else {
      postReq = postReq.replace(urltitle, encodeURI(newTitle));
    }


    var xReq = new XMLHttpRequest();
    var res;
    xReq.addEventListener('load', function () {

      res = JSON.parse(this.responseText);
      if (res.success) {

        window.location = 'http://localhost:3000/articles';
      }
    });

    xReq.onreadystatechange = function () {

      if (xReq.readyState == 4 && xReq.status != 200) {
        alert('Invalid key!');
      }
    };

    xReq.open(method, this.action);
    xReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xReq.setRequestHeader("Accept", "application/json");
    xReq.setRequestHeader("version", "1.0")
    xReq.send(postReq);
  });
};