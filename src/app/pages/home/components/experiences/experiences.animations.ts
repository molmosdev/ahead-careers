import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';

export const fadeInExperiencesTrigger = trigger('fadeInExperiencesTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    query('@experienceTrigger', animateChild(), { optional: true }),
    animate('0.5s 0.2s ease-in', style({ opacity: 1 })),
  ]),
]);

/**
 * Animation trigger for the experience, handling transitions between 'left', 'center', 'right', 'invisibleRight', and 'invisibleLeft' states.
 * @returns {AnimationTriggerMetadata} - The animation trigger for the experience.
 */
export const experienceTrigger = trigger('experienceTrigger', [
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
    'invisibleRight',
    style({
      opacity: 0,
      left: '100%',
      zIndex: 0,
    })
  ),
  state(
    'invisibleLeft',
    style({
      opacity: 0,
      left: '-100%',
      zIndex: 0,
    })
  ),
  transition('* <=> *', [animate('0.5s ease-in-out')]),
]);
