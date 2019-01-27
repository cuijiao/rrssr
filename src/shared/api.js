import fetch from 'isomorphic-fetch'

export const fetchPopularRepos = (language = 'all') => {
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return fetch(encodedURI)
        .then((data) => data.json())
        .then((repos) => repos.items)
        .catch((error) => {
            console.warn(error);
            return null
        });
};

export const loadData = resourceType => {
    return fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data.filter((_, idx) => idx < 10);
        });
};
