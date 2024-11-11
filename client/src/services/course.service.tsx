import axios from "axios";
const API_USE = "http://localhost:8080/api/course";

class CourseService {
  post(title: string, description: string, price: number) {
    let token;
    const user = localStorage.getItem("user");

    if (user) {
      token = JSON.parse(user).token;
    } else {
      token = "";
    }
    return axios.post(
      API_USE,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }

  // 使用學生id 尋找學生修習的課程
  getEnrolledCourses(_id: string) {
    let token;
    const user = localStorage.getItem("user");

    if (user) {
      token = JSON.parse(user).token;
    } else {
      token = "";
    }

    return axios.get(API_USE + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  // 使用學生id 尋找學生修習的課程
  getCoursesByName(name: string) {
    let token;
    const user = localStorage.getItem("user");

    if (user) {
      token = JSON.parse(user).token;
    } else {
      token = "";
    }

    return axios.get(API_USE + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  enroll(_id: string) {
    let token;
    const user = localStorage.getItem("user");

    if (user) {
      token = JSON.parse(user).token;
    } else {
      token = "";
    }
    return axios.post(
      API_USE + "/enroll/" + _id,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }

  // 使用講師id 尋找講師所開設的課程
  get(_id: string) {
    let token;
    const user = localStorage.getItem("user");

    if (user) {
      token = JSON.parse(user).token;
    } else {
      token = "";
    }
    return axios.get(API_USE + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
