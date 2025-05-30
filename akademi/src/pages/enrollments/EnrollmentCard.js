import React from "react";
import { 
    CourseCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardProfessor
} from "../../styles";

const CoursesCardsView = ({ enrollment }) => {
    return (
        <CourseCardContainer>
            <CourseCardTitle>{enrollment.course.title}</CourseCardTitle>
            <CourseCardDescription>{enrollment.student.receivedGrades}</CourseCardDescription>
            <CourseCardProfessor>Prof. {enrollment.course.professor.name}</CourseCardProfessor>
        </CourseCardContainer>
    );

};

export default CoursesCardsView;