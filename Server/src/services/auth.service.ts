import User from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { generateToken } from '../utils/jwt';

export class AuthService {
  static async register(userData: any) {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      city,
      state,
      pinCode,
    } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      throw new ApiError(
        400,
        'User already exists with this email or phone number',
      );
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      phoneNumber,
      address,
      city,
      state,
      pinCode,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken: token,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email, isDeleted: false }).select(
      '+password',
    );

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = generateToken(user._id.toString());

    await User.findByIdAndUpdate(user._id, { accessToken });

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        city: user.city,
        state: user.state,
        pinCode: user.pinCode,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
      accessToken,
    };
  }
}
