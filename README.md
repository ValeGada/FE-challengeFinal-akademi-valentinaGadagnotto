# Plataforma de Cursos Online - Frontend

Este repositorio contiene el frontend de la Plataforma de Cursos Online desarrollada como parte del Challenge Final de Akademi.

## 🚀 Tecnologías Utilizadas

- React.js con Hooks
- Redux clásico
- React Router DOM
- Axios
- Styled Components (o Tailwind)
- Redux DevTools (opcional)

## 📁 Estructura del Proyecto

FE-challengeFinal-akademi-valentinaGadagnotto
└── 📁akademi
    └── 📁public
        └── favicon.ico
        └── index.html
        └── logo192.png
        └── logo512.png
        └── manifest.json
        └── robots.txt
    └── 📁src
        └── 📁api
            └── axios.js
        └── App.js
        └── 📁components
            └── 📁cards
                └── CourseCard.js
                └── EnrollmentCard.js
                └── StatisticsCard.js
            └── 📁forms
                └── CourseForm.js
                └── GradeScoreInput.js
                └── LoginForm.js
                └── RegisterForm.js
                └── StudentsGradeScoreInput.js
                └── UserForm.js
            └── 📁nav
                └── AdminNavbar.js
                └── AdminSidebar.js
                └── ProfessorNavbar.js
                └── ProfessorSidebar.js
                └── StudentNavbar.js
                └── StudentSidebar.js
        └── index.js
        └── 📁layouts
            └── AdminLayout.js
            └── AuthLayout.js
            └── ProfessorLayout.js
            └── StudentLayout.js
        └── 📁pages
            └── 📁auth
                └── ForgotPassword.js
                └── Login.js
                └── PasswordReset.js
                └── Register.js
            └── 📁courses
                └── CourseCardsView.js
                └── CourseDetail.js
                └── CoursesList.js
                └── CourseTableView.js
                └── NewCourse.js
            └── 📁dashboard
                └── AdminDashboard.js
                └── ProfessorDashboard.js
                └── Statistics.js
                └── StudentDashboard.js
            └── 📁enrollments
                └── DynamicEnrollmentsTable.js
                └── EnrollmentDetail.js
                └── EnrollmentsCardsView.js
                └── EnrollmentsList.js
            └── 📁grades
                └── GradesList.js
                └── StudentGradesTable.js
            └── 📁users
                └── NewUser.js
                └── UserProfile.js
                └── UsersList.js
        └── 📁routes
            └── AppRoutes.js
        └── 📁store
            └── 📁actions
                └── authActions.js
                └── coursesActions.js
                └── enrollmentsActions.js
                └── gradesActions.js
                └── messagesAction.js
                └── usersActions.js
            └── index.js
            └── 📁reducers
                └── authReducer.js
                └── courseReducer.js
                └── enrollmentReducer.js
                └── gradeReducer.js
                └── index.js
                └── messageReducer.js
                └── userReducer.js
            └── types.js
        └── 📁styles
            └── colors.js
            └── index.js
            └── theme.js
        └── 📁UI
            └── Modal.js
            └── Spinner.js
        └── 📁utils
            └── handlers.js
            └── 📁hooks
                └── useTokenExpirationChecker.js
            └── validators.js
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md

## ⚙️ Instalación

1. Clonar el repositorio:
git clone https://github.com/tuUsuarioGithub/challengeFinal-akademi-nombreApellido-frontend.git

2. Instalar las dependencias:
npm install

3. Iniciar la app:
npm start
La aplicación estará disponible en http://localhost:3000.

## 🧠 Gestión de Estado
La aplicación utiliza Redux Clásico para manejar:

# Autenticación
# Usuarios
# Cursos
# Inscripciones
# Calificaciones

## 🧭 Navegación por Roles

# Superadmin
Dashboard con estadísticas

Gestión de usuarios y cursos

Alta de profesores

# Profesor
Crear, editar y eliminar cursos

Ver alumnos inscriptos

Cargar y editar calificaciones

# Alumno
Registrarse

Catálogo de cursos

Inscribirse y cancelar cursos

Ver calificaciones

## ✅ Funcionalidades Implementadas

Login y registro de alumno

Protección de rutas según rol

CRUD completo de usuarios y cursos

Formularios con validaciones

Paginación y filtros en listados

Recuperación de contraseña por email

Manejo de errores y estados de carga

Redirección automática según rol

## 📝 Autor
Challenge Final - Akademi
Desarrollado por: Valentina Gadagñotto