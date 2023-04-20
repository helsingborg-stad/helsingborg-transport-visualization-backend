import { Router } from 'express';

export default abstract class RouterContainer {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes(this.router);
  }

  abstract mountRoutes(router: Router): void;

  getRouter(): Router {
    return this.router;
  }
}
