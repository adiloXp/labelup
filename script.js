document.addEventListener("DOMContentLoaded", function() {
  const categoryList = document.getElementById('category-list');
  if (!categoryList) return;

  const path = window.location.pathname;
  const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

  // إذا كان الرابط يحتوي على تصنيف (مثل /search/label/{category})
  if (currentCategory) {
    categoryList.style.display = 'flex'; // إظهار القائمة
    document.querySelectorAll('.category-item a').forEach(link => {
      // تحقق من التصنيف ومقارنته مع التصنيف الحالي في الرابط
      if (link.getAttribute('data-category') !== currentCategory) {
        link.parentElement.style.display = 'none'; // إخفاء العناصر غير المتطابقة
      }
    });
  } else {
    categoryList.style.display = 'none'; // إخفاء القائمة إذا لم يكن هناك تصنيف
  }
});
