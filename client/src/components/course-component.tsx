import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { current_user, course_data } from "../types/types";
import CourseService from "../services/course.service";

interface CourseComponentProps {
  currentUser: current_user | undefined;
  setCurrentUser: Dispatch<SetStateAction<current_user | undefined>>;
}

const CourseComponent: React.FC<CourseComponentProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [courseData, setCourseData] = useState<course_data[]>();

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您需要先登入才能查看您的課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          ></button>
        </div>
      )}
      {currentUser && currentUser.user.role == "insturctor" && (
        <div>
          <h1>歡迎來到講師課程頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course: course_data) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
                key={course._id}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱：{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數：{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格：{course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
