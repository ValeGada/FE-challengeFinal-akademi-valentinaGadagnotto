import { DashboardContainer, Title, WelcomeText } from "../../styles";
import Statistics from "./Statistics";

const AdminDashboard = () => {
    return (
        <DashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver estadísticas, información sobre los usuarios y la plataforma.
            </WelcomeText>
            <Statistics />
        </DashboardContainer>
    );
};

export default AdminDashboard;