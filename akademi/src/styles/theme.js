import { colors } from "./colors";

export const getTheme = (role) => {
  switch (role) {
    case "student":
      return {
        primary: colors.student.primary,
        hover: colors.student.hover,
        navbarBg: colors.student.navbarBg,
        sidebarBg: colors.student.sidebarBg,
        text: colors.student.text,
        buttonBg: colors.student.buttonBg,
        buttonHover: colors.student.buttonHover,
        borderColor: colors.student.borderColor,

        lightBg: colors.lightBg,
        cardBg: colors.cardBg,
        tableTh: colors.tableTh,
        tableTd: colors.tableTd,
        mainContent: colors.mainContent,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        modalBg: colors.modalBg,
        success: colors.success,
        error: colors.error,
        info: colors.info
      };

    case "professor":
      return {
        primary: colors.professor.primary,
        hover: colors.professor.hover,
        navbarBg: colors.professor.navbarBg,
        sidebarBg: colors.professor.sidebarBg,
        text: colors.professor.text,
        buttonBg: colors.professor.buttonBg,
        buttonHover: colors.professor.buttonHover,
        borderColor: colors.professor.borderColor,

        lightBg: colors.lightBg,
        cardBg: colors.cardBg,
        tableTh: colors.tableTh,
        tableTd: colors.tableTd,
        mainContent: colors.mainContent,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        modalBg: colors.modalBg,
        success: colors.success,
        error: colors.error,
        info: colors.info
      };

    case "superadmin":
      return {
        primary: colors.admin.primary,
        hover: colors.admin.hover,
        navbarBg: colors.admin.navbarBg,
        sidebarBg: colors.admin.sidebarBg,
        text: colors.admin.text,
        buttonBg: colors.admin.buttonBg,
        buttonHover: colors.admin.buttonHover,
        borderColor: colors.admin.borderColor,

        lightBg: colors.lightBg,
        cardBg: colors.cardBg,
        tableTh: colors.tableTh,
        tableTd: colors.tableTd,
        mainContent: colors.mainContent,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        modalBg: colors.modalBg,
        success: colors.success,
        error: colors.error,
        info: colors.info
      };

    default:
      return getTheme("student");
  }
};