import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../store/actions/coursesActions";
import { getUsers } from "../../store/actions/usersActions";
import { GenericTitle, GridContainer } from "../../styles";
import StatisticsCard from "../../components/cards/StatisticsCard";

const Statistics = ({ users, courses, getCourses, getUsers }) => {
    useEffect(() => {
        getUsers();
        getCourses();
    }, [getUsers, getCourses]);

    const totalCourses = courses.length;
    const totalUsers = users.length;
    const totalEnrollments = courses.reduce((acc, course) => acc + (course.enrollmentsCount || 0), 0);
    // reduce recorre courses
    // courses.reduce((acc = acumulador, c) => acumulador + suscr(si hay), desde dónde arranca el acumulador)

    return (
        <>
            <GenericTitle>Estadísticas Generales</GenericTitle>
            <GridContainer>
                <StatisticsCard 
                    title="Total de Usuarios" 
                    value={totalUsers} 
                    icon="👥" 
                />

                <StatisticsCard 
                    title="Total de Cursos" 
                    value={totalCourses} 
                    icon="📚" 
                />

                <StatisticsCard 
                    title="Total de Inscripciones" 
                    value={totalEnrollments}
                    icon="📝" 
                    />
            </GridContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        courses: state.courses.all,
        users: state.users.all
    }
};

export default connect(mapStateToProps, { getCourses, getUsers })(Statistics);