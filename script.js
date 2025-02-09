document.addEventListener("DOMContentLoaded", function() {
  const categoryList = document.getElementById('category-list');
  if (!categoryList) return;

  const path = window.location.pathname;
  const currentCategory = path.split('/search/label/')[1]; // استخراج اسم التصنيف من الرابط

  if (currentCategory) {
    categoryList.style.display = 'flex'; // إظهار القائمة عند وجود تصنيف
    categoryList.style.padding = '0.3em'; // إعادة إضافة الـ padding
    categoryList.style.margin = '1em 0 0'; // إعادة إضافة الـ margin
    document.querySelectorAll('.category-item a').forEach(link => {
      // تحقق من التصنيف ومقارنته مع التصنيف الحالي في الرابط
      if (link.getAttribute('data-category') !== currentCategory) {
        link.parentElement.style.display = 'none'; // إخفاء العناصر غير المتطابقة
      }
    });
  } else {
    categoryList.style.display = 'none'; // إخفاء القائمة إذا لم يكن هناك تصنيف
    categoryList.style.padding = '0'; // إخفاء الـ padding إذا لم يكن هناك تصنيف
    categoryList.style.margin = '0'; // إخفاء الـ margin إذا لم يكن هناك تصنيف
  }
});
