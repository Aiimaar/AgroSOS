import User from '../../models/user.js'
import bcrypt from 'bcrypt'; // Para comparar contraseñas hasheadas

// Renderizar la página de inicio de sesión
export const renderLogin = (req, res) => {
  const user = req.session.user || null; // Verifica si hay un usuario en la sesión
  if (user) {
    return res.render('login', { user, error: null }); // Pasa el usuario a la vista
  }
  res.render('login', { user: null, error: null }); // Si no hay usuario, pasa null
};


// Manejar el inicio de sesión
export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario en la base de datos por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Si no se encuentra el usuario
      return res.status(401).render('login', { error: 'Usuario o contraseña inválidos' });
    }

    // Compara la contraseña proporcionada con la contraseña hasheada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Si la contraseña no coincide
      return res.status(401).render('login', { error: 'Usuario o contraseña inválidos' });
    }

    // Guarda la información del usuario en la sesión
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      language: user.language, // Almacena el idioma del usuario
    };

    // Redirige a la lista de usuarios
    res.redirect('/views/userList');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).render('login', { error: 'Ocurrió un error al iniciar sesión' });
  }
};

// Manejar el cierre de sesión
export const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }

    res.clearCookie('connect.sid'); // Limpia la cookie de la sesión
    res.redirect('/views/auth/login'); // Redirige a la página de inicio de sesión
  });
};
