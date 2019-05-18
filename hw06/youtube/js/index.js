const search = (ev) => {
    //console.log(document.querySelector('input').value);
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/youtube/simple/?q='${term}'&type=video`;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    //console.log(data);
    //document.querySelector('#output').innerHTML = JSON.stringify(data, null, 4);
    document.querySelector('#output').innerHTML = "";
    for (item of data) {
      const template = `
        <div class="card">
            <iframe src="${item.embed_url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${item.title}</p>
        </div>
        `;
      document.querySelector('#output').innerHTML += template;
    }
};

document.querySelector('#search').onclick = search;
