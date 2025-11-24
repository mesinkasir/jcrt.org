import { handleRequest } from '@sveltia/cms'; 

export default {
    async onRequest(context) {
        const requiredEnv = {
            SVELTIA_GIT_PROVIDER: context.env.SVELTIA_GIT_PROVIDER || 'github',
            SVELTIA_GIT_REPO: context.env.SVELTIA_GIT_REPO,
            SVELTIA_GIT_BRANCH: context.env.SVELTIA_GIT_BRANCH || 'main',
            SVELTIA_GIT_TOKEN: context.env.SVELTIA_GIT_TOKEN,
            SVELTIA_OAUTH_CLIENT_ID: context.env.SVELTIA_OAUTH_CLIENT_ID,
            SVELTIA_OAUTH_CLIENT_SECRET: context.env.SVELTIA_OAUTH_CLIENT_SECRET,
        };

        const body = await context.request.text(); 

        return handleRequest({
            method: context.request.method,
            headers: context.request.headers,
            body: body,
            url: context.request.url,
            env: requiredEnv 
        });
    }
}