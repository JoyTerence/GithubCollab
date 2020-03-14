import Github from './GithubProvider';
import { queryRepoDetailsFromNameAndOwner } from './utils/QueryUtils'

const GITHUB_TREND_URL = "https://github.com/trending/"

function askGithubForRepoDetails(reponame_with_owners) {
    let repo_detail_split = reponame_with_owners.split("/")
    let repo_owner = repo_detail_split[0]
    let repo_name = repo_detail_split[1]
    console.log(queryRepoDetailsFromNameAndOwner(repo_owner, repo_name))
    return Github.query(queryRepoDetailsFromNameAndOwner(repo_owner, repo_name));
}

function fetchTrendingRepoUsingRepoNameWithOwners(reponame_with_owners) {
    
    return new Promise((resolve, reject) => {
        let repoData = []
        
        let repo_promises = reponame_with_owners.map(askGithubForRepoDetails)

        let repo_details = Promise.all(repo_promises)

        repo_details.then(data => {
            data.forEach((repo => {
                let temp_repo_json = {}
                temp_repo_json["node"] = repo.data.repository
                repoData.push(temp_repo_json)
            }))
            resolve(repoData)
        })
    })
}

export const fetchTrends = (language, time_period) => {
    return new Promise((resolve, reject) => {
        let google_cloud_functions_url = "https://us-central1-githubtriage.cloudfunctions.net/function-2"
        fetch(google_cloud_functions_url, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "language": language,
                "frequency": time_period
            })
        }).then((response) => {
            response.json().then((res) => {
                let reponame_with_owners = res[0]
                fetchTrendingRepoUsingRepoNameWithOwners(reponame_with_owners).then(res => {
                    resolve (res)
                })
            })
        }).catch((err) => console.log(err))
    });
    
}

