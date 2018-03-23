const ItunesApi = {
 url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
 getAttr: function(item, param) {
  switch(param) {
      case 'id':
          return item.id.attributes['im:id'];
      case 'name':
          return item['im:name'].label;
      case 'artist':
          return item['im:artist'].label;
      case 'image':
          return item['im:image'][2].label;
      default:
          return '';
  }
 }
}

export default ItunesApi;