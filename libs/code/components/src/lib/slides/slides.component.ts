import { Input, OnInit, Output, EventEmitter, Component } from '@angular/core';
import { Slides } from './slides.interface';
import { trigger, transition, useAnimation } from '@angular/animations';

import {
  AnimationType,
  scaleIn,
  scaleOut,
  fadeIn,
  fadeOut,
  flipIn,
  flipOut,
  jackIn,
  jackOut
} from './slides.animations';

const slides = [
  { headline: 'Code 1', src: './slides-1.slide.svg' },
  { headline: 'Code 2', src: 'slides-2.slide.svg' },
];

@Component({
  selector: 'cnd-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } })
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } })
      ]),

      /* fade */
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '500ms' } })
      ]),
      transition('fade => void', [
        useAnimation(fadeOut, { params: { time: '500ms' } })
      ]),

      /* flip */
      transition('void => flip', [
        useAnimation(flipIn, { params: { time: '500ms' } })
      ]),
      transition('flip => void', [
        useAnimation(flipOut, { params: { time: '500ms' } })
      ]),

      /* JackInTheBox */
      transition('void => jackInTheBox', [
        useAnimation(jackIn, { params: { time: '700ms' } })
      ]),
      transition('jackInTheBox => void', [
        useAnimation(jackOut, { params: { time: '700ms' } })
      ])
    ])
  ]
})

export class CodeSlidesComponent implements OnInit {
  @Input() slides: Slides[] = slides;
  @Input() animationType = AnimationType.Scale;

  @Output() slideChanged = new EventEmitter<Slides>();

  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }

  ngOnInit() {
    this.preloadImages(); // for the demo
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
