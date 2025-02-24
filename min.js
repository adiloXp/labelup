document.addEventListener("DOMContentLoaded", function() {
    const categoryList = document.getElementById('category-list');
    if (!categoryList) return;

    const path = window.location.pathname;
    const currentCategory = path.includes('/search/label/') ? path.split('/search/label/')[1] : null;

    // استخدم requestAnimationFrame لضمان تحديث سلس لـ DOM
    requestAnimationFrame(() => {
        categoryList.classList.toggle('active', !!currentCategory);

        if (currentCategory) {
            let hiddenCount = 0;
            document.querySelectorAll('.category-item a').forEach(link => {
                const isMatch = link.getAttribute('data-category') === currentCategory;
                link.parentElement.style.display = isMatch ? 'block' : 'none';
                if (!isMatch) hiddenCount++;
            });

            if (hiddenCount === document.querySelectorAll('.category-item a').length) {
                categoryList.style.display = 'none'; // إخفاء إذا لم يكن هناك تصنيفات متوافقة
            }
        }
    });
});
