import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    CourseCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardProfessor, 
    CourseCardButton 
} from "../../styles";

const CoursesCardsView = ({ course }) => {
    const navigate = useNavigate();
    const handleCourseView = () => {
        navigate(`/student/courses/${course.id}`)
    }

    return (
        <CourseCardContainer>
            <CourseCardTitle>{course.title}</CourseCardTitle>
            <CourseCardDescription>{course.description}</CourseCardDescription>
            <CourseCardProfessor>Prof. {course.professor.name}</CourseCardProfessor>
            <CourseCardButton onClick={handleCourseView}>Ver curso</CourseCardButton>
        </CourseCardContainer>
    );

};

export default CoursesCardsView;