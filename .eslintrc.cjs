const config = {
    env: { browser: true, node: true, es2021: true },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: { node: true },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: { sourceType: 'script' },
        },
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {
        indent: [1, 4],
        quotes: [1, 'single'],
        'no-unused-vars': ['error'],
    },
}

module.exports = config
