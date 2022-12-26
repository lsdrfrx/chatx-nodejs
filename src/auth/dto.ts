interface UserDTO {
  login: string;
  password: string;
}

interface NewUserDTO {
  login: string;
  password: string;
  email: string;
}

export { UserDTO, NewUserDTO };
