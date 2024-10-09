import { trigger, state, style, transition, animate, sequence, query, animateChild } from '@angular/animations';

export const fadeInExperiencesTrigger = trigger('fadeInExperiencesTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    query('@carrouselTrigger', animateChild(), { optional: true }),
    animate('0.5s 0.2s ease-in', style({ opacity: 1 })),
  ]),
]);

export const carrouselTrigger = trigger('carrouselTrigger', [
  state(
    'center',
    style({
      transform: 'translateX(0%) scale(1)',
      zIndex: 2,
    })
  ),
  state(
    'left',
    style({
      transform: 'translateX(-70%) scale(0.7) rotateY(15deg)',
      zIndex: 1,
    })
  ),
  state(
    'right',
    style({
      transform: 'translateX(70%) scale(0.7) rotateY(-15deg)',
      zIndex: 1,
    })
  ),
  state(
    'invisible',
    style({
      opacity: 0,
      transform: 'translateX(200%)',
      zIndex: 0,
    })
  ),
  transition('* => center, center => *', [animate('0.5s ease-in-out')]),

  transition('right => left', [
    sequence([
      animate('0.25s ease-in-out', style({ opacity: 0 })),
      animate('0s 0.1s', style({ transform: 'translateX(-70%) scale(0.7) rotateY(15deg)' })),
      animate('0.25s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
  transition('right => void', [animate('0.5s ease-in-out', style({ opacity: 0 }))]),

  transition('left => right, left => void', [
    sequence([
      animate('0.25s ease-in-out', style({ opacity: 0 })),
      animate('0s 0.1s', style({ transform: 'translateX(70%) scale(0.7) rotateY(-15deg)' })),
      animate('0.25s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
  transition('left => void', [animate('0.5s ease-in-out', style({ opacity: 0 }))]),

  transition('void => right', [
    style({ transform: 'translateX(70%) scale(0.7) rotateY(-15deg)', opacity: 0 }),
    animate('0.25s ease-in-out', style({ opacity: 1 })),
  ]),
  transition('void => left', [
    style({ transform: 'translateX(-70%) scale(0.7) rotateY(15deg)', opacity: 0 }),
    animate('0.25s ease-in-out', style({ opacity: 1 })),
  ]),
]);
