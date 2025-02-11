// ==================== كود السلايدر ====================
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== "/") return;

    fetch('/feeds/posts/default/-/Mens-Best?alt=json&max-results=10')
    .then(response => response.json())
    .then(data => {
        var posts = data.feed.entry;
        var sliderContent = document.getElementById("slider-content");
        var sliderContainer = document.getElementById("mens-best-slider");

        if (posts) {
            posts.forEach(post => {
                var title = post.title.$t;
                var link = post.link.find(l => l.rel === "alternate").href;
                var imgSrc = post.media$thumbnail ? post.media$thumbnail.url.replace("s72-c", "s800") : "https://via.placeholder.com/800";

                var slide = document.createElement("div");
                slide.className = "slide";
                slide.innerHTML = `
                    <a href="${link}">
                        <img src="${imgSrc}" alt="${title}">
                        <div class="slide-title">${title}</div>
                    </a>
                `;
                sliderContent.appendChild(slide);
            });

            sliderContainer.style.display = "block";
        }
    })
    .catch(error => console.error("Error fetching posts:", error));
});

// تحريك السلايدر بسرعة وسلاسة
var currentIndex = 0;

function moveSlide(dir) {
    var slider = document.querySelector(".slider");
    var slides = document.querySelectorAll(".slide");
    var totalSlides = slides.length;
    var slideWidth = slides[0].offsetWidth;

    currentIndex += dir;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalSlides - 4) currentIndex = totalSlides - 4;

    slider.style.transition = "transform 0.2s ease-out";
    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

// دعم اللمس مع تحسين السرعة والسلاسة
let startX = 0, endX = 0;

document.querySelector(".slider-container").addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
});

document.querySelector(".slider-container").addEventListener("touchmove", function(event) {
    endX = event.touches[0].clientX;
});

document.querySelector(".slider-container").addEventListener("touchend", function() {
    let diff = startX - endX;

    if (diff > 50) moveSlide(1); // السحب لليسار -> انتقال للصورة التالية
    else if (diff < -50) moveSlide(-1); // السحب لليمين -> انتقال للصورة السابقة
});

// ==================== كود التحكم في التصنيفات ====================
document.addEventListener("DOMContentLoaded", function() {
    const categoryList = document.getElementById('category-list');
    if (!categoryList) return;

    const path = window.location.pathname;
    const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

    // استخدام MutationObserver لمراقبة تغييرات DOM
    const observer = new MutationObserver(function() {
        if (currentCategory) {
            categoryList.style.display = 'flex';

            document.querySelectorAll('.category-item a').forEach(link => {
                if (link.getAttribute('data-category') !== currentCategory) {
                    link.parentElement.style.display = 'none'; // إخفاء غير التصنيف الحالي
                }
            });
        } else {
            categoryList.style.display = 'none';
        }
    });

    // تحديد المراقبة على التغييرات في DOM
    observer.observe(document.body, { childList: true, subtree: true });

    // تنفيذ الكود مباشرة في حال كان التصنيف موجودًا مباشرة
    if (currentCategory) {
        observer.disconnect(); // إيقاف المراقبة بعد تنفيذ الكود
        categoryList.style.display = 'flex';

        document.querySelectorAll('.category-item a').forEach(link => {
            if (link.getAttribute('data-category') !== currentCategory) {
                link.parentElement.style.display = 'none';
            }
        });
    }
});
