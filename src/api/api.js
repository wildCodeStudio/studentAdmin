import Axios from "axios";
// 获取所有学生
export let getAll = () => {
  return Axios.post("http://132.232.89.22:8998/allstudent");
  // return Axios.post("http://localhost:8998/allstudent");
};
// 所有学生分页操作
export let getAllPage = page => {
  return Axios.post("http://132.232.89.22:8998/allstudentPage", { page: page });
  // return Axios.post("http://localhost:8998/allstudentPage", { page: page });
};
// 向所有学生表中添加一项
export let addAllStudent = studentlist => {
  return Axios.post("http://132.232.89.22:8998/addallStudent", {
    ...studentlist
  });
  // return Axios.post("http://localhost:8998/addallStudent", {
  //   ...studentlist
  // });
};
// 向所有学生表中删除一项
export let delAllStudent = _id => {
  return Axios.post("http://132.232.89.22:8998/delallStudent", { id: _id });
  // return Axios.post("http://localhost:8998/delallStudent", { id: _id });
};
