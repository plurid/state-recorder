// #region imports
    // #region libraries
    import typescript from 'rollup-plugin-typescript2';
    import replace from 'rollup-plugin-replace';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region exports
export default {
    input: 'source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    external: [
        'cross-fetch',
        '@apollo/client',
        '@plurid/plurid-functions',
    ],
    plugins: [
        replace({
            'process.env.ENV_MODE': JSON.stringify(process.env.ENV_MODE),
        }),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
    ],
};
// #endregion exports
