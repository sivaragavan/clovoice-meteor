import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Themes from '../../api/Themes/Themes';

const themesSeed = userId => ({
  collection: Themes,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      owner: userId,
      title: `Theme #${dataIndex + 1}`,
      body: `This is the body of theme #${dataIndex + 1}`,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      return themesSeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return themesSeed(userId);
      },
    };
  },
});
