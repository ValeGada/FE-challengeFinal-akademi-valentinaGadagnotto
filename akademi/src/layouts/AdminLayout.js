import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import AdminNavbar from "../components/nav/AdminNavbar";
import AdminSidebar from "../components/nav/AdminSidebar";
import { LayoutContainer, ContentWrapper, MainContent } from "../styles";

const AdminLayout = ({ user, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <LayoutContainer>
            <AdminSidebar />
            <ContentWrapper>
                <AdminNavbar adminName={user.name} onLogout={handleLogout}>
                </AdminNavbar>
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </LayoutContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logout })(AdminLayout);
