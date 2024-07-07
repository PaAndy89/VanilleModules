const dataAttributeName = 'users';
const fetchUrl = "http://127.0.0.1:8000/api/users";
const timeoutTime = 2000;
const filterAttribute = 'name'

function loadData() {
    setTimeout(loadData, timeoutTime);

    fetch(fetchUrl)
        .then(res => res.json())
        .then((data) => {
            for (let element of document.querySelectorAll(`[data-${dataAttributeName}]`)) {
                if (!element.dataset.filter) {
                    element.dataset[dataAttributeName] = JSON.stringify(data);
                    continue;
                }
                let filters = element.dataset.filter.replace(/\s+/g, '').split(',');
                let filteredData = filters.flatMap(filter => data.filter(data => data[filterAttribute] === filter));
                element.dataset[dataAttributeName] = JSON.stringify(filteredData);
            }
        })
        .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => {
    loadData()
})