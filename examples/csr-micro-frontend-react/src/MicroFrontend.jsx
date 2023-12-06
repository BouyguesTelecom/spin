import * as React from 'react'

import App from './App'

/** @type {(context: any) => React.ReactElement} */
const MicroFrontend = (context) => <App {...context} />

export default MicroFrontend
