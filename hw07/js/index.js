// Global Variables:
const serverURL = 'https://newman-eecs130-hw07.herokuapp.com/';
let activeCardID = -1
let appPhotos;


// functions:
const loadCardListView = (imagesFromServer) => {
    // save to a global variable so this data will be
    // accessible to the other functions:
    appPhotos = imagesFromServer;

    //clear out old cards (if there are any):
    document.querySelector('.cards').innerHTML = '';

    // create new ones (based on photos list)
    let i = 0;
    for (image of appPhotos) {
        const template = `
            <li class="card" data-index="${i}">
                <div class="image" style="background-image:url('${image.image_url}')"></div>
            </li>`;
        i++;
        document.querySelector('.cards').innerHTML += template;
    }
    attachEventHandlers();
};

const getImagesFromServer = () => {
    fetch(serverURL + 'photos')
        .then((response) => {
            return response.json();
        })
        .then(loadCardListView);
};

const buildUserMenu = (usersFromServer) => {
    //console.log(usersFromServer);
    //goal: append one option per user:
    const select = document.querySelector('#users');
    select.innerHTML = '';
    select.innerHTML = '<option value="-1">-- Filter by User --</option>';
    for (user of usersFromServer) {
        const template = `
            <option value="${user.id}">${user.username}</option>`;
        select.innerHTML += template;
    }
}

const getUsersFromServer = () => {
    fetch(serverURL + 'users')
        .then((response) => {
            return response.json();
        })
        .then(buildUserMenu);
};

const filterByUser = () => {
    fetch(serverURL + 'photos/?user_id=' + document.querySelector('#users').value)
        .then((response) => {
            return response.json();
        })
        .then(loadCardListView);
};

const likePhoto = () => {
    const photoID = getCurrentPhoto().id;
    const photo = appPhotos.find(function(element) {
      return element.id === parseInt(photoID);
    });
    photo.likes = photo.likes + 1;
    fetch(serverURL + 'photos/' + photoID, {
         method: 'PATCH',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             "likes": photo.likes
          })
        })
        .then((response) => {
            return response.json();
        })
        .then(data => {
          loadCardDetailView();
        });
};

const getCurrentPhoto = () => {
    return appPhotos[activeCardID];
};

const loadCardDetailView = () => {
    const container = document.querySelector('.preview_box');
    const photoItem = getCurrentPhoto();
    const imageURL = `url("${photoItem.image_url}")`;
    container.querySelector('.featured_image').style.backgroundImage = imageURL;
    container.querySelector('.caption').innerHTML = getPhotoDetailTemplate(photoItem);

    // update CSS:
    container.classList.add('active');
    document.querySelector('main').style.overflow = 'hidden';
    document.querySelector('#like').onclick = likePhoto;
};

const showPhotoDetail = (e) => {
    activeCardID = parseInt(e.target.parentElement.getAttribute('data-index'));
    loadCardDetailView();
};

const formatDate = (date) => {
    date = new Date(date)
    return date.toDateString();
};

const getPhotoDetailTemplate = (photoItem, comments) => {
    let template = `
        <h2 class="title">${photoItem.title}</h2>
        <p class="handle">@${photoItem.username}</p>
        <p class="likes"><button id="like">Like</button> ${photoItem.likes} Likes</p>
        <p class="date">${formatDate(photoItem.date)}</p>`;
    if (!comments) {
        return template;
    }
    template += `
    <div class="comments">
        <h3>Comments</h3>
    </div>`;
};

const hidePhoto = (e) => {
    const container = document.querySelector('.preview_box');
    container.classList.remove('active');
    document.querySelector('main').style.overflow = 'auto';
};

const showNextPhoto = (e) => {
    ++activeCardID;
    if (activeCardID >= appPhotos.length) { activeCardID = 0; }
    loadCardDetailView();
};

const showPreviousPhoto = (e) => {
    --activeCardID;
    if (activeCardID < 0) { activeCardID = appPhotos.length - 1; }
    loadCardDetailView();
};

const attachEventHandlers = () => {
    for (card of document.querySelectorAll('.image')) {
        card.onclick = showPhotoDetail;
    }
    document.querySelector('.close').onclick = hidePhoto;
    document.querySelector('.featured_image').onclick = showNextPhoto;
    // document.querySelector('.caption').onclick = showNextPhoto;
    document.querySelector('.next').onclick = showNextPhoto;
    document.querySelector('.prev').onclick = showPreviousPhoto;
    document.querySelector('#users').onchange = filterByUser;
};


// Initialize
getImagesFromServer();
getUsersFromServer();
