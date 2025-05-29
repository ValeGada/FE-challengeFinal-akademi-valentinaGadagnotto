import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import ProfessorNavbar from "../components/nav/ProfessorNavbar";
import { ProfessorLayoutContainer, ContentWrapper, MainContent } from "../styles";

const ProfessorLayout = ({ user, logout }) => {
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
        <ProfessorLayoutContainer>
            <ContentWrapper>
                <ProfessorNavbar professorName={user.name} onLogout={handleLogout}>
                </ProfessorNavbar>
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </ProfessorLayoutContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logout })(ProfessorLayout);
