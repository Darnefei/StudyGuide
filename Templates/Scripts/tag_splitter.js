function tag_creator(filename, foldername) {
    var tagsArray = filename.split(/[ ,]+/);
    var tagsToString = "";
    var wholeNameTag = "";
    tagsArray.forEach(element => {
        tagsToString += ' #' + element;
        wholeNameTag += element;
    });
    wholeNameTag = ' #' + wholeNameTag;
    foldername = ' #' + foldername;
    var wholeNameSameAsTag = wholeNameTag.localeCompare(tagsToString) == 0
    var folderNameSameAsTag = foldername.localeCompare(tagsToString) == 0
    if(!wholeNameSameAsTag){
      tagsToString += wholeNameTag;
    }
    if (!folderNameSameAsTag){
      tagsToString = foldername + tagsToString;
    } 
    return tagsToString;
  }

module.exports = tag_creator;