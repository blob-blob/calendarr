/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';

import { createStore, applyMiddleware, compose } from 'redux';
// enhancer: 스토어를 생성할때, 미들웨어 조합을 사용할건데 스토어 인터페이스를 바꿔서 새로운 스토어 생산자를 반환하는 고차함수
// compose: 여러 스토어 enhancer를 순차적으로 적용하기 위한 함수형 프로그래밍 유틸리티
import { Provider } from 'react-redux';
// 스토어를 리액트네이티브 컴포넌트로 패싱해주기 위해 필요함.
import promiseMiddleware from 'redux-promise';
// 비동기가 필요한 액션크리에이터를 위함
import reducers from './app/store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// redux 개발자도구와 미들웨어를 사용하기 위해
// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: 크롬 확장프로그램에 작성되어있는 자바스크립트 함수.

const StoreWithMiddelware = createStore(
    reducers,
    composeEnhancers(applyMiddleware(promiseMiddleware)),
);

const Calrendarr = () => (
    <Provider store={StoreWithMiddelware}>
        {/* 앱 전체를 store를 prop으로 갖는 provider로 감싸줌. 이 store를 사용할 것임을 알려줌 */}
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Calrendarr);
