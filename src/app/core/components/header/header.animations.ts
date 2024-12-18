import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const moveToTheLeftTrigger = trigger('moveToTheLeftTrigger', [
  state('true', style({ transform: 'translateX(calc((100% + 3rem) * -1))' })),
  state('false', style({ transform: 'translateX(0)' })),
  transition('true <=> false', [animate('0.2s 0.1s')]),
  transition('false <=> false', [animate('0.2s')]),
]);
