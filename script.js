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
