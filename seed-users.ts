import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './src/app.module';
import { Repository } from 'typeorm';
import { User } from './src/user/user.entity';
import { Role, RoleEnum } from './src/role/role.entity';

async function seedUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Retrieve the repositories
  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const roleRepository = app.get<Repository<Role>>(getRepositoryToken(Role));

  // First, ensure roles exist
  const existingRoles = await roleRepository.find();

  // Create roles if they don't exist
  const rolesToCreate = [
    { name: RoleEnum.Admin },
    { name: RoleEnum.Editor },
    { name: RoleEnum.Viewer },
  ].filter(
    (roleData) =>
      !existingRoles.some(
        (existingRole) => existingRole.name === roleData.name,
      ),
  );

  if (rolesToCreate.length > 0) {
    await roleRepository.save(rolesToCreate);
    console.log('Roles created:', rolesToCreate);
  }

  // Fetch the roles to use for user creation
  const roles = await roleRepository.find();

  console.log('Seeding users...');

  const users = [];

  // Generate 1000 users
  for (let i = 1; i <= 1000; i++) {
    const user = new User();
    user.username = `user${i}`;
    user.password = 'password'; // Hashing can be added if necessary

    // Assign roles based on the fetched roles
    user.role =
      i % 3 === 0
        ? roles.find((r) => r.name === RoleEnum.Admin)
        : i % 2 === 0
          ? roles.find((r) => r.name === RoleEnum.Editor)
          : roles.find((r) => r.name === RoleEnum.Viewer);

    users.push(user);

    // Optional: Log progress every 100 users
    if (i % 100 === 0) {
      console.log(`Prepared ${i} users for insertion.`);
    }
  }

  // Bulk save users
  try {
    await userRepository.save(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
  } finally {
    // Close the application context
    await app.close();
  }
}

seedUsers().catch((error) => {
  console.error('Error during user seeding:', error);
  if (error instanceof Error) {
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
  }
});
