const axios = require('axios')
const API_URL = '/.api/graphql'
let SOURCEGRAPH_ADDRESS = 'http://fh1-srcgrph01.dun.fh'
let TOKEN = ""


function manageSourceGraphAddress(opts) {
    if (!opts.address)
        return
    SOURCEGRAPH_ADDRESS = opts.address;
}

async function resolveRevision(repository) {
    const { data: result } = await axios.post(`${SOURCEGRAPH_ADDRESS}${API_URL}`, { "query": "\n                query ResolveRev($repoPath: String!, $rev: String!) {\n                    repository(name: $repoPath) {\n                        mirrorInfo {\n                            cloneInProgress\n                            cloneProgress\n                        }\n                        commit(rev: $rev) {\n                            oid\n                            tree(path: \"\") {\n                                url\n                            }\n                        }\n                        defaultBranch {\n                            abbrevName\n                        }\n                        redirectURL\n                    }\n                }\n            ", "variables": { "repoPath": repository, "rev": "" } },
        {
            headers: {
                Authorization: 'token ' + TOKEN
            }
        })

    return result.data.repository.commit.oid
}

async function getBlob(repoPath, commitID) {
    const { data: result } = await axios.post(`${SOURCEGRAPH_ADDRESS}${API_URL}`, { "query": "\n                query Blob(\n                    $repoPath: String!\n                    $commitID: String!\n                    $filePath: String!\n                    $isLightTheme: Boolean!\n                    $disableTimeout: Boolean!\n                ) {\n                    repository(name: $repoPath) {\n                        commit(rev: $commitID) {\n                            file(path: $filePath) {\n                                content\n                                richHTML\n                                highlight(disableTimeout: $disableTimeout, isLightTheme: $isLightTheme) {\n                                    aborted\n                                    html\n                                }\n                            }\n                        }\n                    }\n                }\n            ", "variables": { "repoPath": repoPath, "commitID": commitID, "filePath": "or.json", "isLightTheme": true, "disableTimeout": false } },
        {
            headers: {
                Authorization: 'token ' + TOKEN
            }
        })

    const fileContent = JSON.parse(result.data.repository.commit.file.content)
    return fileContent
}

async function getORs(token, opts) {
    manageSourceGraphAddress(opts);
    let ORs = [];

    TOKEN = token
    const { data: result } = await axios.post(`${SOURCEGRAPH_ADDRESS}${API_URL}`, { "query": "query ($query: String!) {\n  search(query: $query) {\n    results {\n      __typename\n      limitHit\n      resultCount\n      approximateResultCount\n      missing {\n        name\n      }\n      cloning {\n        name\n      }\n      timedout {\n        name\n      }\n      indexUnavailable\n      results {\n        ... on Repository {\n          __typename\n          name\n        }\n        ... on FileMatch {\n          __typename\n          resource\n        }\n        ... on CommitSearchResult {\n          __typename\n          commit {\n            oid\n            message\n          }\n        }\n      }\n    }\n  }\n}\n", "variables": { "query": "file:^or\\.(json)$" } }, {
        headers: {
            Authorization: 'token ' + TOKEN
        }
    });

    const searchResults = result.data.search.results.results

    for await (let data of searchResults) {
        const repository = data.resource.replace("git://", "").replace("#or.json", "")
        const lastRevision = await resolveRevision(repository)
        const blob = await getBlob(repository, lastRevision)

        ORs.push(blob)
    }
    return ORs
}

module.exports = getORs