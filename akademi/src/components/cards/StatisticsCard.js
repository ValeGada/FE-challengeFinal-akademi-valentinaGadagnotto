import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    CourseCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardButton,
    CardButtonsContainer,
} from "../../styles";

const StatisticsCard = ({ title, value, icon }) => {
    const navigate = useNavigate();
    const handleEachView = () => {
        if (title === 'Total de Cursos') {
            navigate('/admin/courses/');
        } else if (title === 'Total de Usuarios') {
            navigate('/admin/users/');
        };
    };

    const handleCoursesView = () => {
        navigate('/admin/courses/');
    };

    return (
        <CourseCardContainer>
            <CourseCardTitle>{icon} {title}</CourseCardTitle>
            <CourseCardDescription>{value}</CourseCardDescription>
            <CardButtonsContainer>
                {title === 'Total de Inscripciones' ? 
                    <CourseCardButton onClick={handleCoursesView}>Ver cursos</CourseCardButton> :
                    <CourseCardButton onClick={handleEachView}>Ver más</CourseCardButton>
                }
            </CardButtonsContainer>
        </CourseCardContainer>
    );

};

export default StatisticsCard;