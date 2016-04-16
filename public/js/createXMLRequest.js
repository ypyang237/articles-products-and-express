window.onload = function () {

  var xhrForm = document.getElementById('xhrForm');
  xhrForm.addEventListener('submit', function (event) {
  
    event.preventDefault();
    
    var title = document.getElementById('title').value;
    var body = document.getElementById('body').value;
    var author = document.getElementById('author').value;

    var postReq = 'title=' + title + '&body=' + body + '&author=' + author;

    var xReq = new XMLHttpRequest();

    xReq.addEventListener('load', function () {

      var res = JSON.parse(this.responseText);
      if (res.success) {

        window.location = 'http://localhost:3000/articles'
      };
    });

    xReq.onreadystatechange = function () {

      if (xReq.readyState == 4 && xReq.status != 200) {

        alert('Incorrect form data!');
      } 
    }

    xReq.open('POST', this.action);
    xReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xReq.setRequestHeader("version", "1.0");
    xReq.send(postReq);
  })
}