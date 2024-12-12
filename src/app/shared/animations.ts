import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * The fade in and out animation trigger with delay parameter
 * @returns {AnimationTriggerMetadata} - The animation trigger metadata
 */
export const fadeInOutTrigger: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(
    ':enter',
    [style({ opacity: 0 }), animate('0.5s {{ delay }}', style({ opacity: 1 }))],
    {
      params: { delay: '0.2s' },
    }
  ),
  transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
]);

/**
 * The fade in and out vertical animation trigger with delay parameter
 * @returns {AnimationTriggerMetadata} - The animation trigger metadata
 */
export const fadeInOutVerticalTrigger: AnimationTriggerMetadata = trigger(
  'fadeInOutVertical',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(0.5rem)' }),
        animate(
          '0.3s {{ delay }}',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      {
        params: { delay: '0.2s' },
      }
    ),
    transition(':leave', [
      animate('0.3s', style({ opacity: 0, transform: 'translateY(0.5rem)' })),
    ]),
  ]
);
