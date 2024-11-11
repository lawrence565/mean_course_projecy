export type current_user = {
  message: string;
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };
};

export type course_data = {
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  students: string[];
};

export interface CourseComponentProps {
  currentUser: current_user | undefined;
  setCurrentUser: Dispatch<SetStateAction<current_user | undefined>>;
}
