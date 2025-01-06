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
export const fadeInOutTrigger = trigger('fadeInOut', [
  transition(
    ':enter',
    [
      style({
        opacity: 0,
        scale: '{{ scaleFrom }}',
        transform: '{{ translateFrom }}',
      }),
      animate(
        '{{ duration }}',
        style({
          opacity: 1,
          scale: '{{ scaleTo }}',
          transform: '{{ translateTo }}',
        })
      ),
    ],
    {
      params: {
        scaleFrom: 1,
        scaleTo: 1,
        translateFrom: '',
        translateTo: '',
        duration: '0.5s',
      },
    }
  ),
  transition(
    ':leave',
    [
      animate(
        '{{ duration }}',
        style({
          opacity: 0,
          scale: '{{ scaleFrom }}',
          transform: '{{ translateFrom }}',
        })
      ),
    ],
    {
      params: {
        scaleFrom: 1,
        translateFrom: '',
        duration: '0.5s',
      },
    }
  ),
]);

/**
 * The fade in animation trigger with delay parameter
 * @returns {AnimationTriggerMetadata} - The animation trigger metadata
 */
export const fadeOutTrigger: AnimationTriggerMetadata = trigger('fadeOut', [
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
