import store from "../store";
import { http } from "./HttpService";
import jwt from "jsonwebtoken";

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token != null;
}

export function login(user) {
  return http()
    .post("/admin/auth", user)
    .then(res => {
      if (res.data.token) {
        setToken(res.data.token);
      }
    });
}

export function logout() {
  localStorage.clear();
  store.dispatch("authenticate");
}

function setToken(token) {
  localStorage.setItem("token", token);
  store.dispatch("authenticate");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUsername() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.user.name;
}

export function getUserId() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.user.id;
}

export function getAdminSign() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.user.is_admin;
}

function decodeToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwt.decode(token);
}

export function deleteProfile(id) {
  return http().delete(`/admin/profile/delete/${id}`);
}

export function deletePost(id) {
  return http().delete(`/admin/post/delete/${id}`);
}

export function deleteCommentPost(id, comment_Id) {
  return http().delete(`/admin/posts/deletecomment/${id}/${comment_Id}`);
}

export function adminDashboard() {
  return http().get(`/admin/home`);
}
