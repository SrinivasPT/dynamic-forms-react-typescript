import { useImmerReducer } from 'use-immer';
import PageBuilder from '../../library/Builders/PageBuilder';
import { SmartContext } from '../../library/Core/SmartContext';
import smartReducer from '../../library/Core/SmartReducer';
import { DispatchEvent, State } from '../../library/Core/SmartTypes';

const Demo = () => {
    const [state, dispatch] = useImmerReducer<State, DispatchEvent>(smartReducer, { flags: { isDataLoading: false } } as State);

    return (
        <SmartContext.Provider value={{ state, dispatch }}>
            <PageBuilder pageName='STUDENT' id={1000} />
        </SmartContext.Provider>
    );
};

export default Demo;
