import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    CourseCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardCapacity,
    CourseCardProfessor, 
    CourseCardButton 
} from "../../styles";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const handleCourseView = () => {
        navigate(`/student/courses/${course.id}`)
    }

    return (
        <CourseCardContainer>
            <CourseCardTitle>{course.title}</CourseCardTitle>
            <CourseCardDescription>{course.description}</CourseCardDescription>
            <CourseCardCapacity>Suscripciones: {course.enrollmentsCount} / {course.maximumCapacity}</CourseCardCapacity>
            <CourseCardProfessor>Prof. {course.professor.name}</CourseCardProfessor>
            <CourseCardButton onClick={handleCourseView}>Ver curso</CourseCardButton>
        </CourseCardContainer>
    );

};

export default CourseCard;