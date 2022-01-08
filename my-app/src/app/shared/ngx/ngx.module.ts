import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/Accordion';
import { CarouselModule } from 'ngx-bootstrap/Carousel';
import { ModalModule } from 'ngx-bootstrap/Modal';
import { PaginationModule } from 'ngx-bootstrap/Pagination';
import { TooltipModule } from 'ngx-bootstrap/Tooltip';
import { PopoverModule } from 'ngx-bootstrap/Popover';

const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ngxComponents],
})
export class NgxModule {}
