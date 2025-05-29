import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import AdminNavbar from "../components/nav/AdminNavbar";
import { AdminLayoutContainer, ContentWrapper, MainContent } from "../styles";

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
        <AdminLayoutContainer>
            <ContentWrapper>
                <AdminNavbar adminName={user.name} onLogout={handleLogout}>
                </AdminNavbar>
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </AdminLayoutContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logout })(AdminLayout);
