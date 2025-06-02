import React from "react";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner";
import EnrollmentCard from "../../components/cards/EnrollmentCard";
import { CourseGridContainer } from "../../styles";

const EnrollmentsCardsView = ({ isLoading, enrollments }) => {
    return (
        <div>
            {isLoading ? 
                <Spinner /> :
                <CourseGridContainer>
                    {enrollments?.map(enrollment => (
                        <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                </CourseGridContainer>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.enrollments.isLoading
    }
};

export default connect(mapStateToProps, null)(EnrollmentsCardsView);