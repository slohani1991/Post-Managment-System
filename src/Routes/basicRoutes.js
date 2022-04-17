import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Container/Dashboard/dashboard";
import Posts from "../Container/Posts/posts";
import PostDetail from "../Component/PostDetail/postDetails";
import Modal from "../Component/PostModal/modal";
import Login from "../Component/Login/login";
import { useSelector } from "react-redux";

const BasicRoutes = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Routes>
            <Route path="/" element={(isAuthenticated) ? <Dashboard /> : <Login />}></Route>
            <Route path="/login" element={(isAuthenticated) ? <Dashboard /> : <Login />}></Route>
            <Route path="/dashboard" element={(isAuthenticated) ? <Dashboard /> : <Login />} />
            <Route path="/postRedirect" element={<Navigate replace to={"/posts"} />} />
            <Route path="/posts" element={(isAuthenticated) ? <Posts /> : <Login />}>
                <Route path=":postId" element={(isAuthenticated) ? <PostDetail /> : <Login />}></Route>
            </Route>
            <Route path="/add-post" element={<Modal />}></Route >
        </Routes>
    );
};
export default BasicRoutes;
