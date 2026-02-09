import mongoose from 'mongoose';
import User from '../models/user.model';
import Restaurant from '../models/restaurant.model';
import Dish from '../models/dish.model';
import Menu from '../models/menu.model';
import config from '../config';

export const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('Connected to MongoDB...');

    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      Dish.deleteMany({}),
      Menu.deleteMany({}),
    ]);
    console.log('Database cleared.');

    // 1. Create Owners (One for each city)
    const owners = await User.insertMany([
      {
        name: 'Rajesh Mehta',
        email: 'rajesh@ahmedabad.in',
        city: 'Ahmedabad',
        phoneNumber: '9876543210',
        password: 'password123',
        role: 'ADMIN',
        state: 'Gujarat',
        address: 'Navrangpura',
        pinCode: '380009',
      },
      {
        name: 'Suresh Gada',
        email: 'suresh@mumbai.in',
        city: 'Mumbai',
        phoneNumber: '9876543211',
        password: 'password123',
        role: 'ADMIN',
        state: 'Maharashtra',
        address: 'Dadar',
        pinCode: '400014',
      },
      {
        name: 'Amit Shah',
        email: 'amit@surat.in',
        city: 'Surat',
        phoneNumber: '9876543212',
        password: 'password123',
        role: 'ADMIN',
        state: 'Gujarat',
        address: 'Adajan',
        pinCode: '395009',
      },
      {
        name: 'Vijay Jadeja',
        email: 'vijay@rajkot.in',
        city: 'Rajkot',
        phoneNumber: '9876543213',
        password: 'password123',
        state: 'Gujarat',
        role: 'ADMIN',
        address: 'Kalavad Road',
        pinCode: '360001',
      },
      {
        name: 'Rahul Deshpande',
        email: 'rahul@pune.in',
        city: 'Pune',
        phoneNumber: '9876543214',
        password: 'password123',
        role: 'ADMIN',
        state: 'Maharashtra',
        address: 'Kothrud',
        pinCode: '411038',
      },
    ]);

    // 2. Expanded Global Dishes (15+ items)
    const dishes = await Dish.insertMany([
      {
        name: 'Paneer Butter Masala',
        baseDescription: 'Creamy tomato gravy with paneer.',
        foodType: 'VEG',
        baseIngredients: ['Paneer', 'Tomato', 'Cream'],
        price: 150,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Chicken Tikka Roll',
        baseDescription: 'Spicy chicken in rumali roti.',
        foodType: 'NON_VEG',
        baseIngredients: ['Chicken', 'Spices', 'Wheat'],
        price: 120,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Undhiyu',
        baseDescription: 'Mixed vegetable Gujarati specialty.',
        foodType: 'VEG',
        baseIngredients: ['Papdi', 'Yam', 'Muthiya'],
        price: 180,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Misal Pav',
        baseDescription: 'Spicy sprout curry with bread.',
        foodType: 'VEG',
        baseIngredients: ['Sprouts', 'Farsan', 'Pav'],
        price: 100,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Vada Pav',
        baseDescription: "Mumbai's favorite potato burger.",
        foodType: 'VEG',
        baseIngredients: ['Potato', 'Gram Flour', 'Pav'],
        price: 50,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Surti Locho',
        baseDescription: 'Steamed chickpea flour snack.',
        foodType: 'VEG',
        baseIngredients: ['Chana Dal', 'Spices'],
        price: 80,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Puran Poli',
        baseDescription: 'Sweet flatbread with lentil filling.',
        foodType: 'VEG',
        baseIngredients: ['Chana Dal', 'Jaggery', 'Wheat'],
        price: 90,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Rajkot Chutney Gathiya',
        baseDescription: 'Famous spicy snacks from Rajkot.',
        foodType: 'VEG',
        baseIngredients: ['Besan', 'Green Chutney'],
        price: 70,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Pune Mastani',
        baseDescription: 'Thick milk shake with ice cream.',
        foodType: 'VEG',
        baseIngredients: ['Milk', 'Mango', 'Dry Fruits'],
        price: 110,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Butter Chicken',
        baseDescription: 'Classic smoked chicken in gravy.',
        foodType: 'NON_VEG',
        baseIngredients: ['Chicken', 'Butter', 'Tomato'],
        price: 200,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Dhokla',
        baseDescription: 'Fermented rice and chickpea steam cake.',
        foodType: 'VEG',
        baseIngredients: ['Rice', 'Chana Dal'],
        price: 60,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Bhakarwadi',
        baseDescription: 'Spicy and sweet fried snacks.',
        foodType: 'VEG',
        baseIngredients: ['Gram Flour', 'Spices'],
        price: 90,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Kathi Roll',
        baseDescription: 'Skewered kebab wrapped in paratha.',
        foodType: 'NON_VEG',
        baseIngredients: ['Egg', 'Chicken', 'Paratha'],
        price: 130,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Sev Tameta Nu Shaak',
        baseDescription: 'Tomato curry topped with sev.',
        foodType: 'VEG',
        baseIngredients: ['Tomato', 'Sev', 'Spices'],
        price: 120,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Dal Baati',
        baseDescription: 'Hard wheat rolls with lentil soup.',
        foodType: 'VEG',
        baseIngredients: ['Wheat', 'Ghee', 'Moong Dal'],
        price: 160,
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
    ]);

    // 3. 25 Restaurants across 5 Cities
    const restaurantsData = [
      // AHMEDABAD
      {
        name: 'Agashiye',
        address: 'Lal Darwaja',
        city: 'Ahmedabad',
        state: 'Gujarat',
        owner: owners[0]._id,
        cuisine: ['Gujarati', 'Thali'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Vishalla',
        address: 'Vasna Rd',
        city: 'Ahmedabad',
        state: 'Gujarat',
        owner: owners[0]._id,
        cuisine: ['Traditional'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Swati Snacks',
        address: 'Law Garden',
        city: 'Ahmedabad',
        state: 'Gujarat',
        owner: owners[0]._id,
        cuisine: ['Gujarati'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Manek Chowk Dosa',
        address: 'Old City',
        city: 'Ahmedabad',
        state: 'Gujarat',
        owner: owners[0]._id,
        cuisine: ['Street Food'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Gopi Dining Hall',
        address: 'Ashram Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        owner: owners[0]._id,
        cuisine: ['Thali'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },

      // MUMBAI
      {
        name: 'Bademiya',
        address: 'Colaba',
        city: 'Mumbai',
        state: 'Maharashtra',
        owner: owners[1]._id,
        cuisine: ['Mughlai'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Britannia & Co.',
        address: 'Ballard Estate',
        city: 'Mumbai',
        state: 'Maharashtra',
        owner: owners[1]._id,
        cuisine: ['Parsi'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Gajalee',
        address: 'Vile Parle',
        city: 'Mumbai',
        state: 'Maharashtra',
        owner: owners[1]._id,
        cuisine: ['Seafood'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Aaswad',
        address: 'Dadar',
        city: 'Mumbai',
        state: 'Maharashtra',
        owner: owners[1]._id,
        cuisine: ['Maharashtrian'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Cafe Mondegar',
        address: 'Colaba',
        city: 'Mumbai',
        state: 'Maharashtra',
        owner: owners[1]._id,
        cuisine: ['Continental'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },

      // SURAT
      {
        name: 'Sasumaa Thali',
        address: 'Ring Road',
        city: 'Surat',
        state: 'Gujarat',
        owner: owners[2]._id,
        cuisine: ['Gujarati'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Jani Locho',
        address: 'Adajan',
        city: 'Surat',
        state: 'Gujarat',
        owner: owners[2]._id,
        cuisine: ['Snacks'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Kansar',
        address: 'Nanpura',
        city: 'Surat',
        state: 'Gujarat',
        owner: owners[2]._id,
        cuisine: ['Thali'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Madhi Ni Khamni',
        address: 'Vesu',
        city: 'Surat',
        state: 'Gujarat',
        owner: owners[2]._id,
        cuisine: ['Surti Special'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'G.H. Pan Store',
        address: 'Piplod',
        city: 'Surat',
        state: 'Gujarat',
        owner: owners[2]._id,
        cuisine: ['Desserts'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },

      // RAJKOT
      {
        name: 'The Grand Thakar',
        address: 'Jawahar Road',
        city: 'Rajkot',
        state: 'Gujarat',
        owner: owners[3]._id,
        cuisine: ['Gujarati Thali'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Adarsh Dining Hall',
        address: 'Near Station',
        city: 'Rajkot',
        state: 'Gujarat',
        owner: owners[3]._id,
        cuisine: ['Kathiyawadi'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Balaji Sandwich',
        address: 'Yagnik Road',
        city: 'Rajkot',
        state: 'Gujarat',
        owner: owners[3]._id,
        cuisine: ['Fast Food'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Lords Banquet',
        address: 'Kalavad Road',
        city: 'Rajkot',
        state: 'Gujarat',
        owner: owners[3]._id,
        cuisine: ['Multi-cuisine'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Saffron',
        address: 'Race Course Rd',
        city: 'Rajkot',
        state: 'Gujarat',
        owner: owners[3]._id,
        cuisine: ['North Indian'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },

      // PUNE
      {
        name: 'Sujata Mastani',
        address: 'Sadashiv Peth',
        city: 'Pune',
        state: 'Maharashtra',
        owner: owners[4]._id,
        cuisine: ['Desserts'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Shabree',
        address: 'FC Road',
        city: 'Pune',
        state: 'Maharashtra',
        owner: owners[4]._id,
        cuisine: ['Maharashtrian'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Vaishali',
        address: 'FC Road',
        city: 'Pune',
        state: 'Maharashtra',
        owner: owners[4]._id,
        cuisine: ['South Indian'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Blue Nile',
        address: 'Camp',
        city: 'Pune',
        state: 'Maharashtra',
        owner: owners[4]._id,
        cuisine: ['Iranian', 'Mughlai'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
      {
        name: 'Bedekar Misal',
        address: 'Narayan Peth',
        city: 'Pune',
        owner: owners[4]._id,
        state: 'Maharashtra',
        cuisine: ['Maharashtrian'],
        imageUrl:
          'https://res.cloudinary.com/dzawjeqju/image/upload/v1770557978/restaurent_image_1_bmwhoj.jpg',
      },
    ];

    const restaurants = await Restaurant.insertMany(restaurantsData);

    // 4. Create Menus (Assigning 4 items to each restaurant)
    const menus: any = [];
    restaurants.forEach((res, index) => {
      // Pick 4 dishes cyclically
      for (let i = 0; i < 4; i++) {
        const dishIndex = (index + i) % dishes.length;
        menus.push({
          dish: dishes[dishIndex]._id,
          restaurant: res._id,
          price: Math.floor(Math.random() * (600 - 100) + 100),
          prepTime: 900 + Math.random() * 1000,
          isAvailable: true,
        }) as any;
      }
    });

    await Menu.insertMany(menus);

    console.log(
      `Seeded: ${owners.length} Cities, 25 Restaurants, ${dishes.length} Dishes, and ${menus.length} Menus. 🌱`,
    );
    //process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};
