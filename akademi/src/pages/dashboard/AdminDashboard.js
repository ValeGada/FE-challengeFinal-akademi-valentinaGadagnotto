import { AdminDashboardContainer, Title, WelcomeText } from "../../styles";

const AdminDashboard = () => {
    return (
        <AdminDashboardContainer>
            <Title>Mi Panel</Title>
            <WelcomeText>
                ¡Hola! Desde aquí podés ver estadísticas, información sobre los usuarios y la plataforma.
            </WelcomeText>
        </AdminDashboardContainer>
    );
};

export default AdminDashboard;