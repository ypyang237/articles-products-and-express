function articleFinder(req, articleArr) {
console.log('what is req', req);
  for(var i = 0; i< articleArr.length; i++) {
     // console.log(req.url);
    if(req.url) {
      if(articleArr[i].urlTitle === req.url.slice(1)) {
        return articleArr[i];
      }
    }
    if(articleArr[i].urlTitle === req) {
      return articleArr[i];
    }
  }
}

module.exports = articleFinder;