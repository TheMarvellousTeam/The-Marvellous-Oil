import { configure } from '@storybook/react';

const req = require.context(
    '../src/component',
    true,
    /(stor(y|ies).js|.story.js$)/
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
