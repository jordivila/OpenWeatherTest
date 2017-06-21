export interface IRouteDataCustomized {
  icon: string;
  title: string;
  isMenuItem: boolean;
}

export class RouteDataCustomized {
  constructor(
    public icon: string,
    public title: string,
    public isMenuItem: boolean) {

  }

}
