import app from './app';
import { sequelize } from './models';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Sincronización estricta de Base de Datos para entornos ágiles
    await sequelize.authenticate();
    console.log('📦 Database connection successfully established.');
    
    // alter: true sincroniza de forma segura los esquemas de producción
    await sequelize.sync({ alter: true });
    console.log(' Unified database models synchronized.');

    app.listen(PORT, () => {
      console.log(`🚀 SDP-HEALTH Production Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to launch backend server execution:', error);
    process.exit(1);
  }
}

startServer();