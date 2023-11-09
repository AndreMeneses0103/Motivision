import User from './models/User';
import UserSetting from './models/UserSetting';

const user = new User(new UserSetting("Jose", "teste@email.com", "senha123"), ["asd123", "4f2123"], ["kdj2j3", "djah23"], ["4412", "4542"], 70, "./testes/test")

console.log(user.usersettings.name);
