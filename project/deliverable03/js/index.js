const search = (ev) => {
    //Forms URL to interface with eBay API
    let term = document.querySelector('#search_input').value;
    let myAppID = "MathiasN-SearchWe-PRD-4ea9e4abd-812df157";
    let url = "https://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME="+myAppID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=displayResults";
        url += "&REST-PAYLOAD";
        url += "&keywords="+term;

    //Reads in user input
    let minPrice = document.querySelector('#min_price').value;
    let maxPrice = document.querySelector('#max_price').value;
    let numItems = document.querySelector('#num_items').value;
    let condition = document.querySelector('#condition').value;
    let format = document.querySelector('#format').value;
    let status = document.querySelector('#status').value;
    let shipping = document.querySelector('#shipping').value;
    //Index to keep track of position in itemFilter array
    let index = 0;

    //Sets minPrice to 0 if not specified
    if (minPrice == "") {
      minPrice = "0";
    }
    url += "&itemFilter(0).name=MinPrice";
    url += "&itemFilter(0).value="+minPrice;
    index = index + 1;

    //Checks to see if maxPrice is specified
    if (maxPrice != "") {
      url += "&itemFilter("+index.toString()+").name=MaxPrice";
      url += "&itemFilter("+index.toString()+").value="+maxPrice;
      index = index + 1;
    }

    //Checks condition specification
    if (condition == "Used") {
      url += "&itemFilter("+index.toString()+").name=Condition";
      url += "&itemFilter("+index.toString()+").value="+condition;
      index = index + 1;
    } else if (condition == "New") {
      url += "&itemFilter("+index.toString()+").name=Condition";
      url += "&itemFilter("+index.toString()+").value="+condition;
      index = index + 1;
    }

    //Checks listing type (format)
    if (format == "Auction") {
      url += "&itemFilter("+index.toString()+").name=ListingType";
      url += "&itemFilter("+index.toString()+").value="+format;
      index = index + 1;
    } else if (format == "Buy It Now") {
      url += "&itemFilter("+index.toString()+").name=ListingType";
      url += "&itemFilter("+index.toString()+").value=FixedPrice";
      index = index + 1;
    }

    //Checks shipping specification
    if (shipping == "Free Only") {
      url += "&itemFilter("+index.toString()+").name=FreeShippingOnly";
      url += "&itemFilter("+index.toString()+").value=true";
      index = index + 1;
    }

    //Checks sold status
    if (status == "Sold") {
      url += "&itemFilter("+index.toString()+").name=SoldItemsOnly";
      url += "&itemFilter("+index.toString()+").value=true";
    }

    //Number of entries per page:
    if (numItems == "") {
      numItems = "12";
    }
    url += "&paginationInput.entriesPerPage="+numItems;

    //Create script element containing URL
    s = document.createElement('script');
    s.src= url;
    document.body.appendChild(s);
};

const displayResults = (root) => {
    //Use of try/catch for error handling
    try {
      let data = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
      document.querySelector('.output').innerHTML = "";
      for (item of data) {
        const template = `
          <a href="${item.viewItemURL}" target="_blank">
            <div class="card">
                <img src="${item.galleryURL}">
                <p>${item.title}, Price: $${item.currentPrice}</p>
            </div>
          </a>
          `;
        document.querySelector('.output').innerHTML += template;
      }
      //Checks for existence of results 
      if (document.querySelector('.output').innerHTML == "") {
        document.querySelector('.output').innerHTML = "No results found.";
      }
    }
    catch(err) {
      document.querySelector('.output').innerHTML = "There was an error with your search. Check to make sure your min/max price values are nonnegative. Error message: "+err.message;
    }
};

document.querySelector('#search').onclick = search;
