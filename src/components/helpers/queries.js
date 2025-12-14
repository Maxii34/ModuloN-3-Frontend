const usuariosBack = import.meta.env.VITE_API_USUARIOS;

export const registrarUsuario = async (nuevoUsuario) => {
  try {
    const respuesta = await fetch(usuariosBack, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const iniciarSesion = async (usuario) => {
  try {
    const respuesta = await fetch(usuariosBack, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return null;
  }
};
