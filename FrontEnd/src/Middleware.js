
export  function authMiddleware (to, from, next) {

    // lấy token từ loacalstorage
    const token = localStorage.getItem('token');
    // const toast = createToast();
    if (!token) {
     
      // Nếu không có token, chuyển hướng người dùng đến trang đăng nhập hoặc trang khác.
      next('/login');
      
    } else {
      // Nếu có token, cho phép người dùng truy cập tuyến đường.
      next();
    }
  }