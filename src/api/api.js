import Axios from "axios";
// 获取所有学生
export let getAll = () => {
  return Axios.post("http://localhost:8998/allstudent");
};
// 所有学生分页操作
export let getAllPage = page => {
  return Axios.post("http://localhost:8998/allstudentPage", { page: page });
};
// 向所有学生表中添加一项
export let addAllStudent = studentlist => {
  return Axios.post("http://localhost:8998/addallStudent", {
    ...studentlist
  });
};
// 向所有学生表中删除一项
export let delAllStudent = _id => {
  return Axios.post("http://localhost:8998/delallStudent", { id: _id });
};

// 获取所有班主任
export let getHeadTeacher = () => {
  return Axios.get("http://localhost:8998/getHeadTeacher");
};
// 添加一条班主任
export let addHeadTeacher = (list) => {
  return Axios.post("http://localhost:8998/addHeadTeacher", {
    ...list
  });
};
// 删除一条班主任
export let delHeadTeacher = (id) => {
  return Axios.post("http://localhost:8998/delHeadTeacher", { _id: id });
};
// 获取所有市场部
export let getMarket = () => {
  return Axios.get("http://localhost:8998/getMarket");
};
// 获取所有班级
export let getClass = () => {
  return Axios.get("http://localhost:8998/getClass");
};
// 销毁一个班级
export let delClass = (id) => {
  return Axios.post("http://localhost:8998/delClass", { _id: id });
};
// 创建班级
export let createClass = (data) => {
  return Axios.post("http://localhost:8998/createClass", data);
};
// 修改班级
export let updateClass = (data) => {
  return Axios.post("http://localhost:8998/updateClass", data);
};