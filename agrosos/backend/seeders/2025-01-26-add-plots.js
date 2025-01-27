import { faker } from '@faker-js/faker';

export async function up(queryInterface) {
  await queryInterface.bulkInsert('Plots', [
    {
      name: 'Terreno Norte',
      size: 5.0,
      image: 'terreno_norte.jpg',
      color: '',
      crop_id: 1,
      default_image: '',
    },
    {
      name: 'Parcela Este',
      size: 3.5,
      image: '',
      color: '#FF5733',
      crop_id: 2,
      default_image: '',
    },
    {
      name: 'Campo Sur',
      size: 7.2,
      image: '',
      color: '',
      crop_id: 3,
      default_image: 'default_sur.jpg',
    },
    {
      name: 'Huerto Oeste',
      size: 4.0,
      image: 'huerto_oeste.jpg',
      color: '',
      crop_id: 4,
      default_image: '',
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Plots', null, {});
}
