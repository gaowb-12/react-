import React from 'react';
import ReactDOM from 'react-dom';

// react-router
import {HashRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './router';

// redux
import {store,Provider} from "./store";

// antd
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import './common/js/rem.js';
import './common/css/reset.css';
import './common/css/iconfont.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>{renderRoutes(routes)}</div>
        </HashRouter>
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();