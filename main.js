var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');

var websiteList = [];

if (localStorage.getItem('sites') != null) {
    websiteList = JSON.parse(localStorage.getItem('sites'));
    display();
}

function addSite() {
    var site = {

        sname: siteName.value,
        surl: siteURL.value

    }

    if (siteURL.value.includes('https://') == false) {
        site.surl = "https://" + siteURL.value;
    };

    if (localStorage.getItem('sites').includes(siteName.value) == true ||
        localStorage.getItem('sites').includes(siteURL.value) == true
    ) {
        toggle();
        document.getElementById("alert").innerHTML = 'This site is already exist.';
        clearSite();

    }
    else {
        reToggle();
        websiteList.push(site);
        console.log(websiteList);
        localStorage.setItem('sites', JSON.stringify(websiteList));
        display();
        clearSite();
    }

}

function clearSite() {

    siteName.value = '';
    siteURL.value = '';
}

function display() {

    var websites = '';

    for (var i = 0; i < websiteList.length; i++) {

        websites += `
        <div class="website row flex-wrap">
            <h2 class="text-capitalize">${websiteList[i].sname}</h2>
            <a href="${websiteList[i].surl} " class="btn btn-primary mx-3" target="_blank" id="">visit</a>
            <button onclick="deleteSite(${i});" class="btn btn-danger">delete</button>
        </div>
        `
    }

    document.getElementById('bookMarkList').innerHTML = websites;
}

function deleteSite(deleteIndex) {

    websiteList.splice(deleteIndex, 1);
    localStorage.setItem('sites', JSON.stringify(websiteList));
    display();
}

function toggle() {
    var element = document.getElementById('alert');

    if (element) {
        var eDisplay = element.style.display;

        if (eDisplay == 'none') {
            element.style.display = 'block';
        }
    }
}

function reToggle() {
    var reElement = document.getElementById('alert');

    if (reElement) {
        var reDisplay = reElement.style.display;

        if (reDisplay == 'block') {
            reElement.style.display = 'none';
        }
    }
}