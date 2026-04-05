import models from '../modelData/models';

/**
 * Hàm fetchModel giả lập việc gọi API qua mạng.
 * Dùng setTimeout để tạo độ trễ (delay) giống hệt như đang tải từ Server thật.
 */
export default function fetchModel(url) {
  return new Promise((resolve, reject) => {
    // Độ trễ 500ms (nửa giây) để bạn kịp nhìn thấy chữ "Loading..."
    setTimeout(() => {
      try {
        if (url.endsWith("/test/info")) {
          resolve(models.schemaInfo());
        } 
        else if (url.endsWith("/user/list")) {
          resolve(models.userListModel());
        } 
        else if (url.includes("/user/")) {
          const id = url.split("/").pop(); // Lấy ID ở cuối đường dẫn
          const user = models.userModel(id);
          if (user) resolve(user);
          else reject(new Error("Không tìm thấy user"));
        } 
        else if (url.includes("/photosOfUser/")) {
          const id = url.split("/").pop();
          const photos = models.photoOfUserModel(id);
          if (photos) resolve(photos);
          else reject(new Error("Không tìm thấy ảnh"));
        } 
        else {
          reject(new Error("URL không hợp lệ"));
        }
      } catch (error) {
        reject(error);
      }
    }, 500); 
  });
}