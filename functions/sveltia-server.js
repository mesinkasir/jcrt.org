import { handleRequest } from '@sveltia/cms'; 
export default {
    async onRequest(context) {
        const { request, env } = context;
        const requiredEnv = {
            SVELTIA_GIT_PROVIDER: env.SVELTIA_GIT_PROVIDER || 'github',
            SVELTIA_GIT_REPO: env.SVELTIA_GIT_REPO,
            SVELTIA_GIT_BRANCH: env.SVELTIA_GIT_BRANCH || 'main',
            SVELTIA_GIT_TOKEN: env.SVELTIA_GIT_TOKEN,
            SVELTIA_OAUTH_CLIENT_ID: env.SVELTIA_OAUTH_CLIENT_ID,
            SVELTIA_OAUTH_CLIENT_SECRET: env.SVELTIA_OAUTH_CLIENT_SECRET,
        };
        return handleRequest({
            method: request.method,
            headers: request.headers,
            body: await request.text(), 
            url: request.url,
            env: requiredEnv
        });
    }
}