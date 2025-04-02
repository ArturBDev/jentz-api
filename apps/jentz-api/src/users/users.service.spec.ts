import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { Role } from "./entities/user.entity";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const user = await service.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
      role: Role.USER,
    });
    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.role).toBe(Role.USER);
  });
});
