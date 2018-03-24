const ItunesApi = {
 url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
 getDetailUrl: (podcastId) => `https://itunes.apple.com/lookup?id=${podcastId}`,
 getAttr: (item, param) => {
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
 },
 rss2json: {
     url: 'https://api.rss2json.com/v1/api.json?rss_url='
 },
 getEpisodesUrl: function (feed, count) {
    return  `${this.rss2json.url}${feed}&count=${count}`
 }
}

export default ItunesApi;