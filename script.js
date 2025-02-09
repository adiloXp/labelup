document.addEventListener("DOMContentLoaded", function() {
  const categoryList = document.getElementById('category-list');
  if (!categoryList) return;

  const path = window.location.pathname;

  // إظهار القائمة فقط في الصفحة الرئيسية
  if (path === '/' || path === '/index.html' || path === '/home') {
    categoryList.style.display = 'flex';
  } else {
    categoryList.style.display = 'none'; // إخفاء القائمة في الصفحات الأخرى
  }

  const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

  if (currentCategory) {
    document.querySelectorAll('.category-item a').forEach(link => {
      if (link.getAttribute('data-category') !== currentCategory) {
        link.parentElement.style.display = 'none'; // إخفاء العناصر غير المتطابقة
      }
    });
  }
});
