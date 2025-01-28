document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    let currentPage = 1;
    const newsPerPage = 6;
    const newsGrid = document.getElementById('news-grid');
    const loadMoreBtn = document.getElementById('load-more');
    const hidePostsBtn = document.getElementById('hide-posts');
    let visiblePosts = newsPerPage;

    const newsData = [
        {
            categories: ['Finance'],
            title: 'The EU is pushing for a digital euro to counter Trump’s promotion of U.S.-backed stablecoins.',
            content: 'The European Central Bank (ECB) is accelerating its digital euro plans following Trump’s executive order promoting private-sector dollar-pegged stablecoins. ',
            date: '2025-01-26',
            twitterLink: 'https://x.com/Antonio02137195/status/1883523056167272645'
        },
        {
            categories: ['Tech'],
            title: 'Tesla unveil the new Model Y',
            content: 'Tesla has unveiled the new Model Y. A fresh new look and a lot of new features!',
            date: '2025-01-24',
            twitterLink: 'https://x.com/Tesla/status/1882595585993376179'
        },
        {
            categories: ['Tech'],
            title: 'OpenAI just launched the first AI AGENT!',
            content: 'Is called Operator and is capable of doing work for you independently—you give it a task and it will execute it. ',
            date: '2025-01-23',
            twitterLink: 'https://x.com/OpenAI/status/1882509286439637448'
        },
        {
            categories: ['Blockchain', 'Finance'],
            title: 'President Trump speach about crypto',
            content: 'President Donald Trump at Davos said he will make the United States the “World Capital of Artificial Intelligence and Crypto.”',
            date: '2025-01-20',
            twitterLink: 'https://x.com/Antonio02137195/status/1882742927992181062'
        },
        {
            categories: ['Tech'],
            title: 'Spacex chatces starship booster in mid-air for the second time in a row',
            content: 'Spacex demostrate that they can replicate the success of the catch of the booster in mid-air!',
            date: '2025-01-16',
            twitterLink: 'https://x.com/SpaceX/status/1880024050048589841'
        },
        {
            categories: ['Tech'],
            title: 'Tesla is a sleeping giant',
            content: 'We are very close to FSD (Full serlf driving). Why are people sleeping on it?',
            date: '2024-09-05',
            twitterLink: 'https://x.com/Tesla_AI/status/1831565197108023493'
        },
        {
            categories: ['Tech', 'Finance'],
            title: 'Tesla stock is undervalued right now',
            content: 'I believe Tesla stock is currently undervalued, with major catalysts coming in 2025 including Cybertruck ramp, $25K platform, FSD expansion, energy growth, and Optimus development. (Not financial advice - stock performance depends on market factors',
            date: '2024-01-20',
            twitterLink: 'https://x.com/Antonio02137195/status/1882742927992181062'
        },
    ];

    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-category');
            
            loadNews(false, visiblePosts);
        });
    });

    function createNewsCard(news, index) {
        const delay = (index % newsPerPage) * 100;
        return `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card">
                    <div class="card-body">
                        <div class="category-container">
                            ${news.categories.map(cat => `<span class="category-badge">${cat}</span>`).join(' ')}
                        </div>
                        <h3 class="card-title">${news.title}</h3>
                        <p class="card-text">${news.content}</p>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-content">
                            <span class="post-date">${formatDate(news.date)}</span>
                            <a href="${news.twitterLink}" class="social-link" target="_blank">
                                <i class="bi bi-twitter-x"></i>
                                View on X
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function loadNews(append = false, limit = newsPerPage) {
        const filteredNews = currentFilter === 'all' 
            ? newsData 
            : newsData.filter(news => news.categories.includes(currentFilter));

        const newsToShow = filteredNews.slice(0, limit);
        const newsHTML = newsToShow.map((news, index) => createNewsCard(news, index)).join('');
        
        if (append) {
            newsGrid.insertAdjacentHTML('beforeend', newsHTML);
        } else {
            newsGrid.innerHTML = newsHTML;
        }

        AOS.refresh();

        loadMoreBtn.style.display = limit >= filteredNews.length ? 'none' : 'inline-block';
        hidePostsBtn.style.display = limit > newsPerPage ? 'inline-block' : 'none';
    }

    hidePostsBtn.addEventListener('click', () => {
        visiblePosts = newsPerPage;
        loadNews(false, visiblePosts);
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    loadMoreBtn.addEventListener('click', () => {
        visiblePosts += newsPerPage;
        loadNews(false, visiblePosts);
    });


    loadNews();
});