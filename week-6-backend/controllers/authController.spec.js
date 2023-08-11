import bcrypt from "bcrypt";
import mssql from "mssql";
import { v4 } from "uuid";
import { registerUsers, userLogin } from "./authControllers";
const jwt = require("jsonwebtoken");

const req = {
  body: {
    // full_name,email,password
    full_name: "Milla",
    email: "millajesso2000@gmail.com",
    password: "12345678",
    cohort: "cohort 1",
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Register User", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should register a user", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("swredtfgjhjtrftg");

    const mockedInput = jest.fn().mockReturnThis();
    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
      connected: true,
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce(mockedPool);

    await registerUsers(req, res);

    expect(mockedInput).toHaveBeenCalledWith(
      "Jkdljhokhjnd Jesso",
      "milljahjlnc@gmail.com",
      "1299345678",
      "1dvsz"
    );

    expect(mockedInput).toHaveBeenCalledWith(
      "Jkdljhokhjnd Jesso",
      "milljahjlnc@gmail.com",
      "1299345678",
      "1dvsz"
    );

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });

    expect(mockedExecute).toHaveBeenCalledWith("registerUsersProc");

    //    expect(mockedInput).toHaveBeenCalledWith("id", expect.any(String));
    expect(mockedInput).toHaveBeenCalledWith("id", expect.any(String));
  });

  it("Fails if body is missing email or password", async () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await registerUsers(req, res);
    expect(res.json).toHaveBeenCalledWith({ error: "Please input all values" });
  });

  it("Fails with error email already exists", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("kjhgsaiuytwiulkyiyui");

    const mockedInput = jest.fn().mockReturnThis();
    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [0] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool);

    await registerUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Registration failed",
    });
  });
});
