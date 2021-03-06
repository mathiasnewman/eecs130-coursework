const search = (ev) => {
    //console.log(document.querySelector('input').value);
    let term = document.querySelector('#search_input').value;
    let minPrice = document.querySelector('#min_price').value;
    let maxPrice = document.querySelector('#max_price').value;
    let numItems = document.querySelector('#num_items').value;
    //window.location.href = "./results.html";
    let myAppID = "MathiasN-SearchWe-PRD-4ea9e4abd-812df157";
    let url = "https://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME="+myAppID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        //url += "&callback=_cb_findItemsByKeywords";
        url += "&callback=displayResults";
        url += "&REST-PAYLOAD";
        url += "&keywords="+term;
        //Filters below:
        url += "&itemFilter(0).name=MinPrice";
        url += "&itemFilter(0).value="+minPrice;
        url += "&itemFilter(0).paramName=Currency";
        url += "&itemFilter(0).paramValue=USD";
        url += "&itemFilter(1).name=MaxPrice";
        url += "&itemFilter(1).value="+maxPrice;
        url += "&itemFilter(1).paramName=Currency";
        url += "&itemFilter(1).paramValue=USD";
        //Number of entries per page:
        url += "&paginationInput.entriesPerPage="+numItems;
    s=document.createElement('script'); // create script element
    s.src= url;
    document.body.appendChild(s);
     //fetch(url)
    //     .then(response => response.json())
    //     .then(displayResults);
};

const displayResults = (root) => {
    let data = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    //console.log(data);
    //document.querySelector('#output').innerHTML = JSON.stringify(data, null, 4);
    document.querySelector('#output').innerHTML = "";
    for (item of data) {
      const template = `
        <div class="card">
            <img src="${item.galleryURL}">
            <a href="${item.viewItemURL}" target="_blank">${item.title}</a>
        </div>
        `;
      document.querySelector('#output').innerHTML += template;
    }
};

document.querySelector('#search').onclick = search;
