import { createApp } from './app';

export default context => {
    /**
    * Since there could potentially be asynchronous route hooks or components,
    * we return a Promise so that the server can wait until
    * everything is ready before rendering.
    * */
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context);
        // Metadata is provided by Vue-Meta plugin
        const meta = app.$meta();

        // Set router's location server-side
        router.push(context.url);

        context.meta = meta;

        // Wait until router has resolved any async components and hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // No matched routes, reject with 404
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            context.rendered = () => {
                /** After the app is rendered, our store is now filled with the state from our components.
                * When we attach the state to the context, and the 'template' option
                * is used for the renderer, the state will automatically be
                * serialized and injected into the HTML as `window.__INITIAL_STATE__`.
                */
                context.state = store.state;
            };

            // Resolve the promise with a fresh store, router, and app instance
            resolve(app);
        }, reject);
    })
}
