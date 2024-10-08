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

export const moveLeftTrigger = trigger('moveLeftTrigger', [
  state('true', style({ transform: 'translateX(0)' })),
  state('false', style({ transform: 'translateX(120px)' })),
  transition('true <=> false', [animate('0.2s')]),
]);

export const ctaAppearTrigger = trigger('ctaAppearTrigger', [
  transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
  transition(':leave', [animate('0.2s', style({ opacity: 0 }))]),
]);
