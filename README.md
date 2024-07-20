# Skeleton Awilix + Some deps

## Skeleton Setup


- --- Install initial Deps:

  `pnpm add express dotenv env-var compression`

  `pnpm add -D typescript @types/node ts-node-dev rimraf @types/express @types/compression tsc-alias tsconfig-paths`

  `pnpm add helmet morgan`
  `pnpm add -D @types/morgan`

  `pnpm add -D cors`
  `pnpm add -D @types/cors`

  `pnpm add -D awilix`


- --- Iniciamos el    tsconfig.json
  - run:	`pnpm exec tsc --init --outDir dist/ --rootDir src`





### Configurar   Aliases   en TS con Node.js (ts-node-dev):   @/
- --- Configuramos el     `tsconfig.json`
  - -- ts-node requiere q registremos el path del alias creado
  - -- tsc-alias: en build time resuelve estos aliases
    ```json
      {
        "include": ["src/**/*"],
        "exclude": ["node_modules", "dist", "**/*.spec.ts","**/*.test.ts"],     

        "compilerOptions": {
          "baseUrl": "src",
          "paths": {
            "@/*": ["*"],
          },
        }
      }
    ```




### Jest
- --- Configuramos JEST con nuestros Alisases de TS
  - -- Instalamos las deps:
    `pnpm add -D jest @types/jest ts-jest supertest @types/supertest`

  - -- Configuramos:
    - run:		`npx jest --init`   ||   `pnpm exec jest --init`
    - 'package.json': yes  >>  TS: yes   >>  node >>  Coverage?: y  >> Istrument Coverage: v8 
      	>> Auto clear mock calls, instances, etc.: Yes


	- -- En el    `jest.config.ts`    agregamos:
		```ts
			import { pathsToModuleNameMapper } from 'ts-jest';

		 	{
				preset: 'ts-jest',
				testEnvironment: "jest-environment-node",
				modulePaths: ["src"],
				moduleNameMapper: pathsToModuleNameMapper({
					"@/*": ["*"],
				}),

				setupFiles: [
					// usar .env.test con jest
					'<rootDir>/setup-tests.ts',

					'dotenv/config'
				],
			}
		```










