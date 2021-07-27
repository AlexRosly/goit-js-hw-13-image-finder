import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import photoCard from '../templetes/photo-card.hbs'
import API from './api-servise.js';
import getRefs from './get-refs.js';


const resf = getRefs();

hideLoadMoreBtn();

resf.searchForm.addEventListener('submit', onSearch);
resf.loadMoreBtn.addEventListener('click', onLoadMore);
resf.galleryContainer.addEventListener('click', onCardClick);

let page = 1;
let perPage = 40;
let searchQuery = "";

function onSearch(e) {

    e.preventDefault();
    hideLoadMoreBtn();
    clearMarkUp();

    searchQuery = e.currentTarget.elements.searchQuery.value;
    resetPage();

    if (searchQuery.trim('') === '') {
        return;
    }

    API.fetchImage(searchQuery, page, perPage)
        .then(hits => {
            if (hits.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else if (hits.totalHits > 0) {
                renderImageCard(hits, photoCard);
                Notiflix.Notify.info(`'Hooray! We foound ${hits.totalHits} images'`);
            }
        })
        .catch((Error) => {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        });
}


function renderImageCard (hits, templete) {
    const markupImageCard = templete(hits);
    resf.galleryContainer.insertAdjacentHTML('beforeend', markupImageCard);
    showLoadMoreBtn();
}

function onLoadMore() {
    hideLoadMoreBtn();
    page += 1;

    API.fetchImage(searchQuery, page, perPage)
        .then(hits => {
            const totalPage = hits.totalHits / perPage;
            if (page > totalPage) {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                hideLoadMoreBtn();
            } else {
                renderImageCard(hits, photoCard);
                const { height: cardHeight } = document
                    .querySelector('.gallery')
                    .firstElementChild.getBoundingClientRect();

                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });
            }
        })
        .catch(Error => {
            
        });
    var gallery = $('.gallery a').simpleLightbox();
    gallery.refresh();
}

function clearMarkUp () {
    resf.galleryContainer.innerHTML = '';
}

function resetPage() {
    page = 1;
}

function hideLoadMoreBtn() {
    resf.loadMoreBtn.style.display= 'none';
}

function showLoadMoreBtn() {
    resf.loadMoreBtn.style.display= 'block';
}


function onCardClick(e) {

    e.preventDefault();

    const galleryImgEl = e.target;
    if (galleryImgEl.nodeName !== 'IMG') {
        return;
    }
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {
    });
}