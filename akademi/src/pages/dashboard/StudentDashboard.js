import { DashboardContainer, Title, WelcomeText } from "../../styles";
import EnrollmentsList from "../enrollments/EnrollmentsList";

const StudentDashboard = () => {
    return (
        <DashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver tus cursos, calificaciones y novedades.
            </WelcomeText>
            <EnrollmentsList />
        </DashboardContainer>
    );
};

export default StudentDashboard;