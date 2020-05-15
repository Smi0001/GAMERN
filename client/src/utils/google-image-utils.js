// google image search setup
const GOOGLE_SEARCH_IMAGES = require('image-search-google')
// cseID https://cse.google.com/cse/setup/basic?cx=004973649819293208902%3Akfq78axqpes
const CSE_ID = '004973649819293208902:kfq78axqpes'
// gAPI key https://console.developers.google.com/apis/credentials?project=maximal-quanta-173719
const G_API_KEY = 'AIzaSyDFArRGA3jheuBJbVCdeOpL2WsAyo0ybrk'
const GOOGLE = new GOOGLE_SEARCH_IMAGES(CSE_ID, G_API_KEY)
const GOOGLE_IMAGE_API = (searchString, options) => GOOGLE.search(searchString, options).then(response => response)
export default GOOGLE_IMAGE_API
