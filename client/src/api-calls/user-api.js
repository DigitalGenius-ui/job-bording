import { API } from "../config/api-client";

// get all users
export const getCurrentUser = async () => {
  try {
    const res = await API.get(`/user`);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// get all users
export const allUsers = async () => {
  try {
    const res = await API.get(`/user/allUsers`);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// get single user
export const singleUser = async (id) => {
  try {
    const res = await API.get(`/user/${id}`);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// get user profile
export const userProfile = async (id) => {
  try {
    const res = await API.get(`/user/userProfile/${id}`);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

//update user profile
export const updateUserProfile = async (data) => {
  try {
    const res = await API.post(`/user/updateUserProfile`, data);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

//update user profile
export const uploadProfileImg = async (data) => {
  try {
    const res = await API.post(`/user/uploadProfileImg`, data);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// update users
export const updateUser = async (data) => {
  // upload profile image
  if (data.userProfile) {
    const form = new FormData();
    const imageName = Date.now() + data.userProfile.name;
    form.append("name", imageName);
    form.append("file", data.userProfile);
    data.profile.userProfile = imageName;
    try {
      await API.post("/upload", form);
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }
  // upload resume
  if (data.resume) {
    const form = new FormData();
    const filename = Date.now() + data.resume.name;
    form.append("name", filename);
    form.append("file", data.resume);
    data.profile.resume = filename;
    try {
      await API.post("/upload", form);
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }

  try {
    const res = await API.put(
      `/user/update/${data?.profile?._id}`,
      data.profile
    );
    return res.data.updatedUser;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// update users
export const updateUserPassword = async (data) => {
  try {
    const res = await API.post(`/user/changeUserPassword`, data);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// download resume
export const downloadResume = async (id) => {
  try {
    const res = await API.get("/user/download/" + id, {
      responseType: "blob",
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// remove resume
export const removeResume = async (id) => {
  try {
    await API.delete("/user/removeResume/" + id);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
