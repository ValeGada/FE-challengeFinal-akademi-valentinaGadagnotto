import { DashboardContainer, Title, WelcomeText } from "../../styles";

const AdminDashboard = () => {
    return (
        <DashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver estadísticas, información sobre los usuarios y la plataforma.
            </WelcomeText>
        </DashboardContainer>
    );
};

export default AdminDashboard;