import { DashboardContainer, Title, WelcomeText } from "../../styles";

const StudentDashboard = () => {
    return (
        <DashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver tus cursos, calificaciones y novedades.
            </WelcomeText>
        </DashboardContainer>
    );
};

export default StudentDashboard;