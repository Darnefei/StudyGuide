function link_creator(filename, foldername) {
    var relativePath = foldername.split('/');
    if(relativePath.length > 1){
        var currentFolder = relativePath[relativePath.length - 1];
    if(relativePath.length >=2){
    if(filename.localeCompare(currentFolder) == 0){
        return "[[" + filename + "]], [[" + relativePath[relativePath.length - 2] + "]]";
    }
    return "[[" + currentFolder + "]]";
}
    }
    return "";
  }



module.exports = link_creator;