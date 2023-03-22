export class Company {
  id: number;
  name: string;
  locationIds: number[];

  constructor(partial: Partial<Company>) {
    Object.assign(this, partial);
  }
}
