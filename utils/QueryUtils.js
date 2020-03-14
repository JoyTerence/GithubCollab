
export const queryRepoByLanguageWithCursor = (language, afterCursor) => {
  return  (`{\
              \"query\" : \"{ \
                search(query: \\\"language: ${language}, sort:stars-desc\\\", type: REPOSITORY, first: 10, ${afterCursor && afterCursor.length>0? ("after: " + '\\\"' + afterCursor + '\\\"'):""}) { \
                  repositoryCount \
                  pageInfo { \
                    endCursor \
                    hasNextPage \
                  } \
                  edges { \
                    node { \
                      ... on Repository {\
                        id \
                        name \
                        owner {\
                          login\
                        }\
                        nameWithOwner \
                        description \
                        issues(states:OPEN) { \
                          totalCount \
                        } \
                        stargazers{ \
                          totalCount \
                        }\
                        primaryLanguage { \
                          name\
                        } \
                        mentionableUsers{ \
                          totalCount \
                        } \
                        pushedAt \
                        upCase: object(expression: \\"master:README.md\\") { \
                          ... on Blob { \
                            text \
                          } \
                        } \
                        lowCase: object(expression: \\"master:readme.md\\") { \
                          ... on Blob { \
                            text \
                          } \
                        } \
                      }\
                    }\
                  }\
                }\
              }\"\
          }`)
}

export const queryRepoByNameWithCursor = (name, afterCursor) => {
  return  (`{\
              \"query\" : \"{ \
                search(query: \\\"${name}\\\", type: REPOSITORY, first: 10, ${afterCursor && afterCursor.length>0? ("after: " + '\\\"' + afterCursor + '\\\"'):""}) { \
                  repositoryCount \
                  pageInfo { \
                    endCursor \
                    hasNextPage \
                  } \
                  edges { \
                    node { \
                      ... on Repository {\
                        id \
                        name \
                        owner {\
                          login\
                        }\
                        nameWithOwner \
                        description \
                        issues(states:OPEN) { \
                          totalCount \
                        } \
                        stargazers{ \
                          totalCount \
                        }\
                        primaryLanguage { \
                          name\
                        } \
                        mentionableUsers{ \
                          totalCount \
                        } \
                        pushedAt \
                        upCase: object(expression: \\"master:README.md\\") { \
                          ... on Blob { \
                            text \
                          } \
                        } \
                        lowCase: object(expression: \\"master:readme.md\\") { \
                          ... on Blob { \
                            text \
                          } \
                        } \
                      }\
                    }\
                  }\
                }\
              }\"\
          }`)
}

export const queryUserName = () => {
  return ("{ \"query\": \"{ viewer { name } } \"}");
}

export const queryViewerNameAndURL = () => {
  return ("{ \"query\": \"{ viewer { name avatarUrl } } \"}");
}

export const queryProfile = () => {
  return ("{ \"query\": \"{viewer {  createdAt followers { totalCount } following { totalCount } location createdAt repositories { totalCount }} }\"}");
}

export const queryViewerRepo = (endCursor) => {
  return (`{ \
              \"query\": \" { \
                  viewer { \
                    repositories(first: 10, ${endCursor && endCursor.length>0? "after: " + "\\\"" + endCursor + "\\\"":""}) { \
                      totalCount \
                      pageInfo { \
                        endCursor \
                        hasNextPage \
                      } \
                      edges { \
                        node { \
                          id \
                          name \
                          owner {\
                            login\
                          }\
                          description \
                          createdAt \
                          issues(states:OPEN) { \
                            totalCount \
                          } \
                          stargazers{ \
                            totalCount \
                          }\
                          primaryLanguage { \
                            name\
                          } \
                          mentionableUsers{ \
                            totalCount \
                          } \
                          pushedAt \
                          nameWithOwner \
                          upCase: object(expression: \\"master:README.md\\") { \
                            ... on Blob { \
                              text \
                            } \
                          } \
                          lowCase: object(expression: \\"master:readme.md\\") { \
                            ... on Blob { \
                              text \
                            } \
                          } \
                        } \
                      } \
                    } \
                  } \
              }\"\
          }`)
}

export const queryContributionCalendar = () => {
  return (`{ \
            \"query\": \" { \
              viewer { \
                contributionsCollection { \
                  contributionCalendar { \
                    totalContributions \
                    months { \
                      name \
                    } \
                    weeks { \
                      firstDay \
                      contributionDays { \
                        color \
                        contributionCount \
                      } \
                    } \
                  } \
                } \
              } \
            }\" \
          }`)
}

