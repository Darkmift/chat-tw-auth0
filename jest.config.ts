export default {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/__jest__/.*|(\\.|/)(unit-test|int-test))\\.{ts,tsx}?$',
  testRegex: '(/__tests__/.*|(\\.|/)(unit-test|int-test|e2e-test))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}
