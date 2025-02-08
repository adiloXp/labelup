document.addEventListener("DOMContentLoaded", function() {
  const categoryList = document.getElementById('category-list');
  if (!categoryList) return;

  const path = window.location.pathname;

  // إخفاء القائمة بشكل افتراضي
  categoryList.style.display = 'none';

  function showCategory(category) {
    document.querySelectorAll('.category-item').forEach(item => {
      const link = item.querySelector('a');
      if (link.getAttribute('data-category') !== category) {
        item.style.display = 'none';
      }
    });
  }

  // عرض التصنيف المناسب بناءً على المسار
  if (path.includes('/search/label/women')) {
    categoryList.style.display = 'flex';
    showCategory('women');
  } else if (path.includes('/search/label/best')) {
    categoryList.style.display = 'flex';
    showCategory('best');
  } else if (path.includes('/search/label/home')) {
    categoryList.style.display = 'flex';
    showCategory('home');
  } else if (path.includes('/search/label/beauty')) {
    categoryList.style.display = 'flex';
    showCategory('beauty');
  }

  // جعل التصنيفات تفتح القسم عند النقر
  document.querySelectorAll('.category-item a').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // منع السلوك الافتراضي
      window.location.href = link.href; // إعادة توجيه المستخدم إلى التصنيف
    });
  });
});
