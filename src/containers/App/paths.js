const paths = {
  Login: '/',
  ListExam: '/exams',
  Homepage: (examId) => `/exam/start/${examId || "examId"}`,
  Admin: '/admin',
  AdminDash: '/admin/dashboard',
  AdminExam: '/admin/exam',
  AdminQuestion: '/admin/questions',
  AdminUsers: '/admin/users',
};

export default paths;
