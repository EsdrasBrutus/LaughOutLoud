import axios from "axios";

const API = axios.create({
	baseURL: "https://laughoutloudapp.herokuapp.com",
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const fetchPosts = async (page) => {
	const res = await API.get(`/posts?page=${page}`);
	return res.data;
};

export const fetchPost = async (id) => {
	const res = await API.get(`/posts/${id}`);
	return res.data;
};

export const createPost = async (newPost) => {
	const res = await API.post("/posts", newPost);
	return res.data;
};

export const updatePost = async (id, post) => {
	const res = await API.patch(`/posts/${id}`, post);
	return res.data;
};

export const deletePost = async (id) => {
	const res = await API.delete(`/posts/${id}`);
	return res.data;
};

export const likePost = async (id, post) => {
	const res = await API.patch(`/posts/${id}/upvote`, post);
	return res.data;
};

export const signIn = (formData) => {
	const res = API.post("/users/signin", formData);
	return res;
};

export const signUp = async (formData) => {
	const res = await API.post("/users/signup", formData);
	return res.data;
};

export const fetchPostsBySearch = async (searchQuery) => {
	const res = await API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);
	return res;
};
