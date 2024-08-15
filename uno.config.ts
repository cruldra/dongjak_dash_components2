// unocss.config.ts
import {defineConfig} from 'unocss'

export default defineConfig({
    cli: {
        entry: {
            patterns: [
                'src/ts/**/*.tsx',
            ],
            outFile: 'dongjak_dash_components2/uno.css'
        },
    },
    rules: [
        [
            /^col-gap-(.+)$/,
            ([, d]) => {
                return {
                    'column-gap': `${d}`
                };
            }
        ],
        [
            /^row-gap-(.+)$/,
            ([, d]) => {
                return {
                    'row-gap': `${d}`
                };
            }
        ],
        ['fullwh', {
            width: '100%',
            height: '100%'
        }],
        [
            /^dev-border-(.+)$/,
            ([, d]) => {
                return {
                    'border': `1px solid ${d}`
                };
            }
        ]
    ]
})