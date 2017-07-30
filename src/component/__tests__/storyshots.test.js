import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
    suite: 'components snapshots',
    storyKindRegex: /^((?!.*?GameAction).)*$/,
})
