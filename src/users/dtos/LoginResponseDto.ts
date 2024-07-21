type UserResponseDto = {
  fullName: string;
  username: string;
  uid: string;
  profilePic?: string;
};

export class LoginResponseDto {
  private constructor(
    public readonly accessToken: string,
    public readonly user: UserResponseDto
  ) {}

  static create(props: {
    accessToken: string;
    user: UserResponseDto | any;
  }): LoginResponseDto {
    const { accessToken, user } = props;

    return new LoginResponseDto(accessToken, {
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      uid: user.uid,
    });
  }
}
