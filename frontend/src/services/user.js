import api from './api'


const getAll = () => {
    return api.get("/api/user");
  };
  
  const get = id => {
    return api.get(`/api/user/${id}/`);
  };
  
  const getCurrentUser = () => {
    return api.get(`/api/current_user/`);
  };

  const create = async data => {
    return api.post("/api/user/", data);
  };
  
  const update = async (id, data) => {
    return api.patch(`/api/user/${id}/`, data);
  };
  
  const remove = async id => {
    return api.delete(`/api/user/${id}/`);
  };
  
  
export const userService = {
    getAll,
    get,
    getCurrentUser,
    create,
    update,
    remove
};