import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  animateChild,
  sequence,
} from '@angular/animations';

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
    'invisibleLeft',
    style({
      opacity: 0,
      transform: 'translateX(-100%) scale(0.7)',
      zIndex: 0,
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
    'center',
    style({
      transform: 'translateX(0%) scale(1)',
      zIndex: 2,
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
      transform: 'translateX(100%) scale(0.7)',
      zIndex: 0,
    })
  ),
  transition('center <=> *', [animate('0.5s ease-in-out')]),
  transition('left => right', [
    sequence([
      animate('0.25s ease-in-out', style({ opacity: 0 })),
      style({
        zIndex: 1,
        transform: 'translateX(70%) scale(0.7) rotateY(-15deg)',
      }),
      animate('0.25s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
  transition('right => left', [
    sequence([
      animate('0.25s ease-in-out', style({ opacity: 0 })),
      style({
        zIndex: 1,
        transform: 'translateX(-70%) scale(0.7) rotateY(15deg)',
      }),
      animate('0.25s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
  transition(
    'left => invisibleRight, left => invisibleLeft, right => invisibleRight, right => invisibleLeft',
    [animate('0.2s ease-in-out', style({ opacity: 0 }))]
  ),
  transition('invisibleRight => left, invisibleLeft => left', [
    sequence([
      style({
        opacity: 0,
        zIndex: 1,
        transform: 'translateX(-70%) scale(0.7) rotateY(15deg)',
      }),
      animate('0.5s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
  transition('invisibleRight => right, invisibleLeft => right', [
    sequence([
      style({
        opacity: 0,
        zIndex: 1,
        transform: 'translateX(70%) scale(0.7) rotateY(-15deg)',
      }),
      animate('0.5s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
]);
