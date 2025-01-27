export const up = async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sensor_value', [
      {
        sensor_id: 19,
        value: 23.5,
        createdAt: new Date(),
      },
      {
        sensor_id: 19,
        value: 30.2,
        createdAt: new Date(),
      },
      {
        sensor_id: 19,
        value: 27.8,
        createdAt: new Date(),
      },
      {
        sensor_id: 19,
        value: 31.1,
        createdAt: new Date(),
      },
    ]);
  };
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sensor_value', { sensor_id: 19 }, {});
  };
  