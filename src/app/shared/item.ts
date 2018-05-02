class Links {
  constructor(
  public rel?: string,
  public href?: string,
  public hreflang?: string,
  public media?: string,
  public title?: string,
  public type?: string,
  public deprecation?: string
  ) {}
}

export class Item {
    constructor(
      public itemId?: string,
      public listId?: string,
      public departmentId?: string,
      public username?: string,
      public active?: boolean,
      public quantity?: number,
      public name?: string,
      public links?: Array<Links>
    ) {}
}
