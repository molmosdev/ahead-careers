import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const splashLogoTrigger = trigger('splashLogoTrigger', [
  state(
    'void',
    style({
      transform: 'scale(0.95)',
      opacity: 0,
    })
  ),
  state(
    '*',
    style({
      transform: 'scale(1)',
      opacity: 1,
    })
  ),
  transition('void => *', animate('0.5s 0.5s ease-out')),
]);
