let articlesContainer = document.querySelector("#articles");
let countryLinks = document.querySelectorAll("nav .nav-link");
let categoryLinks = document.querySelectorAll(".category .nav-link");
let currentCategory = "sports";
let countryCode = "eg";

async function getNews(countryCode, category) {
  try {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=e990c9bc6e654be2a9ee1e00147fd083`
    );
    let result = await response.json();
    displayArticles(result.articles);
    return result.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayArticles(arrOfArticles) {
    let articlesHTML = "";
    if (arrOfArticles && Array.isArray(arrOfArticles)) {
        arrOfArticles.forEach((article) => {
        let author = article.author ? article.author : "Unknown";
        let imgSrc = article.urlToImage
            ? article.urlToImage
            : "https://via.placeholder.com/150";
        let description = article.description
            ? article.description.split(" ").slice(0, 5).join(" ")
            : "No description";
        let truncatedTitle = article.title
            ? article.title.split(" ").slice(0, 5).join(" ")
            : "Untitled";

        articlesHTML += `
                    <article class="col-md-12 col-lg-4 p-2">
                        <div class="inner p-3 rounded-2 shadow">
                            <h2 class="h5" id="title">${truncatedTitle}</h2>
                            <p class="mt-2">${description}</p>
                            <img class="w-100 my-2" src="${imgSrc}">
                            <h5 class="author text-capitalize">${author}</h5>
                            <a class="link" target="_blank" href="${article.url}">Read More</a>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="source">${article.source.name}</span>
                                <span class="date">${article.publishedAt}</span>
                            </div>
                        </div>
                    </article>`;
        });
    } else {
        articlesHTML = "<p>No articles found.</p>";
    }

    articlesContainer.innerHTML = articlesHTML;
}

countryLinks.forEach((countryLink) => {
  countryLink.addEventListener("click", async function (e) {
    countryCode = e.target.dataset.code;
    countryLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
    await getNews(countryCode, currentCategory);
  });
});

categoryLinks.forEach((categoryLink) => {
  categoryLink.addEventListener("click", async function (e) {
    currentCategory = e.target.dataset.category;
    categoryLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
    await getNews(countryCode, currentCategory);
  });
});

getNews(countryCode, currentCategory);
