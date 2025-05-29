import React from "react";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner";
import CourseCard from "./CourseCard";
import { CourseGridContainer } from "../../styles";

const CoursesCardsView = ({ isLoading, courses }) => {
    return (
        <div>
            {isLoading ? 
                <Spinner /> :
                <CourseGridContainer>
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </CourseGridContainer>
            }
        </div>
    );

};

const mapStateToProps = state => {
    return {
        isLoading: state.courses.isLoading
    }
};

export default connect(mapStateToProps, null)(CoursesCardsView);