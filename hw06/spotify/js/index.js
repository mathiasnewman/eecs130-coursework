const search = (ev) => {
    //console.log(document.querySelector('input').value);
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/spotify/simple/v1/search?q='${term}'&type=track`;
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
            <img src="${item.album.image_url}">
            <audio controls>
                <source src="${item.preview_url}">
            </audio>
            <p>Song: ${item.name}</p>
            <p>Album: ${item.album.name}</p>
            <p>Artist: ${item.artist.name}</p>
        </div>
        `;
      document.querySelector('#output').innerHTML += template;
    }
};

document.querySelector('#search').onclick = search;
