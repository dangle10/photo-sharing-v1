import models from '../modelData/models';

export default function fetchModel(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (url.endsWith("/test/info")) {
          resolve(models.schemaInfo());
        } 
        else if (url.endsWith("/user/list")) {
          resolve(models.userListModel());
        } 
        else if (url.includes("/user/")) {
          const id = url.split("/").pop(); 
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