function articleFinder(reqTitle, articleArr) {

  var foundArt;

  for(var i = 0; i< articleArr.length; i++) {

    if(articleArr[i].urlTitle === reqTitle) {

      foundArt = articleArr[i];
    }
  }

  return foundArt;
}

module.exports = articleFinder;