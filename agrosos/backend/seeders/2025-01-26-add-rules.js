export const up = async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rules', [
      {
        name: 'Regla de Humedad 1',
        crop_id: 1, // Puedes cambiar entre 1, 2 o 3 según necesites
        technician_id: 3,
        rule_info: "{\"AND\":[{\"conditions\":[{\"type\":\"humidity\"}],\"actions\":[\"Activar Ventilación\"],\"sensors\":[{\"type\":\"Humedad\"}],\"actuators\":[{\"type\":\"Ventilación\"}]}]}",
      },
      {
        name: 'Regla de Humedad 2',
        crop_id: 2,
        technician_id: 3,
        rule_info: "{\"AND\":[{\"conditions\":[{\"type\":\"humidity\"}],\"actions\":[\"Activar Riego\"],\"sensors\":[{\"type\":\"Humedad\"}],\"actuators\":[{\"type\":\"Riego\"}]}]}",
      },
      {
        name: 'Regla de Humedad 3',
        crop_id: 3,
        technician_id: 3,
        rule_info: "{\"AND\":[{\"conditions\":[{\"type\":\"humidity\"}],\"actions\":[\"Activar Ventilación\"],\"sensors\":[{\"type\":\"Humedad\"}],\"actuators\":[{\"type\":\"Ventilación\"}]}]}",
      },
    ]);
  };
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rules', { technician_id: 3 }, {});
  };
  