
const fetch = require('node-fetch');
const cheerio = require('cheerio');

//const PROJECTID = 'githubtriage';
//const TRENDING_COLLECTION = 'trending';
//const firestore = new Firestore({
//  projectId: PROJECTID,
//  timestampsInSnapshots: true,
//});

//const db = firestore.collection(TRENDING_COLLECTION)


exports.helloWorld = (req, res) => {
  const GITHUB_TREND_URL = "https://github.com/trending/"
  
  let lang = req.body.language
  let freq = req.body.frequency
  
  if( lang  == null || lang == undefined || lang == 0) {
  	lang = ""
  }
  if( freq  == null || freq == undefined || freq == 0) {
  	freq = ""
  }
  
  let url = GITHUB_TREND_URL + lang + "?since=" + freq
  
  let trending_repo_list = []
  let trending_repo_json = {}
  
  fetch(url).then((response) => {
	response.text().then((resp) => {
		const $ = cheerio.load(resp);
      
		$('.Box-row h1 a').each(function(i, elem) {
        	var repoName = $(this).text().replace(/\s/g,'')
            trending_repo_list.push(repoName)
		});
      
        trending_repo_json[0] = trending_repo_list
      
      	res.status(200).type('application/json').send(trending_repo_json);
	})
  })
};

