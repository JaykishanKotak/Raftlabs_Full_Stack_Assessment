import mongoose from 'mongoose';
import User from '../models/User';

describe('User Model Tests', () => {
  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = await User.create(userData);

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
    expect(user._id).toBeDefined();
  });

  it('should hash password before saving', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = await User.create(userData);
    const savedUser = await User.findById(user._id).select('+password');

    expect(savedUser?.password).not.toBe(userData.password);
    expect(savedUser?.password.length).toBeGreaterThan(
      userData.password.length,
    );
  });

  it('should compare password correctly', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = await User.create(userData);
    const savedUser = await User.findById(user._id).select('+password');

    const isMatch = await savedUser!.comparePassword('password123');
    const isNotMatch = await savedUser!.comparePassword('wrongpassword');

    expect(isMatch).toBe(true);
    expect(isNotMatch).toBe(false);
  });

  it('should fail to create user without email', async () => {
    const userData = {
      password: 'password123',
      name: 'Test User',
    };

    await expect(User.create(userData)).rejects.toThrow();
  });

  it('should fail to create user with invalid email', async () => {
    const userData = {
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User',
    };

    await expect(User.create(userData)).rejects.toThrow();
  });

  it('should fail to create user with duplicate email', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    await User.create(userData);
    await expect(User.create(userData)).rejects.toThrow();
  });

  it('should fail to create user with short password', async () => {
    const userData = {
      email: 'test@example.com',
      password: '123',
      name: 'Test User',
    };

    await expect(User.create(userData)).rejects.toThrow();
  });
});
