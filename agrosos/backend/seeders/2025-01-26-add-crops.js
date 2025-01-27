export const up = async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Crops', [
      {
        name: 'Tomate',
        graphic_image: 'uploads/tomate_grafico.png',
        crop_image: 'uploads/tomate_cultivo.png',
        info: 'El tomate es un cultivo de temporada cálida, ideal para suelos bien drenados y con exposición solar completa.',
        start_month: 'Marzo',
        end_month: 'Septiembre',
      },
      {
        name: 'Lechuga',
        graphic_image: 'uploads/lechuga_grafico.png',
        crop_image: 'uploads/lechuga_cultivo.png',
        info: 'La lechuga se desarrolla mejor en climas frescos y requiere riego frecuente.',
        start_month: 'Febrero',
        end_month: 'Junio',
      },
      {
        name: 'Zanahoria',
        graphic_image: 'uploads/zanahoria_grafico.png',
        crop_image: 'uploads/zanahoria_cultivo.png',
        info: 'La zanahoria prefiere suelos sueltos y arenosos, y su maduración toma entre 70 y 80 días.',
        start_month: 'Abril',
        end_month: 'Agosto',
      },
    ]);
  };
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Crops', null, {});
  };
  