export const queryRepoDetailsFromNameAndOwner = (owner, name) => {
  return (`{ \
              \"query\": \" { \
                  repository(name: \\"${name}\\" , owner: \\"${owner}\\") { \
                    id \
                    name \
                    owner {\
                      login\
                    }\
                    description \
                    createdAt \
                    issues(states:OPEN) { \
                      totalCount \
                    } \
                    stargazers{ \
                      totalCount \
                    }\
                    primaryLanguage { \
                      name\
                    } \
                    mentionableUsers{ \
                      totalCount \
                    } \
                    pushedAt \
                    nameWithOwner \
                    upCase: object(expression: \\"master:README.md\\") { \
                      ... on Blob { \
                        text \
                      } \
                    } \
                    lowCase: object(expression: \\"master:readme.md\\") { \
                      ... on Blob { \
                        text \
                      } \
                    } \
                  } \
              }\"\
          }`)
}

export const queryIssueStats = (name, owner, endCursor) => {
  return  (`{\
              \"query\" : \" { \
                  repository(name: \\"${name}\\" , owner: \\"${owner}\\") { \
                    issues(first: 10, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, ${endCursor && endCursor.length>0? "after: " + "\\\"" + endCursor + "\\\"":""}) { \
                      pageInfo { \
                        endCursor \
                        hasNextPage \
                      } \
                      nodes { \
                        number \
                        bodyText \
                        body \
                        comments { \
                          totalCount \
                        } \
                        author { login avatarUrl } \
                        repository { \
                          owner { login } \
                          name \
                        } \
                        url \
                        title \
                        number \
                        createdAt \
                      } \
                    } \
                  } \
              }\" \
          }`)
}

export const queryIssuetimeline = (name, owner, issueNumber, endCursor) => {
 return  (`{\
    \"query\" : \" { \
        repository(name: \\"${name}\\" , owner: \\"${owner}\\") { \
          issue (number : ${issueNumber}) { \
            timelineItems(first: 10, ${endCursor && endCursor.length>0? "after: " + "\\\"" + endCursor + "\\\"":""}) { \
              pageInfo { \
                endCursor \
                hasNextPage \
              } \
              nodes { \
                ... on LabeledEvent { \
                  actor { login avatarUrl } \
                  createdAt \
                  label { \
                    name \
                    color \
                  } \
                  __typename \
                } \
                ... on UnlabeledEvent { \
                  actor { login avatarUrl } \
                  createdAt \
                  label { \
                    name \
                    color \
                  } \
                  __typename \
                } \
                ... on AssignedEvent { \
                  actor { login avatarUrl } \
                  createdAt \
                  assignee { \
                    ... on User { \
                      login \
                    } \
                  } \
                  __typename \
                } \
                ... on UnassignedEvent { \
                  actor { login } \
                  createdAt \
                  assignee { \
                    ... on User { \
                      login \
                      avatarUrl \
                    } \
                  } \
                  __typename \
                } \
                ... on ReopenedEvent { \
                  actor { login avatarUrl} \
                  createdAt \
                  __typename \
                } \
                ... on ClosedEvent { \
                  actor { login avatarUrl} \
                  createdAt \
                  __typename \
                } \
                ... on RenamedTitleEvent { \
                  actor {login avatarUrl} \
                  createdAt \
                  currentTitle \
                  previousTitle \
                  __typename \
                } \
                ... on IssueComment { \
                  createdAt \
                  author { login avatarUrl } \
                  bodyText \
                  __typename \
                } \
                ... on CrossReferencedEvent { \
                  actor { login avatarUrl} \
                  referencedAt  \
                  source { \
                    ... on Issue { \
                      title \
                      number \
                    } \
                    ... on  PullRequest { \
                      title \
                      number \
                    } \
                  } \
                  __typename \
                } \
              } \
            } \
          } \
        } \
      }\" \
    }`)
}


export const queryRestAPIContributors = (owner, name) => {
  return ("repos/" + owner + "/" + name + "/stats/contributors")
}

export const queryGistDetails = (endCursor) => {
  return (`{ \
    \"query\": \" { \
      viewer { \
        gists (first: 10, ${endCursor && endCursor.length>0? "after: " + "\\\"" + endCursor + "\\\"":""}) { \
          nodes { \
            stargazers { \
              totalCount \
            } \
            name \
            description \
            forks { \
              totalCount \
            } \
            createdAt \
            files { \
              name \
            } \
          } \
        } \
      } \
    }\" \
  }`)
}

export const queryContributionStats = () => {
  return (`{ \
            \"query\": \" { \
              viewer { \
                contributionsCollection { \
                  totalIssueContributions \
                  totalCommitContributions \
                  totalRepositoryContributions \
                  totalPullRequestContributions \
                  totalPullRequestReviewContributions \
                  totalRepositoriesWithContributedIssues \
                  totalRepositoriesWithContributedCommits \
                  totalRepositoriesWithContributedPullRequests \
                } \
              } \
            }\" \
          }`)
}