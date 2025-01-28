export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Sensors', [
    {
      type: 'temperature',
      plot_id: 40,
      code: 'TEMP-001',
    },
    {
      type: 'soil_temperature',
      plot_id: 40,
      code: 'SOILTEMP-002',
    },
    {
      type: 'humidity',
      plot_id: 40,
      code: 'HUM-003',
    },
    {
      type: 'soil humidity',
      plot_id: 40,
      code: 'SOILHUM-004',
    },
  ]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Sensors', { plot_id: 40 }, {});
};