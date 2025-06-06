import { DashboardContainer, Title, WelcomeText } from "../../styles";
import CoursesList from "../courses/CoursesList";

const ProfessorDashboard = () => {
    return (
        <DashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver tus cursos, calificaciones y novedades.
            </WelcomeText>
            <CoursesList />
        </DashboardContainer>
    );
};

export default ProfessorDashboard;