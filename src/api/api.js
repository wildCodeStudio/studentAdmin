import Axios from "axios";
// 所有学生分页操作
export let getAllPage = page => {
  // return Axios.post("http://132.232.89.22:8998/allstudentPage", { page: page });
  return Axios.post("http://localhost:8998/allstudentPage", { page: page });
};
// 向所有学生表中添加一项
export let addAllStudent = studentlist => {
  // return Axios.post("http://132.232.89.22:8998/addallStudent", {
  //   ...studentlist
  // });
  return Axios.post("http://localhost:8998/addallStudent", {
    ...studentlist
  });
};
// 向所有学生表中删除一项
export let delAllStudent = _id => {
  // return Axios.post("http://132.232.89.22:8998/delallStudent", { id: _id });
  return Axios.post("http://localhost:8998/delallStudent", { id: _id });
};
// 向所有学生表中修改一项
export let updateAllStudent = (_id, obj) => {
  // return Axios.post("http://132.232.89.22:8998/updateAllstud", {
  //   id: _id,
  //   upstud: obj
  // });
  return Axios.post("http://localhost:8998/updateAllstud", {
    id: _id,
    upstud: obj
  });
};
// 向所有学生表中按不同条件查询一项
export let selectAllstud = (page, obj) => {
  // return Axios.post("http://132.232.89.22:8998/selectAllstud", {
  //   page: page,
  //   obj: obj
  // });
  return Axios.post("http://localhost:8998/selectAllstud", {
    page: page,
    obj: obj
  });
};
