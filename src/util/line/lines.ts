import { Vector2d } from "../points/points";

export class Line {
  constructor(
    public x1: number = 0,
    public y1: number = 0,
    public x2: number = 0,
    public y2: number = 0
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  public get length(): number {
    return Math.sqrt(this.sqrLength);
  }

  public get sqrLength(): number {
    return Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2);
  }

  public get dirVector(): Vector2d {
    return { x: this.x2 - this.x1, y: this.y2 - this.y1 };
  }

  public get dirVectorNormilized(): Vector2d {
    const length = this.length;
    const norm = Vector2d.divide(this.dirVector, length);
    return norm;
  }

  public getWithLength(newLength: number): Line {
    const norm = this.dirVectorNormilized;
    const newDir = Vector2d.multiply(norm, newLength);
    return new Line(this.x1, this.y1, this.x1 + newDir.x, this.y1 + newDir.y);
  }

  public get normilized(): Line {
    const length = this.length;
    return new Line(
      this.x1 / length,
      this.y1 / length,
      this.x2 / length,
      this.y2 / length
    );
  }

  public get angle(): number {
    return Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
  }

  public get slope(): number {
    return (this.y2 - this.y1) / (this.x2 - this.x1);
  }

  public get yIntercept(): number {
    return this.y1 - this.slope * this.x1;
  }

  public get midpoint(): { x: number; y: number } {
    return { x: (this.x1 + this.x2) / 2, y: (this.y1 + this.y2) / 2 };
  }

  public rotated(angle: number): Line {
    const length = this.length;
    const x2 = this.x1 + length * Math.cos(this.angle + angle);
    const y2 = this.y1 + length * Math.sin(this.angle + angle);
    return new Line(this.x1, this.y1, x2, y2);
  }

  // Move the whole line perpendicular to its direction vector with the given amount.
  public sideStep(amount: number): Line {
    const perp = this.perpendicularLine;
    const norm = perp.dirVectorNormilized;
    const sideStep = Vector2d.multiply(norm, amount);
    return new Line(
      this.x1 + sideStep.x,
      this.y1 + sideStep.y,
      this.x2 + sideStep.x,
      this.y2 + sideStep.y
    );
  }

  public get perpendicularLine(): Line {
    return this.rotated(Math.PI / 2);
  }

  public get isVertical(): boolean {
    return this.x1 === this.x2;
  }

  public get isHorizontal(): boolean {
    return this.y1 === this.y2;
  }

  public get isStraight(): boolean {
    return this.isHorizontal || this.isVertical;
  }

  public get isPoint(): boolean {
    return this.x1 === this.x2 && this.y1 === this.y2;
  }

  public get startPoint(): { x: number; y: number } {
    return { x: this.x1, y: this.y1 };
  }

  public get endPoint(): { x: number; y: number } {
    return { x: this.x2, y: this.y2 };
  }
}
