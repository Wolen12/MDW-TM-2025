import { RegisterDto } from "../dto/registerDto";
import { LoginDto } from "../dto/loginDto";
import { HashService } from "./hashService";
import { JwtService } from "./jwtService";
import { User } from "../models/userModel";

export class AuthService {
  async register(data: RegisterDto) {
    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error("El email ya está registrado");

    const hashedPassword = await HashService.hash(data.password);

    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    await newUser.save(); 

    return { message: "Usuario registrado con éxito", userId: newUser._id };
  }

  async login(data: LoginDto) {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await HashService.compare(data.password, user.password);
    if (!isPasswordValid) throw new Error("Credenciales inválidas");

    const token = JwtService.sign({ id: user._id, email: user.email });
    return { access_token: token, refresh_token: token };
  }
}
