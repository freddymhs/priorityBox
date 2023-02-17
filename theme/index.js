import { extendTheme } from "native-base";

// usando obj porqe no me funciona algunas props de native-base style :/
export const mySuperTheme = extendTheme({
  //  safe area view
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#62EFFF", //////////////comparten color de fondo
  },
  // cosas fuear de la app
  config: {
    // initialColorStatusBar: "dark-content",
    initialColorStatusBar: "cyan",
  },
  // componentes de la app

  components: {
    fullScreen: {
      primaryColor: "#62EFFF",
      flex: 1,
    },
    boxArea: {
      flex: 20,
      flexDirection: "row",
      backgroundColor: "#62EFFF", //////////////comparten color de fondo
    },
    separator: {
      flex: 1,
    },

    simpleButton: {
      btn: {
        backgroundColor: "#323333",
        borderRadius: 8,
        padding: 10,
        width: 233,
        height: 55,
        alignSelf: "center",
        // anidamos el estilo para el texto del botón
        text: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#fff",
        },
      },
    },
    Select: {
      baseStyle: {
        borderColor: "black",
      },
    },
    Input: {
      baseStyle: {
        borderColor: "black",
      },
    },
  },

  AddToListModal: {
    backgroundColor: "#62EFFF", //////////////comparten color de fondo
    flex: 2,
    justifyContent: "center",
  },

  modalBtn: {
    backgroundColor: "#323333",
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  modal: {
    backgroundColor: "#62EFFF",
    borderRadius: 8,
  },
  modalContent: {
    // width: 350,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 2,
  },
  modalHeader: { backgroundColor: "#62EFFF", borderColor: "#62EFFF" },
  modalBody: {
    backgroundColor: "#62EFFF",
  },
  modalFooter: {
    backgroundColor: "#62EFFF",
    borderColor: "#62EFFF",
  },

  // colors: {
  //   primary: "green.500",
  //   secondary: "blue.500",
  // },
});

// debo hacer un hook peronslizado para probar el cambio de color
