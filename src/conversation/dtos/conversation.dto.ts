export class ConversationDto {
  private constructor(
    public readonly id: string,
    public readonly participants: string[],
    public readonly messages: string[]
  ) {}

  static create(props: Record<string, any>): ConversationDto {
    const { _id, participants, messages } = props;
    return new ConversationDto(_id, participants, messages);
  }
}
