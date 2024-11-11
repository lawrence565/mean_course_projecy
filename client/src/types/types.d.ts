export type current_user = {
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };
};

export type course_data = {
  title: string;
  description: string;
  price: number;
  student: string[];
  instructor: string;
};
