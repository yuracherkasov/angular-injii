import { Injectable } from '@angular/core';

@Injectable()

export class CarouselService {

  left: number = 0;
  activeItem: number = 0;
  buttonQuantity: any = [];
  cssTransition: number = 0.5;

  getPagination(length: number, carouselItemWidth: number, carouselWidth: number) {
    this.buttonQuantity = new Array(Math.ceil(length * carouselItemWidth / carouselWidth));
  }

  gotoItem(i: number, carouselWidth: number, length: number, carouselItemWidth: number) {

    let quantityItemsInWindow = carouselWidth / carouselItemWidth;
    let quantityOffsetItems = i * quantityItemsInWindow;

    let transition = (i >= this.activeItem) ? ( (i > this.activeItem) ? (i - this.activeItem) * 0.5 : 0.5 ) : (this.activeItem - i) * 0.5;
    switch (true) {
      case transition <= 0.5:
        this.cssTransition = transition;
        break;
      case transition > 0.5 && transition <= 2:
        this.cssTransition = transition / 2;
        break;
      case transition > 2 && transition <= 4:
        this.cssTransition = transition / 3;
        break;
      case transition > 4 && transition <= 8:
        this.cssTransition = transition / 4;
        break;
      case transition > 8:
        this.cssTransition = transition / 4;
        break;
    }

    if (quantityItemsInWindow <= (length - quantityOffsetItems)) {
      this.left = -i * carouselItemWidth * quantityItemsInWindow;
    } else {
      switch (length - quantityOffsetItems) {
        case 1:
          this.left = (i - 1) * -quantityItemsInWindow * carouselItemWidth - carouselItemWidth;
          break;
        case 2:
          this.left = (i - 1) * -quantityItemsInWindow * carouselItemWidth - carouselItemWidth * 2;
          break;
        case 3:
          this.left = (i - 1) * -quantityItemsInWindow * carouselItemWidth - carouselItemWidth * 3;
          break;
        case 4:
          this.left = (i - 1) * -quantityItemsInWindow * carouselItemWidth - carouselItemWidth * 4;
          break;
        case 5:
          this.left = (i - 1) * -quantityItemsInWindow * carouselItemWidth - carouselItemWidth * 5;
          break;
      }
    }

    this.activeItem = i;
  }

  prev(carouselWidth: number, carouselItemWidth: number) {
    this.cssTransition = 0.3;
    this.left += carouselItemWidth;
    this.activeItem = -Math.floor(this.left / carouselWidth);
  }
  next(carouselWidth: number, carouselItemWidth: number) {
    this.cssTransition = 0.3;
    this.left -= carouselItemWidth;
    this.activeItem = -Math.floor(this.left / carouselWidth);
  }
}
