export const up = async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Actuators', [
      {
        type: 'irrigation',
        plot_id: 40,
        code: 'IRR-001',
      },
      {
        type: 'ventilation',
        plot_id: 40,
        code: 'VENT-002',
      },
      {
        type: 'crop_covering',
        plot_id: 40,
        code: 'COVER-003',
      },
      {
        type: 'window_opening',
        plot_id: 40,
        code: 'WINDOW-004',
      },
    ]);
  };
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Actuators', { plot_id: 40 }, {});
  };
  