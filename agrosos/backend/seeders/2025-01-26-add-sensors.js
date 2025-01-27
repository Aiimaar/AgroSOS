export const up = async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sensors', [
      {
        type: 'temperature',
        plot_id: 88,
      },
      {
        type: 'soil_temperature',
        plot_id: 88,
      },
      {
        type: 'humidity',
        plot_id: 88,
      },
      {
        type: 'soil humidity',
        plot_id: 88,
      },
    ]);
  };
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sensors', { plot_id: 88 }, {});
  };
  