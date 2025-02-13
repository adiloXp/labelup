document.addEventListener("DOMContentLoaded", function () {
    // الكود الخاص بالسلايدر
    if (window.location.pathname === "/") {
        fetch('/feeds/posts/default/-/Mens-Best?alt=json&max-results=10')
            .then(response => response.json())
            .then(data => {
                var posts = data.feed.entry;
                var sliderContent = document.getElementById("slider-content");
                var sliderContainer = document.getElementById("mens-best-slider");

                if (posts && sliderContent && sliderContainer) {
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

        // تحريك السلايدر بسرعة وسلاسة
        var currentIndex = 0;

        function moveSlide(dir) {
            var slider = document.querySelector(".slider");
            var slides = document.querySelectorAll(".slide");

            if (slides.length === 0) return; // تفادي الخطأ إذا لم يتم تحميل الشرائح

            var totalSlides = slides.length;
            var slideWidth = slides[0].offsetWidth;

            currentIndex += dir;
            currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - visibleSlides())); // الحد من الحركة الزائدة

            slider.style.transition = "transform 0.3s ease-out";
            slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        }

        function visibleSlides() {
            // تحديد عدد الشرائح التي يجب عرضها بناءً على عرض الشاشة
            if (window.innerWidth <= 768) return 3; // عرض 3 شرائح في الهواتف
            else return 4; // عرض 4 شرائح على الشاشات الأكبر
        }

        // دعم اللمس مع تحسين السرعة والسلاسة
        let startX = 0, endX = 0;
        let sliderContainer = document.querySelector(".slider-container");

        if (sliderContainer) {
            sliderContainer.addEventListener("touchstart", function (event) {
                startX = event.touches[0].clientX;
            });

            sliderContainer.addEventListener("touchmove", function (event) {
                endX = event.touches[0].clientX;
            });

            sliderContainer.addEventListener("touchend", function () {
                let diff = startX - endX;

                if (diff > 50) moveSlide(1); // السحب لليسار -> انتقال للصورة التالية
                else if (diff < -50) moveSlide(-1); // السحب لليمين -> انتقال للصورة السابقة
            });
        }
    }

    // الكود الخاص بعرض التصنيفات
    const categoryList = document.getElementById('category-list');
    if (categoryList) {
        const path = window.location.pathname;
        const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

        // استخدام MutationObserver لمراقبة تغييرات DOM
        const observer = new MutationObserver(function () {
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
    }
});
