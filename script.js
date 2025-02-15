document.addEventListener("DOMContentLoaded", function() {
    const categoryList = document.getElementById('category-list');
    if (!categoryList) return;

    const path = window.location.pathname;
    const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

    if (currentCategory) {
        categoryList.style.display = 'flex'; // إظهار قائمة التصنيفات

        // إخفاء العناصر غير المرتبطة بالتصنيف الحالي
        document.querySelectorAll('.category-item a').forEach(link => {
            if (link.getAttribute('data-category') !== currentCategory) {
                link.parentElement.style.display = 'none';
            }
        });
    } else {
        categoryList.style.display = 'none'; // إخفاء القائمة إذا لم يكن هناك تصنيف محدد
    }
});
