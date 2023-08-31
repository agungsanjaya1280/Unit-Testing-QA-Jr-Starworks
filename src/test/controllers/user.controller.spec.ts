import request from 'supertest';
import express from 'express';
import userService from 'src/services/user.service';
import userRouter from 'src/routes/user.routes'; // 
import { User } from 'src/entities/user.entity';

jest.mock('../services/user.service');

describe('User Controller', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json()); 
    app.use('/users', userRouter); 
  });

  describe('POST /users/registration', () => {
    it('should register a new user', async () => {
      const mockedUser = new User();
      userService.register.mockResolvedValue(mockedUser);

      const userRegistrationData = {
       
        firstName: 'ajik',
        lastName: 'djaya',
        dateOfBirth: '1999-01-01',
        streetAddress: '123 gianyar bali ',
        city: 'gianyar',
        province: 'bali',
        telephoneNumber: '1234567890',
        emailAddress: 'akuzoro@mail.com',
        password: 'botolmizon',
      };

      const response = await request(app)
        .post('/users/registration')
        .send(userRegistrationData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockedUser);
    });


  });

  describe('POST /users/login', () => {
    it('should log in a user', async () => {
      const mockedUser = new User();
      userService.login.mockResolvedValue(mockedUser);

      const userLoginData = {
    
        emailAddress: 'susahbanget@example.com',
        password: 'mohonmaafsayandangerti',
      };

      const response = await request(app)
        .post('/users/login')
        .send(userLoginData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockedUser);
    });

   
  });

  describe('POST /users/token', () => {
    it('should get a token', async () => {
      const mockedToken = {
        token: 'yourMockedTokenHere',
      };
     
      userService.getToken.mockResolvedValue(mockedToken);

      const userTokenData = {
      
        userId: 123,
        emailAddress: 'johndoe@example.com',
      };

      const response = await request(app)
        .post('/users/token')
        .send(userTokenData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockedToken);
    });

   
  });

 
});
