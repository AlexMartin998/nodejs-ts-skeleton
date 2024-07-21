export class UserDto {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly gender: string,
    public readonly profilePic: string
  ) {}

  static create(user: Record<string, any>): UserDto {
    const { _id, username, gender, profilePic } = user;
    return new UserDto(_id, username, gender, profilePic);
  }
}
