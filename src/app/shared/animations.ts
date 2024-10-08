import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * The conditional opacity animation trigger
 * @returns {AnimationTriggerMetadata} - The animation trigger metadata
 */
export const opacityTrigger = trigger('opacityTrigger', [
  state('true', style({ opacity: 1 })),
  state('false', style({ opacity: 0 })),
  transition('true <=> false', [animate('0.2s')]),
]);

/**
 * The fade in and out animation trigger
 * @returns {AnimationTriggerMetadata} - The animation trigger metadata
 */
export const fadeInOutTrigger = trigger('fadeInOutTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s', style({ opacity: 1 })), // Añade un retraso de 0.2s
  ]),
  transition(':leave', [animate('0.2s', style({ opacity: 0 }))]),
]);
