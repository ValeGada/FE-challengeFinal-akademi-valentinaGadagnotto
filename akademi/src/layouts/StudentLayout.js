import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import StudentNavbar from "../components/nav/StudentNavbar";
import StudentSidebar from "../components/nav/StudentSidebar";
import { LayoutContainer, ContentWrapper, MainContent } from "../styles";

const StudentLayout = ({ user, logout }) => {
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
            <StudentSidebar />
            <ContentWrapper>
                <StudentNavbar studentName={user.name} onLogout={handleLogout}>
                </StudentNavbar>
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

export default connect(mapStateToProps, { logout })(StudentLayout);
