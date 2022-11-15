import produce from 'immer';

describe("Why immer.js doesn't allow setting dynamic properties on draft?", function () {
    it('should allow set dynamic properties', function () {
        const path = 'foo.bar.zoo';
        const state = { foo: { bar: { zoo: 1 } } };
        const nextState = produce(state, (draft) => {
            const vector = path.split('.');
            const propName = vector.pop();

            if (propName) {
                draft = vector.reduce((it, prop) => it[prop], draft);
                draft[propName] += 1;
            }
        });

        expect(nextState.foo.bar.zoo).toEqual(state.foo.bar.zoo + 1);
    });
});
