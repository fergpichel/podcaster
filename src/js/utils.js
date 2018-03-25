const Utils = {
  showSpinner: () => {
    $('.spinner').addClass('spinner__on')
  },
  hideSpinner: () => {
    $('.spinner').removeClass('spinner__on')
  },
  pad(num) {
    return ("0" + num).slice(-2);
  },
  hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  },
  getMimeType(ext) {
    switch(ext) {
      case 'wav':
        return 'audio/wav'
      case 'mp4':
      case 'm4a':
      case 'm4u':
        return 'audio/mp4';
      case 'ogg':
      case 'opus':
        return 'audio/ogg';
      case 'webm':
        return 'audio/webm';
      default:
        return 'audio/mpeg';
    }
  },
  fileType(url) {
    if (url != undefined) { 
      const types = ['ogg', 'opus', 'mp4', 'm4a', 'm4u', 'mp3', 'mpg', 'webm', 'wav'];
      let filteredTypes = types.filter(function(type) {
        return url.toString().search(type) !== -1;
      });
      return this.getMimeType(filteredTypes[0]);
    }
  }
}
 
 export default Utils;